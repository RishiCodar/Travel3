const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public",express.static(__dirname+"/public"));
app.use("/vendor",express.static(__dirname+"/vendor"));
app.use("/assets",express.static(__dirname+"/assets"));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/home.html")
})
app.get("/Kedarkantha",function (req,res) {
    res.sendFile(__dirname+"/Kedarkantha.html")
})

app.get("/Harkidun",function (req,res) {
  res.sendFile(__dirname+"/harkidun.html")
})

app.get("/Ruinsara",function (req,res) {
  res.sendFile(__dirname+"/ruinsara.html")
})

app.get("/Baraadsar",function (req,res) {
  res.sendFile(__dirname+"/baraadsar.html")
})

app.get("/4-Dham",function (req,res) {
  res.sendFile(__dirname+"/4-dham.html")
})

app.get("/contact",function (req,res) {
    res.sendFile(__dirname+"/contact.html")
})

app.get("/about",function (req,res) {
    res.sendFile(__dirname+"/about.html")
})

// social media links
app.get("https://www.facebook.com/profile.php?id=100023814220111&mibextid=ZbWKwL",function (req,res) {
})

app.get("https://instagram.com/happytriptohimalaya?igshid=ZDdkNTZiNTM=",        function (req,res) {
})

app.get("https://youtube.com/@HappytriptoHimalaya-Treking",
  function (req,res) {
})

app.post("/send", (req, res) => {
    const { Username, email, phone, Date, message } = req.body;
    console.log(Username + email + phone + message);
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
    });
    const autoReplyMailOptions = {
      from:process.env.EMAIL,
      to: email,
      subject: 'Happy Trip to Himalaya - Thank you for showing interest',
      text: `Dear ${Username}, \n\nThank you for contacting us. We have received your message and will get back to you as soon as possible. \n\nBest regards, \nHappy Trip To Himalaya`
    };
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: "Booking",
        text: `Name: ${Username}\nEmail: ${email}\nDate Of Travel: ${Date}\nMessage: ${message}\nPhone: ${phone}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.sendFile(__dirname + "/error.html")
        } else {
          res.sendFile(__dirname + "/contact_u_soon.html")
        }
      });
  transporter.sendMail(autoReplyMailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log('Automatic reply email sent: ' + info.response);
    }
  });
  
})
app.listen(process.env.PORT||3000, () => console.log('Server started on port 3000'));