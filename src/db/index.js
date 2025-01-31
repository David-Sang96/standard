import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to mongoDB : ${res.connection.host}`);
  } catch (error) {
    console.log(`Failed to connecting DB : ${error}`);
    process.exit(1);
  }
};
export default connectDB;
