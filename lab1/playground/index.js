// Підключення модуля lodash
const _ = require('lodash');

// Приклад використання 5 методів lodash

// 1. Метод map - використовується для створення нового масиву, в якому кожен елемент визначається функцією
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = _.map(numbers, n => n * n);
console.log('Squared Numbers:', squaredNumbers);

// 2. Метод filter - використовується для створення нового масиву, який містить тільки ті елементи, які задовольняють умову
const evenNumbers = _.filter(numbers, n => n % 2 === 0);
console.log('Even Numbers:', evenNumbers);

// 3. Метод sortBy - використовується для сортування масиву за значенням вказаної властивості або за допомогою функції
const unsortedObjects = [{ name: 'Diona', age: 10 }, { name: 'Toma', age: 25 }, { name: 'Simon', age: 35 }];
const sortedObjects = _.sortBy(unsortedObjects, 'age');
console.log('Sorted Objects by Age:', sortedObjects);

// 4. Метод reduce - використовується для зменшення масиву до одного значення шляхом використання функції-аккумулятора
const sum = _.reduce(numbers, (acc, n) => acc + n, 0);
console.log('Sum of Numbers:', sum);

// 5. Метод chunk - використовується для розбиття масиву на підмасиви заданого розміру
const chunkedNumbers = _.chunk(numbers, 2);
console.log('Chunked Numbers:', chunkedNumbers);
