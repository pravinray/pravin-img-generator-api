const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { generate } = require("./controllers/generateImgController");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Image generator",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./index.js"],
};

app.get("/", (req, resp) => {
  resp.send(
    '<html><body><h2 style="text-align: center; padding-top: 10px">Image generator API is running....</h2></body></html>'
  );
});

app.use(cors());
require("dotenv").config();

app.post("/generate", generate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening ${port}...`));
