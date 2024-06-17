import './style.css'
import { mambudb_backup } from './mambudb_backup.js'

const baseUrl = 'https://mentorsphilippines.sandbox.mambu.com/api';

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
const webhookSiteURL = 'https://webhook.site/53f68f28-70d0-42f7-b915-db22d1510c6a';


formSubmit.addEventListener('click', e => {
  e.preventDefault;

  // Get the username and password values
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  const triggerDBObjects = {
    'webhookUrl': webhookSiteURL,
    'fromDate': getCurrentDate(),
    'tablesArr': ['client'],// tables used by the company such client, users and more
    'username': username,
    'password': password,
  }
  console.log(triggerDBObjects);
  // mambudb_backup(triggerDBObjects.webhookUrl, triggerDBObjects.tablesArr, triggerDBObjects.username, triggerDBObjects.password)
  //   .then(() => console.log('Backup initiated successfully'))
  //   .catch(error => console.error('Backup initiation failed ', error));

  getUsers(username, password);
})

function getCurrentDate() {
  if (createBackupFromDate !== undefined) {
    return createBackupFromDate;
  } else {
    console.warn('createBackupFromDate is not defined or does not have value. Please select a date on the input date');
  }
}

async function getUsers(un, pw) {
  const proxyURL = 'https://mambu-mentorsphilippines.netlify.app/';
  const targetUrl = 'https://mentorsphilippines.sandbox.mambu.com/api/users';
  const authenticatedUsers = btoa(`${un}:${pw}`);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${authenticatedUsers}`
  };

  try {
    const response = await fetch(proxyURL + targetUrl, {
      method: 'GET',
      headers: headers
    });

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Error', error);
  }
}

