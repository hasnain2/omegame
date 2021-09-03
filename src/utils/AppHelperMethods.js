import moment from 'moment';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';
import {DEEP_LINK_TYPES} from './AppConstants';

// get numbers like 23.3K 32.1M etc
const largeNumberShortify = (num) => {
  return Math.abs(num) > 999999
    ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' M'
    : Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + ' K'
    : Math.sign(num) * Math.abs(num);
};

// get numbers like 3,32,123
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function AppShowToast(msg) {
  Toast.show(msg, Toast.SHORT);
}

var special = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
  'nineteenth',
];
var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

// get number like first, second, third and so on
function stringifyNumber(n) {
  if (n < 20) return special[n];
  if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + 'ieth';
  return deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10];
}

function CapitalizeFirstLetter(string) {
  if (string.charAt(0)) return string.charAt(0).toUpperCase() + string.slice(1);
  else return '';
}

function dateDifference(date) {
  var currentTime = new Date();
  var deadline = new Date(date);
  var diffMs = deadline - currentTime; // milliseconds between now & deadline
  // var diffDays = Math.floor(diffMs / 86400000); // days
  // var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  return diffMins;
}

function timeRemaining(date) {
  var dateFuture = new Date(date);
  var dateNow = new Date();

  var seconds = Math.floor((dateFuture - dateNow) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  let obj = {
    days,
    hours,
    minutes,
    seconds,
    txt: days + 'd ' + hours + 'h ' + minutes + 'm',
  };
  return obj;
}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // tslint:disable-next-line:no-shadowed-variable
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function AppShareContents(callback, msg) {
  let options = {
    message: msg,
    title: 'OmeGame',
    // url:"",
    // email:"",
    // subject:"",
    // recipient:"", // phone number of recipient
  };
  Share.open(options)
    .then((res) => {
      callback(true);
      AppLogger('-------------shared-------------', msg);
    })
    .catch((err) => {
      callback(false);
      err && AppLogger('-------------ERROR SHARING-------------', err);
    });
}

const DynamicLinkHelper = async (navigation, link) => {
  let url = link?.url || link || false;
  // http://ec2-18-219-104-108.us-east-2.compute.amazonaws.com?userID=5fd71492477b9b12dbe05c40
  // http://ec2-18-219-104-108.us-east-2.compute.amazonaws.com?postID=5fdc564d87235e83ebddf16d
  if (url.match('https://omegame.net/donations')) {
    navigation.navigate('PaymentWebView', {url: url});
  }
  if (url) {
    let postId = url.split(`${DEEP_LINK_TYPES.POST_ID}=`)[1] || false;
    let userId = url.split(`${DEEP_LINK_TYPES.USER_ID}=`)[1] || false;
    let code = url.split(`${DEEP_LINK_TYPES.CODE}=`)[1] || false;

    if (postId) {
      AppLogger('-----------GOT POST ID--------', postId);
      navigation.navigate('PostDetailScreenWithComments', {postID: postId});
    } else if (userId) {
      AppLogger('-----------GOT USER ID--------', userId);
      navigation.navigate('UserProfileScreen', {userID: userId});
    } else if (code) {
      AppLogger('-----------GOT CODE--------', code);
    }
  }
};

const RemoveDuplicateObjectsFromArray = (arrayToProcess) => {
  return arrayToProcess.filter((item, index, self) => index === self?.findIndex((t) => t?._id === item?._id));
};

function AppLogger(identifier, msgOrError) {
  if (__DEV__) {
    // console.log(identifier, msgOrError)
  }
}

const GetCurrentDate = () => moment().toISOString() + '';

// Starting date of WEEK , MONTH AND YEAR
const GetLastWeekStartOf = () => moment().subtract(1, 'weeks').startOf('week').toISOString() + '';
const GetLastMonthStartOf = () => moment().subtract(1, 'months').startOf('month').toISOString() + '';
const GetLastYearStartOf = () => moment().subtract(1, 'years').startOf('year').toISOString() + '';

// Ending date of WEEK , MONTH AND YEAR
const GetLastWeekEndOf = () => moment().subtract(1, 'weeks').endOf('week').toISOString() + '';
const GetLastMonthEndOf = () => moment().subtract(1, 'months').endOf('month').toISOString() + '';
const GetLastYearEndOf = () => moment().subtract(1, 'years').endOf('year').toISOString() + '';

const HandleNaN = (data) => (isNaN(data) ? 0 : data);

function getChatId(user1, user2) {
  return [user1, user2].sort().join('-');
}
export {
  largeNumberShortify,
  AppLogger,
  getChatId,
  RemoveDuplicateObjectsFromArray,
  DynamicLinkHelper,
  generateRandomString,
  numberWithCommas,
  AppShowToast,
  HandleNaN,
  stringifyNumber,
  dateDifference,
  timeRemaining,
  GetLastWeekStartOf,
  GetLastWeekEndOf,
  GetLastMonthStartOf,
  GetLastMonthEndOf,
  GetLastYearStartOf,
  GetLastYearEndOf,
  GetCurrentDate,
  CapitalizeFirstLetter,
  AppShareContents,
};
