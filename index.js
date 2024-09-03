const express = require("express");
const app = express();
app.use(express.json());
// const Joi = require("joi");
const cors = require("cors");
// const mysql = require("mysql2");
// const jwt = require("jsonwebtoken");
// const secretKey = "secretKey";
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const schedule = require("node-schedule");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API PROJECT MYSQL",
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

// const swaggerSpec = swaggerJSDoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method working or not
 *      description: This api is  use to check if get method is working or not
 *      responses:
 *          200:
 *             description:To test get Method
 */

// const router = express.Router();

app.get("/", (req, resp) => {
  resp.send("BulkSMS API is running....");
});

app.use(cors());
require("dotenv").config();
// const accountSid = process.env.TwILI0_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);
// const CallRecord = [];

// Create Connnections

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
        // "Bearer lmwr_sk_nQflQ7DWoT_9E7TfC9DIz2VYskXbQYz18QwR8xsAIi88up7s",
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

// const db = mysql.createConnection({
//   // host: "localhost",
//   // user: "root",
//   // password: "",
//   // // port: 3307,
//   // database: "TWILIOMYSQL",

//   host: "mysql-bulksms-pravinray543-ecac.h.aivencloud.com",
//   user: "avnadmin",
//   password: "AVNS_BLfsv4u-H1--vGDlEpY",
//   port: 21538,
//   database: "TWILIOMYSQL",
// });

// // connect to database
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connection done");
// });

// //crate db
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE  TWILIOMYSQL";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("result");
//     res.send("Database Created");
//   });
// });

// const coursess = [];
// const Tokens = [];
// // app.post("/signUp",(req,res)=>{
// //     const schema ={
// //         Name:Joi.string().min(3).required(),
// //         Email:Joi.string().min(3).required(),
// //         PhoneNumber:Joi.string().min(3).required(),
// //         Password:Joi.string().min(3).required(),
// //         ConfirmPassword:Joi.string().min(3).required(),
// //     };
// //     const result =Joi.validate(req.body,schema);
// //      console.log(result);
// //     if(result.error){
// //        return res.status(400).send(result.error.details[0].message);
// //         return;
// //     }
// //     // let BulkSms={Name:req.body.Name,Email:req.body.Email,PhoneNumber:req.body.Password,ConfirmPassword:req.body.ConfirmPassword};
// //     // let sql="INSERT INTO BulkSms SET?"
// //     // let query=db.query(sql,BulkSms,(err,result)=>{
// //     //     if(err) throw err;
// //     //     console.log(result);
// //     //     res.send("One User added");
// //     // });

// //     const course={
// //         id:courses.length+1,
// //         Name:req.body.name,
// //         Email:req.body.Email,
// //         PhoneNumber:req.body.PhoneNumber,
// //     };
// //     courses.push(course);
// //     res.send(courses);
// // })
// const courses = [
//   // {id:1,name:'course1'},
//   // {id:2,name:'course2'},
//   // {id:3,name:'course3'},
// ];

// const router = require("./routes/user.js");

// app.use(router);

// app.get("/createposttable", (req, res) => {
//   let sql =
//     "Create Table CloudSms(id int Auto_INCREMENT,BODY VARCHAR(255), numSegments VARCHAR(5),direction VARCHAR(255),fromNumber VARCHAR(255),ToNumber VARCHAR(255),dateUpdated VARCHAR(255),price VARCHAR(255),errMessage VARCHAR(255),uri VARCHAR(255),accountSid VARCHAR(255),numMedia VARCHAR(255),status VARCHAR(255),messagingServiceSid VARCHAR(255),sid VARCHAR(255),dateSent VARCHAR(255),errorCode VARCHAR(255),priceUnit VARCHAR(255),appVersion VARCHAR(255) ,subresourceUris VARCHAR(255), PRIMARY KEY(id))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("result");
//     res.send("Posts table created");
//   });
// });

// app.get("/contact", (req, res) => {
//   let sql =
//     "Create Table contactNumber(Name VARCHAR(255),PhoneNumber VARCHAR(255))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("result");
//     res.send("Posts table created");
//   });
// });

// app.get("/countryNumber", (req, res) => {
//   let sql =
//     "Create Table countryNumber(Country VARCHAR(255),PhoneNumber VARCHAR(255),status VARCHAR(255))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("result");
//     res.send("Posts table created");
//   });
// });

// app.get("/listContact", (req, res) => {
//   let sql = "SELECT * FROM contactNumber";
//   db.query(sql, (err, data) => {
//     // if (err) return res.json("Error");
//     if (data?.length > 0) {
//       return res.json({
//         data,
//       });
//     } else {
//       return res.json("No Record");
//     }
//   });
// });

