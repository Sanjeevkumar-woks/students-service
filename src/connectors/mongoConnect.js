import mongoose from "mongoose";

export const connectToMongo = async (mongoUri) => {
  await mongoose.connect(mongoUri);

  console.log("Connected to MongoDB");
};

export default connectToMongo;
