const express = require("express");
const app = express();
// const image = express();
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
const Joi = require("joi");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const router = express.Router();
const multer = require("multer");
const { v4: uuid } = require("uuid");
// const generateOtp = require("./generateOtp");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

// const path = require("path");
// const upload = multer({ dest:"uploads/" });
//  const upload = multer({ dest: "./routes/image/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-&${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// const storage=multer.diskStorage({
//   destination:"./routers/images",
//   filename:(req,file,cb)=>{
//     return cb(null,`$(file.filename)_${Date.now()${path.extrme}}`)
//   }
// })

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "rajushah20146@gmail.com",
    pass: "xrpj revd dkkw hrzj",
  },
});

async function main(abc) {
  console.log("fjgfkgdjf", abc);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "rajushah20146@gmail.com", // sender address
    to: "karankumar20146@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

const db = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // // port: 3307,
  // database: "TWILIOMYSQL",

  host: "mysql-bulksms-pravinray543-ecac.h.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_BLfsv4u-H1--vGDlEpY",
  port: 21538,
  database: "TWILIOMYSQL",
});

router.post("/upload", upload.single("profileImage"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body.name);
  res.send(req.file);
  // return res.redirect("/");
});

router.get("/message", (req, res) => {
  console.log("Show some messages or whatever...");
  main("anc");
  res.end();
});

router.get("/createsiginUptable", (req, res) => {
  let sql =
    "Create Table userData(Email VARCHAR(255),PhoneNumber VARCHAR(255),Password VARCHAR(255),FirstName VARCHAR(255),LastName VARCHAR(255),Address VARCHAR(255),City VARCHAR(255),Country VARCHAR(255),AboutMe VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.send("signupTable created");
  });
});

router.post("/api/signUp", (req, res) => {
  // console.log("resssss", res);
  const schema = {
    email: Joi.string().min(3).required(),
    // : Joi.string().min(3).required(),
    Number: Joi.string().min(3).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    country: Joi.string().min(3).required(),
    aboutMe: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let siginUptable = {
    id: uuid(),
    Email: req.body.email,
    PhoneNumber: req.body.Number,
    // Message: req.body.message,
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Address: req.body.address,
    City: req.body.city,
    Country: req.body.country,
    AboutMe: req.body.aboutMe,
    // Password: req.body.password,
  };
  // const token = generateOtp();

  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  console.log("testing", OTP);
  let sql = "INSERT INTO userdata SET?";
  let query = db.query(sql, siginUptable, (err, result) => {
    if (err) throw err;
    res.send({
      type: "Success",
      msg: `Successfully user registered`,
      otp: `${OTP}`,
    });
  });
});

router.put("/api/setpassword", (req, res) => {
  // const {  } = req.body;

  // return res.json({ res });
  // let upDatePassword = {
  //   Password: "123",
  // };

  let sql = "UPDATE userdata SET Password = ? WHERE PhoneNumber = ?";
  const number = "9824877229";
  let query = db.query(sql, [req.body.password, number], (err, result) => {
    if (err) return res.json(err);
    return res.json({ updated: true });
  });
});

router.post("/login", (req, res) => {
  console.log("reqq", req.body);

  let sql = "SELECT * FROM  userdata  WHERE `Email`= ? AND `Password`= ? ";
  const user = {
    Email: req.body.Email,
    Password: req.body.Password,
  };

  db.query(sql, [req.body.Email, req.body.Password], (err, data) => {
    if (err) return res.json("Error");
    if (data?.length > 0) {
      jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
        return res.json({
          token,
          data,
        });
      });
    } else {
      return res.json("No Record");
    }
  });
});

//   app.post("/log", (req, resp) => {
//     const user = {
//       id: 1,
//       username: "anil",
//       email: "abc@gmail.com",
//     };
//     jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
//       resp.json({
//         token,
//       });
//     });
//   });

//   app.post("/profile", verifyToken, (req, resp) => {
//     jwt.verify(req.token, secretKey, (err, authData) => {
//       if (err) {
//         resp.send({ result: "invalid token" });
//       } else {
//         resp.json({
//           message: "profile accessed",
//           authData,
//         });
//       }
//     });
//   });

// function verifyToken(req, resp, next) {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined") {
//       const bearer = bearerHeader.split(" ");
//       const token = bearer[1];
//       req.token = token;
//       next();
//     } else {
//       resp.send({
//         result: "Token is  not valid",
//       });
//     }
//   }

module.exports = router;
