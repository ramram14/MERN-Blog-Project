import mongoose from 'mongoose';

const mongoDbUrl = process.env.MONGODB_URL
if (!mongoDbUrl) {
  throw new Error("MONGODB_URL is not defined in environment variables.");
}
export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(mongoDbUrl);
    console.log('MongoDB connected: ', connection.connection.host);
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default connectDb