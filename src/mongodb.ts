import { Telegraf } from "telegraf";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://thoughts:thoughts@schooladwa.b4hrxye.mongodb.net/?retryWrites=true&w=majority&appName=SchoolAdwa";

export type dataType = {
    _id?: string,
    message: string,
    approved: Boolean
}

const bot = new Telegraf(
    process.env.BOT_TOKEN as string
);


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function addDataToTable(data: dataType) {
  try {
    await client.connect();
    const database = client.db("PreyRequest");
    const collection = database.collection("requests");
    await collection.insertOne(data);
    console.log("Data added successfully to the table.");
  } catch (error) {
    console.error("Error adding data to the table:", error);
  } finally {
    await client.close();
  }
}

async function sendMessage(message: string) {
  try {
      await bot.telegram.sendMessage(process.env.CHANNEL_ID as string, message);
  } catch (error) {
    console.error("Error in sendMessage:", error);
  }
}


async function run() {
  try {
    await client.connect();
    await client.db("PreyRequest").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

export {addDataToTable, sendMessage}