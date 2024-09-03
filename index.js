const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

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
  resp.send("Image generator API is running....");
});

app.use(cors());
require("dotenv").config();

app.post("/generate", async (req, res) => {
  const keyword = req?.body?.keyword;

  console.log("jackky", keyword);
  console.log("dddd ", process.env.LIMEWIRE_API_KEY);

  const response =  await fetch(`https://api.limewire.com/api/image/generation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "v1",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`
    },
    body: JSON.stringify({
      prompt: keyword,
      aspect_ratio: "1:1",
    }),
  });

  const data = await response.json();
  console.log("eta hami :: ", data);

  // return res.json({
  //   id: '255f628f-fae1-4d9d-8874-171beeee5a58',
  //   self: 'https://api.limewire.com/api/request/255f628f-fae1-4d9d-8874-171beeee5a58',
  //   status: 'COMPLETED',
  //   failure_code: null,
  //   failure_reason: null,
  //   credits_used: 3,
  //   credits_remaining: 4,
  //   data: [
  //     {
  //       asset_id: '28fce133-f118-4b49-973e-10d446220c87',
  //       self: 'https://api.limewire.com/api/assets/28fce133-f118-4b49-973e-10d446220c87',
  //       asset_url: 'https://picsum.photos/id/237/200/300',
  //       // asset_url: 'https://ai-studio-assets.limewire.media/u/d015662e-bd34-4557-8207-a14925354570/image/618c7705-b6e0-405d-8437-b1e131278cf8?Expires=1725359202&Signature=SaDPobq~Lafsk6VhlOv3rk-qQiG5BoFoN2uUNqlVoD9-CyDNCtiknfjKfZUq3GYUQjjd8WKVc9Io~7C0YpNDeT747rdH7fq~pz-o-O9au6RILNFR99eysJDe88wc5i0JwVrHv8IrQIh2wQWar1TcHJgmFDuqk~-ED0RqyrMdS1LdfPnVSlkH5bH5MRXgEWK0VC6UTEtz43~HpPjaXe6xvpOfDHYsH7c3IXt9J4Hueu5-M4l0oRASDQtNUudUVFUdCssAV4rNKpORGybu9nPa~bupWu~h3aga1SLWtHrVDRN~3UFH7K83eBPktWmleQzDF~1TeCgb6uwyVww2Mhd0ZQ__&Key-Pair-Id=K1U52DHN9E92VT',
  //       type: 'image/png',
  //       width: 1024,
  //       height: 1024
  //     }
  //   ]
  // })

  return res.json({
    data,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening ${port}...`));
