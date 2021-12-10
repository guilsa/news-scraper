const Database = require('better-sqlite3');
const db = new Database('foobar.db');

// db.exec(`CREATE TABLE cats
// (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     age INTEGER
// )`)

const insert = db.prepare('INSERT INTO cats (name, age) VALUES (@name, @age)');

const insertMany = db.transaction((cats) => {
  for (const cat of cats) insert.run(cat);
});

insertMany([
  { name: 'Joey', age: 2 },
  { name: 'Sally', age: 4 },
  { name: 'Junior', age: 1 },
]);