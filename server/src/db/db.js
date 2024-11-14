import mongoose from 'mongoose';

const connectDB = async () =>{
  try {
      const connectionInstance = await mongoose.connect(`mongodb://mongo:27017/contacts`)
      console.log(`\nMongoDB is connected to DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
      console.error("Mongoose Connection Error", error);
  }
}

export default connectDB;