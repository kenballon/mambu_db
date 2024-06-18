import './style.css'
import { mambudb_backup, getUsers, getDBBackup } from './mambudb_backup.js'

const baseUrl = 'https://mentorsphilippines.sandbox.mambu.com/api';

const todaysDate = document.querySelector('#date_today');
let createBackupFromDate;
let sqlTables = [];

// todaysDate.addEventListener('change', e => {

//   const value = e.target.value;

//   if (!value) {
//     console.error('No date was selected')
//   }

//   // createBackupFromDate = new Date(value).toISOString().replace(/\.\d{3}Z$/, 'Z');
//   let date = new Date(value);

//   createBackupFromDate = date.toLocaleString('sv-SE', { timeZone: 'Asia/Manila' }).replace(' ', 'T') + ':00';
// })

const formSubmit = document.querySelector('#btn_submit')


formSubmit.addEventListener('click', e => {
  e.preventDefault;

  const webhookSiteURL = document.getElementById('webhook_url').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  const triggerDBObjects = {
    'webhookUrl': webhookSiteURL,
    'tablesArr': sqlTables,// tables used by the company such client, users and more
    'username': username,
    'password': password,
  }

  console.log(triggerDBObjects);

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

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  console.log(username, password);

  getDBBackup(username, password).then(() => console.log('Trying to download DB Backup...')).catch(err => console.error('Error', err));

})

const sqlTableInput = document.getElementById("tablesArr");
const tagList = document.getElementById("tagList");

sqlTableInput.addEventListener("keydown", (event) => {
  // Check for Enter (keyCode 13) or comma (keyCode 188)
  if (event.keyCode === 13 || event.keyCode === 188) {
    const newTag = sqlTableInput.value.trim(); // Trim leading/trailing spaces
    if (newTag) {
      sqlTables.push(newTag); // Add tag to the array
      tagList.innerHTML += `<li class="pill-table">${newTag}</li>`; // Add tag to the list
      sqlTableInput.value = ""; // Clear the input field for next tag
      // Remove comma if comma key was pressed
      if (event.keyCode === 188) {
        event.preventDefault(); // Prevent default comma insertion
      }

    }
  }
});


