const path = require('path');
const { compressFile } = require('./compressFile');

function dumpDatabase() {
    // Лучше использовать cron, чем setInterval 
    setInterval(() => {
        compressFile('test.json', 'dump', 'db-dump.json');

        console.log('Database dump was created');
    }, 10000);
}

module.exports = { dumpDatabase };
