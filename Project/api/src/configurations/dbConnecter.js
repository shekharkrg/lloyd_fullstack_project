const { MongoClient } = require('mongodb');

const DB_url = process.env.MONGO_URL;
const DB_name = process.env.MONGO_DB_NAME;
const client = new MongoClient(DB_url, {});

let db;

const connectToDatabase = async () => {
    if (!db){
        let result = await client.connect();
        console.log('Connected to MongoDB');
        db = result.db(DB_name);
    }
    return db;
}

module.exports = connectToDatabase;