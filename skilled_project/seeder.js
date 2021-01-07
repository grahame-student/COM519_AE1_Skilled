const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");

/**
 * constants
 */
require("dotenv").config();
const {WEB_PORT, MONGODB_URI} = process.env;
const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    await db.dropDatabase();

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing your dummy data").start();

    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "skills.json"), "utf8");
    await db.collection("skills").insertMany(JSON.parse(data));

    load.stop();
    console.info(
      `Initialised skills database with sample data`
    );

    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main().then(r => {});
