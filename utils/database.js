import mongoose from 'mongoose';

export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB is already connected');
    return;
  };

  try {
    
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "miva-test",
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false,
      // useCreateIndex: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};