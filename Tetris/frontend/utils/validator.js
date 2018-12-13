const STATE_ERROR = -1;
const STATE_OK = 0;

class BaseRule {
    constructor() {
        this.state = STATE_OK;
        this.defaultMessage = "Invalid input";
    }

    get isOk() {
        return this.state === STATE_OK;
    }

    get isError() {
        return this.state === STATE_ERROR;
    }

    ok() {
        this.state = STATE_OK;
    }

    error(message) {
        this.state = STATE_ERROR;
        if (message) {
            this.message = message;
        } else {
            this.message = this.defaultMessage;
        }
    }

    validate(value) {
        throw new Error("You should override validate method.");
    }
}

class RequiredRule extends BaseRule {
    constructor() {
        super();
    }
    validate(value) {
        if (value && (typeof (value) === 'number' || value.length > 0))
            this.ok();
        else
            this.error("Required");
        return value;
    }
}

class RulesContainer {
    constructor(property, name) {
        this.property = property;
        this.name = name;
        this.rules = [];
        this.state = STATE_OK;
        this.message = "";
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    validate(value) {
        let result = true;
        let messages = [];
        for (let i = 0; i < this.rules.length; i++) {
            let rule = this.rules[i];
            value = rule.validate(value);
            result = result && rule.isOk;
            if (rule.isError)
                messages.push(rule.message);
        }
        this.state = result ? STATE_OK : STATE_ERROR;
        this.message = messages.join(", ");
        return result;
    }

    get isOk() {
        return this.state === STATE_OK;
    }

    get isError() {
        return this.state === STATE_ERROR;
    }
}

class RulesContainerBuilder {
    constructor(container) {
        this.container = container;
    }

    required() {
        this.container.addRule(new RequiredRule());
        return this;
    }
}

export default class Validator {
    constructor() {
        this.containers = [];
        this.state = STATE_OK;
        this.messages = [];
    }

    buildRules(property, name) {
        let container = new RulesContainer(property, name);
        this.containers.push(container);
        return new RulesContainerBuilder(container);
    }

    validate(data) {
        let result = true;
        let messages = [];
        for (let i = 0; i < this.containers.length; i++) {
            let container = this.containers[i];
            let value = data[container.property];
            container.validate(value);
            result = result && container.isOk;
            if (container.isError)
                messages.push(`${container.name} - ${container.message}`);
        }
        this.state = result ? STATE_OK : STATE_ERROR;
        this.messages = messages;
        return result;
    }

    rules(property) {
        return this.containers.find(x => x.property == property);
    }

    get isOk() {
        return this.state === STATE_OK;
    }

    get isError() {
        return this.state === STATE_ERROR;
    }
}