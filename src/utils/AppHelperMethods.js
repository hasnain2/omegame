import Toast from 'react-native-simple-toast';
import moment from 'moment';
import Share from 'react-native-share';

const largeNumberShortify = (num) => {
    return Math.abs(num) > 999999 ?
        Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + ' M'
        :
        Math.abs(num) > 999 ?
            Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + ' K'
            :
            Math.sign(num) * Math.abs(num)
}

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function AppShowToast(msg) {
    Toast.show(msg, Toast.SHORT);
}

var special = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

function stringifyNumber(n) {
    if (n < 20) return special[n];
    if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + 'ieth';
    return deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10];
}

function CapitalizeFirstLetter(string) {
    if (string.charAt(0))
        return string.charAt(0).toUpperCase() + string.slice(1);
    else
        return ""
}

function dateDifference(date) {
    var currentTime = new Date();
    var deadline = new Date(date);
    var diffMs = (deadline - currentTime); // milliseconds between now & deadline
    // var diffDays = Math.floor(diffMs / 86400000); // days
    // var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffMins
}

function timeRemaining(date) {
    var a = moment(date);
    var b = moment(new Date());

    let days = a.diff(b, 'days') // 1
    let hours = a.diff(b, 'hours') // 1
    let minutes = a.diff(b, 'minutes') // 1
    let seconds = a.diff(b, 'seconds') // 1

    let obj = { days, hours, minutes, seconds, txt: days + 'd ' + hours + 'h ' + minutes + 'm' }
    console.log('-----CALCULATED TIME------', obj)
    return obj
}

function AppShareContents(callback, msg) {
    let options = {
        message: msg,
        title: "OmeGame",
        // url:"",
        // email:"",
        // subject:"",
        // recipient:"", // phone number of recipient
    }
    Share.open(options)
        .then((res) => {
            callback(true)
            console.log('-------------shared-------------', msg)
        })
        .catch((err) => { callback(false); err && console.log('-------------ERROR SHARING-------------', err); });
}

export { largeNumberShortify, numberWithCommas, AppShowToast, stringifyNumber, dateDifference, timeRemaining, CapitalizeFirstLetter, AppShareContents }