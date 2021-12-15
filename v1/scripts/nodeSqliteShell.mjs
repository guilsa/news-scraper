import Database from 'better-sqlite3'

const db = new Database('news.db')

const smnt = db.prepare('SELECT * FROM articles order by date desc').all()

console.log('smnt', smnt)

// for (const names of biasSourceNamesStmt.iterate()) {
//   if (cat.name === 'Joey') {
//     console.log('found him!');
//     break;
//   }
// }

// console.log(biasSourceNames)
