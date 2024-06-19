import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'https://mambu-mentorsphilippines.netlify.app/api';

export async function mambudb_backup(callbackUrl, tables = [], un, pw) {
    const authUsers = btoa(`${un}:${pw}`);
    console.log(authUsers);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.mambu.v2+json',
        'Idempotency-Key': uuidv4(),
        'Authorization': `Basic ${authUsers}`
    };

    const requestBody = {
        callback: callbackUrl,
        ...(tables.length > 0 && { tables: tables })
    };

    try {
        const response = await fetch(`${baseUrl}/database/backup`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
        }

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

export async function getDatabseBackup(un, pw, download_date = 'today') {
    const authUsers = btoa(`${un}:${pw}`);

    const headers = {
        'Accept': 'application/vnd.mambu.v2+zip',
        'Authorization': `Basic ${authUsers}`
    };

    try {
        const response = await fetch(`${baseUrl}/database/backup/LATEST`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Create a link element
        const a = document.createElement('a');
        a.href = url;
        a.download = `database_backup_${download_date}.zip`;
        document.body.appendChild(a);
        a.click();

        // Clean up and revoke the object URL
        URL.revokeObjectURL(url);
        document.body.removeChild(a);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}




