const pool = require('../config/db');

// --------------- //
// -- DATABASE -- //

// Pings database
exports.pingDatabase = async () => {
    try {
        const result = await pool.query("SELECT 1")
        delete result["meta"];

        if (result.length > 0) {
            console.log("DB Connected!");
            return true;
        } else {
            console.log("Could not reach DB!");
            return false;
        }
    } catch (error) {
        console.log("Could not reach DB!");
        return false;
    }
}

// ------------ //
// -- DATES -- //

// Get date in dd/mm/yyyy format
exports.formatDateDMY = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (String(month).length < 2) month = `0${month}`;
    let day = date.getDate();
    if (String(day).length < 2) day = `0${day}`;

    return `${day}/${month}/${year}`;
}

// Format dd/mm/yyyy to date
exports.stringToDate = (string) => {
    const values = string.split('/');
    const [day, month, year] = values;
    
    return new Date(year, month - 1, day, 0, 0, 0);
}

// Get the number of days between two dates
exports.daysBetweenDates = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); 
    return diffDays;
}

// Date to hh:mm
exports.dateToHM = date => {
    if (!date) return "";

    let hours = date.getHours();
    if (String(hours).length < 2) hours = `0${hours}`;
    let minutes = date.getMinutes();
    if (String(minutes).length < 2) minutes = `0${minutes}`;
    let seconds = date.getSeconds();
    if (String(seconds).length < 2) seconds = `0${seconds}`;

    return `${hours}:${minutes}:${seconds}`;
}

// Format seconds
exports.formatSeconds = (seconds) => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    const hDisplay = Number(h) > 0 ? `${h}` : '';
    const mDisplay = Number(m) > 0 ? `${m}` : '00';
    const sDisplay = Number(s) > 0 ? `${s}` : '00';
    
    if (Number(h) > 0) return `${hDisplay}h:${mDisplay}m:${sDisplay}s`;
    return `${mDisplay}m:${sDisplay}s`;
}

// ------------ //
// -- .CONF -- //

// Check .conf connection
exports.checkConfConnection = async () => {
    return process.env.DEV_CONF_CONNECTION_SUCCESS === 'true';
}

// Call .conf
exports.callConfApi = async (_url='', _data={}) => {

    if (process.env.DEV_CONF_API_SUCCESS === 'true') {
        return {
            data: {
                state: 'OK',
                log: 'Complete'
            }
        }
    }
    else {
        return {
            data: {
                state: 'FAILED',
                log: 'Failed'
            }
        }
    }
}