const os = require('os');

// Отримати ім'я користувача операційної системи
const userName = os.userInfo().username;

// Вивести привітання на консоль
console.log(`Hello, ${userName}!`);

