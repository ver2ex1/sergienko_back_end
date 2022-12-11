const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const imageRouter = require("./routers/imageRouter");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/images", imageRouter);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://ver2ex:2GQmOpzoInnQP5zi@cluster0.20klivg.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
