import './style.css'
import { mambudb_backup, getUsers, getDBBackup } from './mambudb_backup.js'

const baseUrl = 'https://mentorsphilippines.sandbox.mambu.com/api';

const todaysDate = document.querySelector('#date_today');
let createBackupFromDate;

todaysDate.addEventListener('change', e => {

  const value = e.target.value;

  if (!value) {
    console.error('No date was selected')
  }

  // createBackupFromDate = new Date(value).toISOString().replace(/\.\d{3}Z$/, 'Z');
  let date = new Date(value);

  createBackupFromDate = date.toLocaleString('sv-SE', { timeZone: 'Asia/Manila' }).replace(' ', 'T') + ':00';
})

const formSubmit = document.querySelector('#btn_submit')
const webhookSiteURL = 'https://webhook.site/53f68f28-70d0-42f7-b915-db22d1510c6a';


formSubmit.addEventListener('click', e => {
  e.preventDefault;

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  const triggerDBObjects = {
    'webhookUrl': webhookSiteURL,
    'tablesArr': ['client'],// tables used by the company such client, users and more
    'username': username,
    'password': password,
  }
  console.log(triggerDBObjects);
  getUsers(username, password).then(() => console.log('User data fetched...')).catch(err => { console.error('error', err) });

  mambudb_backup(triggerDBObjects.webhookUrl, triggerDBObjects.tablesArr, triggerDBObjects.username, triggerDBObjects.password).then(() => console.log('Database backup triggered...')).catch(err => console.log('Error: ', err));
})

function getCurrentDate() {
  if (createBackupFromDate !== undefined) {
    return createBackupFromDate;
  } else {
    console.warn('createBackupFromDate is not defined or does not have value. Please select a date on the input date');
  }
}

const downloadDBBackup = document.getElementById('btn_download')

downloadDBBackup.addEventListener('click', e => {
  e.preventDefault;

  let backup_fileName = document.getElementById('backupversion');

  let backup_version = backup_fileName.value;
  console.log(backup_version);



  getDBBackup(backup_version).then(() => console.log('Trying to download DB Backup...')).catch(err => console.error('Error', err));

  setTimeout(() => {
    backup_fileName.value = ''
  }, 100)
})