// // Insert post 1
// app.get("/addpost1", (req, res) => {
//   console.log("callRecordss", CallRecord[0]?.body);
//   let CloudSms = {
//     body: CallRecord[0]?.body,
//     numSegments: CallRecord[0]?.numSegments,
//     direction: CallRecord[0]?.direction,
//     fromNumber: CallRecord[0]?.from,
//     ToNumber: CallRecord[0]?.to,
//     dateUpdated: CallRecord[0]?.dateUpdated,
//     price: CallRecord[0]?.price,
//     errMessage: CallRecord[0]?.errorMessage,
//     uri: CallRecord[0]?.uri,
//     accountSid: CallRecord[0]?.uri,
//     accountSid: CallRecord[0]?.accountSid,
//     numMedia: CallRecord[0]?.numMedia,
//     status: CallRecord[0]?.status,
//     messagingServiceSid: CallRecord[0]?.messagingServiceSid,
//     sid: CallRecord[0]?.sid,
//     dateSent: CallRecord[0]?.dateSent,
//     errorCode: CallRecord[0]?.errorCode,
//     priceUnit: CallRecord[0]?.priceUnit,
//     appVersion: CallRecord[0]?.apiVersion,
//     subresourceUris: CallRecord[0].ubresourceUris?.media,
//   };
//   let sql = "INSERT INTO CloudSms SET?";
//   let query = db.query(sql, CloudSms, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Post 1 added");
//   });
// });

// app.get("/smsData", (req, res) => {
//   let sql = "SELECT * FROM CloudSms";
//   db.query(sql, (err, data) => {
//     // if (err) return res.json("Error");
//     if (data?.length > 0) {
//       return res.json({
//         data,
//       });
//     } else {
//       return res.json("No Record");
//     }
//   });
// });

// // app.post("/phoneNumber", (req, res) => {
// //   let sql =
// //     "Create Table contactNumber(Name VARCHAR(255),PhoneNumber VARCHAR(255))";
// //   db.query(sql, (err, result) => {
// //     if (err) throw err;
// //     console.log("result");
// //     res.send("Posts table created");
// //   });
// // });

// app.post("/phoneNumber", (req, res) => {
//   console.log("reqqrr", req.body);
//   const contactNumberData = {
//     Name: req.body.Name,
//     PhoneNumber: req.body.PhoneNumber,
//   };
//   const sql = "INSERT INTO contactnumber SET ?";
//   db.query(sql, contactNumberData, function (error, results, fields) {
//     if (error) {
//       console.error("Error executing query:", error);
//       return;
//     }
//     console.log("Query results:");
//   });
// });

// app.post("/countryNumber", (req, res) => {
//   console.log("reqq", req.body);
//   const countryNumberData = {
//     Country: req.body.Country,
//     PhoneNumber: req.body.PhoneNumber,
//   };
//   const sql = "INSERT INTO countryNumber SET ?";
//   db.query(sql, countryNumberData, function (error, results, fields) {
//     if (error) {
//       console.error("Error executing query:", error);
//       return;
//     }
//     console.log("Query results:");
//   });
// });

// app.get("/listCountryNumber", (req, res) => {
//   let sql = "SELECT * FROM countryNumber";
//   db.query(sql, (err, data) => {
//     // if (err) return res.json("Error");
//     if (data?.length > 0) {
//       return res.json({
//         data,
//       });
//     } else {
//       return res.json("No Record");
//     }
//   });
// });

// app.post("/updateProfile", (req, res) => {
//   console.log("reqq", req.body);
//   // const schema = {
//   //   email: Joi.string().min(3).required(),
//   //   // : Joi.string().min(3).required(),
//   //   // Number: Joi.string().min(3).required(),
//   //   firstName: Joi.string().min(3).required(),
//   //   lastName: Joi.string().min(3).required(),
//   //   address: Joi.string().min(3).required(),
//   //   city: Joi.string().min(3).required(),
//   //   country: Joi.string().min(3).required(),
//   //   aboutMe: Joi.string().min(3).required(),
//   // };

//   // const result = Joi.validate(req.body, schema);

//   // if (result.error) {
//   //   return res.status(400).send(result.error.details[0].message);
//   // }

//   // let siginUptable = {
//   //   // id: uuid(),
//   //   Email: req.body.email,
//   //   // PhoneNumber: req.body.Number,
//   //   // Message: req.body.message,
//   //   FirstName: req.body.firstName,
//   //   LastName: req.body.lastName,
//   //   Address: req.body.address,
//   //   City: req.body.city,
//   //   Country: req.body.country,
//   //   AboutMe: req.body.aboutMe,
//   //   // Password: req.body.password,
//   // };

