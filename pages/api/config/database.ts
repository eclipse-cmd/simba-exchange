import mongoose from "mongoose";

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASS;
const db_name = process.env.DB_NAME;
if (!db_user || !db_password) {
  throw new Error("database connection credentials needed");
}

const URI = `mongodb+srv://${db_user}:ScV7bH1LG4URcVSx@cluster0.virng.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const opt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

mongoose.connect(URI);

const connection = {
  isConnected: false as unknown as mongoose.ConnectionStates
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  mongoose.connect(URI, opt).then((db) => {
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected");
  }).catch((error) => {
    console.log("DB connection failed: ", error);
  });
}

export default dbConnect;