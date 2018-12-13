import moment from 'moment/moment.js';

export default class DateTime {
  static fromUtcString(value) {
    var dt = new DateTime();
    dt.value = moment.utc(value);
    return dt;
  }

  get local() {
    return this.value.clone().local();
  }

  get formatDateTime() {
    return this.local.format("YY-MM-DD HH:mm");
  }
}