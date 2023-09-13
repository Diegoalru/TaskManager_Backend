import mongoose from "mongoose";

export async function connectDB() {

  for (let i = 0; i < 5; i++) {
    try {
      const dbHost = process.env.MONGO_HOST;
      const dbPort = process.env.MONGO_PORT;
      const user = process.env.MONGO_USER;
      const password = process.env.MONGO_PASSWORD;
      const dbName = process.env.MONGO_DB;

      await mongoose.connect(
        `mongodb://${user}:${password}@${dbHost}:${dbPort}/${dbName}?authSource=admin`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
        }
      );

      console.log("Connected to database");
      break;
      
    } catch (error) {
      console.log("Retrying to connect to database...");
      if (i === 4) {
        console.error("Could not connect to database");
        process.exit(1);
      }
    }
  }
}

export default { connectDB };
