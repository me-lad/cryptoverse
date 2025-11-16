import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return true;

    const uri: string = process.env.MONGODB_URI || '';
    await mongoose.connect(uri);
    console.log('Connect to DB successfully :))');
  } catch (err) {
    console.log('Something went wrong in DB connection :((', err);
  }
};
