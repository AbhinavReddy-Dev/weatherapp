import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

const collectionName =
  process.env.NODE_ENV === "development"
    ? "weather_app_server"
    : "weather_app_prod";

let db = conn.db(collectionName);

export default db;
