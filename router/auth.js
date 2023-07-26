const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");
const ContactUs = require("../models/contactSchema");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");

// router.get("/", (req, res) => {
//   res.cookie("test", "prince");
//   res.send("home page router");
// });

// -------------Login page using async method------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Pls fill all the details" });
  }

  try {
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const passVerify = await bcrypt.compare(password, userLogin.password);
      if (passVerify) {
        const token = await userLogin.genarateAuthToken();
        // console.log(token);
        //----------method of token expire after some milli seconds--------------
        // res.cookie("jwtoken", token, {
        //   expires: new Date(Date.now + 600000),
        //   httpOnly: true,
        // });

        //----------method of token not expire after some milli seconds--------------
        res.cookie("jwtoken", token);
        return res.status(201).json({ message: "Login Successful!" });
      } else {
        return res.status(422).json({ error: "Invalid email or password" });
      }
    } else {
      return res.status(422).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
  }
});

// -------------Register page using async method---------------------------
global.nam = "";
global.phone = "";
global.mail = "";
global.pass = "";
global.imgfile = "";
global.vOtp = "";
router.post("/register", async (req, res) => {
  const { name, tel, email, password, cpassword, imageFile } = req.body;

  global.nam = name;
  global.phone = tel;
  global.mail = email;
  global.pass = password;
  global.imgfile = imageFile;

  // if (!name || !tel || !email || !password || !cpassword || !imageFile) {
  //   return res.status(422).json({ error: "Enter all the fields!" });
  // }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists!" });
    } //else if (password != cpassword) {
    //   return res.status(422).json({ error: "Enter same password!" });
    // }

    // --------------OTP Generator---------------------------

    global.vOtp = Math.floor(Math.random() * 9000 + 1000);

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "prince",
      to: global.mail,
      subject: "Verification code of MERN-Stack application",
      html: `<div
      style="
        font-family: Helvetica, Arial, sans-serif;
        min-width: 1000px;
        overflow: auto;
        line-height: 2;
      "
    >
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <a
            href=""
            style="
              font-size: 1.4em;
              color: #00466a;
              text-decoration: none;
              font-weight: 600;
            "
            >${global.nam}</a
          >
        </div>
        <p style="font-size: 1.1em">Hi,</p>
        <p>
          Thank you for choosing this application. Use the following OTP to complete
          your Sign Up procedures. OTP is valid for 2 minutes
        </p>
        <h2
          style="
            background: #00466a;
            margin: 0 auto;
            width: max-content;
            padding: 0 10px;
            color: #fff;
            border-radius: 4px;
          "
        >
          ${global.vOtp}
        </h2>
        <p style="font-size: 0.9em">Regards,<br />Prince</p>
        <hr style="border: none; border-top: 1px solid #eee" />
        <div
          style="
            float: right;
            padding: 8px 0;
            color: #aaa;
            font-size: 0.8em;
            line-height: 1;
            font-weight: 300;
          "
        >
          <p>Mothkuri Prince</p>
          <p>Email : princemothkuri@gmail.com</p>
          <p>Phone number : 7995354505</p>
        </div>
      </div>
    </div>`,
    });
    console.log("Message sent: " + info.messageId);
    console.log(global.nam);
    console.log(global.mail);
    console.log(global.phone);
    console.log(global.pass);
    console.log(global.vOtp);
    return res.status(201).json({ message: "OTP sent!" });

    // const user = new User({
    //   name: global.nam,
    //   tel: global.phone,
    //   email: global.mail,
    //   password: global.pass,
    //   imageFile: global.imgfile,
    // });

    // await user.save();
    // return res.status(201).json({ message: "Successfully Registered!" });
  } catch (err) {
    console.log(err);
  }
});