//   const sql = `
//   UPDATE userdata 
//   SET Email = ?, 
//       FirstName = ?, 
//       LastName = ?, 
//       Address = ?, 
//       City = ?, 
//       Country = ?, 
//       AboutMe = ?
//   WHERE id = ?;
// `;

//   const values = [
//     "karankumar20146@gmail.com",
//     "Karan kumar",
//     "Shah",
//     "jankapur nepal",
//     "jaleshwor",
//     "Nepal",
//     "hellokaran",
//     3,
//   ];

//   db.query(sql, values, (error, results, fields) => {
//     if (error) {
//       console.error("Error executing query:", error);
//       return;
//     }
//     console.log("Query executed successfully:", results);
//   });
// });

// //   db.query(sql, siginUptable, function (error, results, fields) {
// //     if (error) {
// //       console.error("Error executing query:", error);
// //       return;
// //     }
// //     console.log("success  the story");
// //   });
// // });

// // app.get("/getposts", (req, res) => {
// //   let sql = "SELECT * FROM posts";
// //   let query = db.query(sql, (err, result) => {
// //     if (err) throw err;
// //     console.log(result);
// //     res.send("posts fetched");
// //   });
// // });

// // app.get("/getposts/:id", (req, res) => {
// //   let sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
// //   let query = db.query(sql, (err, result) => {
// //     if (err) throw err;
// //     console.log(result);
// //     res.send("single post fetched ");
// //   });
// // });

// // app.get("/updatepost/:id", (req, res) => {
// //   let newTitle = "updated title";
// //   let sql = `UPDATE posts SET title='${newTitle}' WHERE id=${req.params.id}`;
// //   let query = db.query(sql, (err, result) => {
// //     if (err) throw err;
// //     console.log(result);
// //     res.send("post updated ");
// //   });
// // });

// // app.get("/deletepost/:id", (req, res) => {
// //   let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
// //   let query = db.query(sql, (err, result) => {
// //     if (err) throw err;
// //     console.log(result);
// //     res.send("post deleted ");
// //   });
// // });

// // app.get("/", (req, res) => {
// //   // res.set("Access-Control-Allow-Origin", "*");
// //   res.send({ msg: "Hello World karannnnnnrajaj" });
// // });

// app.get("/api/course", (req, res) => {
//   res.send([1, 2, 3]);
// });

// app.get("/api/posts/:id", (req, res) => {
//   const course = courses.find((c) => c.id == parseInt(req.params.id));
// });

// // /**
// //  * @swagger
// //  * components:
// //  *   schemas:
// //  *     Book:
// //  *       type:object
// //  *       required:
// //  *         -title
// //  *         -author
// //  *       properties:
// //  *         id:
// //  *           type:string
// //  *           description:The auto-generated id  of the book
// //  */

// // /**
// //  * @swagger
// //  * /api/twillio
// //  *   post:
// //  *      summary: This api is used to check if get method working or not
// //  *      description: This api is  use to check if get method is working or not
// //  *      responses:
// //  *          200:
// //  *             description:To test get Method
// //  */

// app.post("/api/twillio", (req, res) => {
//   const number = req?.body?.Number?.split(" ");
//   const date = new Date(2022, 11, 9, 15, 0, 0);
//   schedule.scheduleJob(date, function () {
//     console.log("Task Complete @", new Date());
//     sendSMS();
//   });

//   console.log("jackky", number);
//   const sendSMS = async (body) => {
//     Promise?.all(
//       number?.map(async (number) => {
//         console.log("numberrr", number);
//         let msgOptions = {
//           from: process.env.TWILIO_FROM_NUMBER,
//           to: number,
//           body,
//         };
//         try {
//           const message = await client.messages.create(msgOptions);
//           CallRecord.push(message);
//           res.send(CallRecord);
//           console.log(CallRecord);
//         } catch (error) {
//           console.log(error);
//         }
//       })
//     );
//   };

//   sendSMS("Hello how  are you karannnnnn");
// });

// app.put("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(400).send("the course will the  given ID was invalid");

//   const schema = {
//     name: Joi.string().min(3).required(),
//   };
//   const result = validateCourse(req.body);
//   const { error } = validateCourse(req.body);
//   if (error) {
//     res.status(400).send(result.error.details[0].message);
//     return;
//   }

//   course.name = req.body.name;
//   res.send(course);
// });

// function validateCourse(course) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };
//   return Joi.validate(course, schema);
// }

// //   app.delete('api/courses/:id',(req,res)=>{
// //     const course =courses.find(c=>c.id===parseInt(req.params.id));
// //     if(!course) return res.status(400).send('the course will the  given ID was invalid')
// //       const index=course.indexOf(course);
// //     courses.splice(index,1);
// //      res.send(course)
// //   })

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening ${port}...`));
