import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";

mongoose.connect("mongodb://localhost:27017/sagar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
