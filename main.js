import './style.css'
import { mambudb_backup, getDatabseBackup, getUsers } from './mambudb_backup.js'

const todaysDate = document.querySelector('#date_today');
let createBackupFromDate;
let sqlTables = [];
let backupDateFileName;

todaysDate.addEventListener('change', e => {

  const value = e.target.value;

  if (!value) {
    console.error('No date was selected')
  }

  let date = new Date(value);
  // createBackupFromDate = date.toLocaleString('sv-SE', { timeZone: 'Asia/Manila' }).replace(' ', 'T') + ':00';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options).replace(/ /g, '-').replace(/,/g, '');
  backupDateFileName = formattedDate;

})

const createDbBackup = document.querySelector('#btn_createDbBackup')
createDbBackup.addEventListener('click', e => {
  e.preventDefault();

  const webhookSiteURL = document.getElementById('webhook_url').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  const triggerDBObjects = {
    'webhookUrl': webhookSiteURL,
    'tablesArr': sqlTables,
    'username': username,
    'password': password,
  }

  mambudb_backup(triggerDBObjects.webhookUrl, triggerDBObjects.tablesArr, triggerDBObjects.username, triggerDBObjects.password).then(() => console.log('Database backup triggered...')).catch(err => console.log('Error: ', err));
})



const downloadDBBackup = document.getElementById('btn_download')
downloadDBBackup.addEventListener('click', e => {
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  getDatabseBackup(username, password, backupDateFileName).then(() => console.log('Trying to download DB Backup...')).catch(err => console.error('Error', err));

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


