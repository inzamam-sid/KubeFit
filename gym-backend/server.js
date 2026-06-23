import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});