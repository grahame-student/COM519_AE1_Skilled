const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');

require('dotenv').config();

/**
 * constants
 */
const { MONGODB_URI } = process.env;
const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });

async function main () {
  await client.connect();
  const db = client.db();
  await db.dropDatabase();

  /**
   * Import the JSON data into the database
   */
  const data = await fs.readFile(path.join(__dirname, 'skills.json'), 'utf8');
  const jsonData = await JSON.parse(data);
  await importTable(db, 'skills', jsonData);
  await importTable(db, 'roles', jsonData);
  await importTable(db, 'employees', jsonData);
  await importTable(db, 'users', jsonData);
}

async function importTable (db, table, data) {
  console.info('Importing table: ' + table);
  await db.collection(table).insertMany(data[table]);
}

main()
  .then(() => {
    console.log('Initialised skills database with sample data');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });
