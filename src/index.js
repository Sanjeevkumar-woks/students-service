import express from "express";
import connectToMongo from "./connectors/mongoConnect.js";
import dotenv from "dotenv";
import apis from "./routes/index.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apis);

const bootstrap = async () => {
  try {
    await connectToMongo(mongoUri);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

bootstrap();

export default app;
