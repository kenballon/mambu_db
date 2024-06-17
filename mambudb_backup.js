import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'https://mambu-mentorsphilippines.netlify.app/api';

export async function mambudb_backup(callbackUrl, tables, un, pw) {
    const authUsers = btoa(`${un}:${pw}`);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.mambu.v2+json',
        'Idempotency-Key': uuidv4(),
        'Authorization': `Basic ${authUsers}`
    };

    const requestBody = {
        callback: callbackUrl,
        tables: tables
    };

    try {
        const response = await fetch(`${baseUrl}/database/backup`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        const responseData = await response.json();
        console.log(responseData);

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getUsers(un, pw) {
    const authUsers = btoa(`${un}:${pw}`);
    try {
        const response = await fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authUsers}`
            }
        })

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('Error', error)
    }
}

export async function getDBBackup(databaseBackupVersion) {

    const headers = {
        'Accept': 'application/vnd.mambu.v2+zip'
    };

    try {
        const response = await fetch(`${baseUrl}/database/backup/${databaseBackupVersion}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.blob(); // Use blob if you're expecting a binary file

        // The rest of your code to handle the download goes here
        console.log(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


