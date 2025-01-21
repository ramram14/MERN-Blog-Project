import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected: ', connection.connection.host);
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default connectDb