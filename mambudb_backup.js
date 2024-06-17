import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


export function mambudb_backup(callbackUrl, fromDate, tables, un, pw) {

    const authUsers = btoa(`${un}:${pw}`);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.mambu.v2+json',
        'Idempotency-Key': uuidv4(),
        'Authorization': `Basic ${authUsers}`
    };

    const data = {
        callback: callbackUrl,
        createBackupFromDate: fromDate,
        tables: tables
    };

    axios.post('https://mentorsphilippines.sandbox.mambu.com/api/database/backup', data, { headers: headers })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            if (error.response) {

                console.error("Error data:", error.response.data);
                console.error("Error status:", error.response.status);
                console.error("Error headers:", error.response.headers);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        });

}