// --------------OTP verification--------------
router.post("/verify", async (req, res) => {
  const { otp } = req.body;
  console.log("log is from verify " + global.vOtp);
  if (Number(global.vOtp) === Number(otp)) {
    console.log("OTP Verified!" + otp);
    try {
      const user = new User({
        name: global.nam,
        tel: global.phone,
        email: global.mail,
        password: global.pass,
        imageFile: global.imgfile,
      });

      await user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: process.env.EMAIL_PORT,
        secure: process.env.SECURE,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      const info = await transporter.sendMail({
        from: "prince",
        to: global.mail,
        subject: "Registration Successfull of MERN-Stack application",
        attachments: [
          {
            filename: "logo.PNG",
            path: __dirname + "/logo.PNG",
            cid: "unique@logo.ee", //same cid value as in the html img src
          },
        ],
        html: `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <title>
    </title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }
        .ReadMsgBody {
            width: 100%;
        }
        .ExternalClass {
            width: 100%;
        }
        .ExternalClass * {
            line-height: 100%;
        }
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
         table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
            }
        }
    </style>
    <style type="text/css">
    </style>
</head>
<body style="background-color:#f9f9f9;">
    <div style="background-color:#f9f9f9;">
        <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                <tbody>
                    <tr>
                        <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                <tbody>
                    <tr>
                        <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:64px;">
                                                            <img height="auto" src="cid:unique@logo.ee" style="border:0;display:flex;justify-content: center;align-items: center;" width="100%" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                Welcome!
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                Hello ${global.nam}!<br></br>
                                                Thank you for signing up. We're really happy to have you! Click the link below to login to your account:
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                <tr>
                                                    <td align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                        <p style="background:#2F67F6;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-transform:none;">
                                                            <a href="http://192.168.0.146:3000/login" style="text-decoration:none;color: white;">Login to Your Account</a>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                Best regards,<br><br> Prince<br>Email : princemothkuri@gmail.com<br>
                                                Phone number : 7995354505
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</body>

</html>`,
      });

      global.nam = "";
      global.phone = "";
      global.mail = "";
      global.pass = "";
      global.imgfile = "";
      global.vOtp = "";
      return res.status(201).json({ message: "Successfully Registered!" });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Incorrect OTP!" + otp);
    return res.status(422).json({ error: "Incorrect OTP!" });
  }
});

// ----------About us page---------------
// router.get("/about", authenticate, (req, res) => {
//   // console.log("Exit of MiddleWare...");
//   res.send(req.rootUser);
//   return res.status(201).json(req.rootUser);
// });

router.get("/getdata", authenticate, (req, res) => {
  // console.log("Exit of MiddleWare...");
  res.send(req.rootUser);
  return res.status(201).json(req.rootUser);
});

// router.get("/getpics", authenticate, (req, res) => {
//   // console.log("Exit of MiddleWare...");
//   res.send(req.rootUser);
//   return res.status(201).json(req.rootUser);
// });

router.post("/savepic", authenticate, async (req, res) => {
  const pic = req.body;

  if (!pic) {
    return res.status(422).json({ error: "Please select image!" });
  }

  try {
    const userPicture = await User.findOne({ _id: req.userID });
    if (userPicture) {
      const userImage = await userPicture.addPicture(pic);
      await userPicture.save();
      res.status(201).json({ message: "Image saved successfully!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/download", authenticate, (req, res) => {
  const file = req.fileName;
  res.download(file);
});

router.post("/contact", authenticate, async (req, res) => {
  const { name, email, tel, message } = req.body;

  if (!name || !email || !tel || !message) {
    return res.status(422).json({ error: "Pls fill all the details" });
  }

  try {
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        tel,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "Message sent successfully!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  console.log("Logout Successful!");
  res.clearCookie("jwtoken", { path: "/" });
  return res.status(200).json({ message: "Logout Successful!" });
});

// --------contact us for non-users-------------
router.post("/nucontact", async (req, res) => {
  const { name, email, tel, message } = req.body;

  // if (!name || !email || !phone || !message) {
  //   return res.status(422).json({ error: "Enter all the fields!" });
  // }

  try {
    const response = new ContactUs({
      name,
      email,
      tel,
      message,
    });
    await response.save();

    return res.status(201).json({ message: "message sent!" });
  } catch (err) {
    console.error(err);
    return res.status(422).json({ error: "Server error!" });
  }
});

// ------------Register page using promises method----------------------
// router.post("/register", (req, res) => {
//   const { name, tel, email } = req.body;

//   if (!name || !tel || !email) {
//     return res.status(422).json({ error: "Enter all the fields!" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exists!" });
//       }
//       const user = new User({ name, tel, email });
//       user
//         .save()
//         .then(() => {
//           return res.status(201).json({ message: "Successfully Registered!" });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
