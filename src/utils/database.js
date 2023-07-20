import mongoose from "mongoose";

//Tracking the connection to database
let isConnected = false;

const connectToDb = async () => {
  if (isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
