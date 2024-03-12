const fs = require('fs');
fs.appendFileSync("task02.txt", "Hello World!\n");
console.log('Новий рядок був доданий до файлу.');