import './style.css'
import { mambudb_backup } from './mambudb_backup.js'

const todaysDate = document.querySelector('#date_today');
let createBackupFromDate;

todaysDate.addEventListener('change', e => {

  const value = e.target.value;

  if (!value) {
    console.error('No date was selected')
  }
  // Convert the value to ISO string
  createBackupFromDate = new Date(value).toISOString().replace(/\.\d{3}Z$/, 'Z');
})

const formSubmit = document.querySelector('#btn_submit')
const webhookSiteURL = 'https://webhook.site/ff7af1bd-5dfa-42ec-a0a1-3883fd8d4231';




formSubmit.addEventListener('click', e => {
  e.preventDefault;

  // Get the username and password values
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  const triggerDBObjects = {
    'webhookUrl': webhookSiteURL,
    'fromDate': getCurrentDate(),
    'tablesArr': ['user'],// tables used by the company such client, users and more
    'username': username,
    'password': password,
  }
  console.log(triggerDBObjects);
  mambudb_backup(triggerDBObjects.webhookUrl, triggerDBObjects.fromDate, triggerDBObjects.username, triggerDBObjects.password);
})

function getCurrentDate() {
  if (createBackupFromDate !== undefined) {
    return createBackupFromDate;
  } else {
    console.warn('createBackupFromDate is not defined or does not have value. Please select a date on the input date');
  }
}

