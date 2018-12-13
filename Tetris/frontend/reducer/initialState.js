const state = {
    common: {
        loader: [],
        auth: {
            item: {
                login: '',
                password: ''
            },
            info: {
                isAuth: false,
                roles: [],
                isAdmin: false,
                isManager: false,
                isContact: false,
                isClient: false,
                isEmployee: false,
                isFinancier: false
            }
        }
    },
    tetris: {
        field: getDefaultField(),
        game: getDefaultField(),
        figure: {
            points: [],
            center: {
                x: 0,
                y: 0,
                value: 0
            }
        },
        nextFigure: {
            points: [],
            center: {
                x: 0,
                y: 0,
                value: 0
            }
        },
        pause: true,
        point: 10,
        endGame: false,
        settedFigures: []
    },
    gameApi: {
        game: {
            gameList: {
                items: []
            },
            scoreInfo: {
                score: 0,
                maxScore: 0
            }
        },
        user: {
            list: []
        }
    }
}

function getDefaultField() {
    let field = [];
    for (let i = 0; i < 20; i++) {
        let column = [];
        for (let j = 0; j < 10; j++) {
            column.push({ x: j, y: i, value: 0 });
        }
        field.push(column);
    }
    return field;
}

export default state;