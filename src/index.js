import app from './app.js';
import { connectDB } from "./db.js";

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log("Server listening on port " + port + "...");

  await connectDB();
});
