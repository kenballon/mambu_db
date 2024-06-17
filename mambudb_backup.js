import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'https://mentorsphilippines.sandbox.mambu.com/api';

export async function mambudb_backup(callbackUrl, fromDate, tables, un, pw) {
    const authUsers = btoa(`${un}:${pw}`);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.mambu.v2+json',
        'Idempotency-Key': uuidv4(),
        'Authorization': `Basic ${authUsers}`
    };

    const requestBody = {
        callback: callbackUrl,
        createBackupFromDate: fromDate,
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
        const response = await fetch('https://mentorsphilippines.sandbox.mambu.com/api/users', {
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

