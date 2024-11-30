const nodemailer = require("nodemailer");
const os = require("os");
const dns = require("node:dns");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.email,
    pass: process.env.emailpass,
  },
});

const d = new Date();

let options = { family: 4 };
const address = dns.lookup(os.hostname(), options, (err, addr) => {
  if (err) {
    console.error(err);
  } else {
    // console.log(`IPv4 address: ${addr}`);
  }
});

async function mail(clientEmail, clientName) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.email, // sender address
    to: clientEmail, // list of receivers
    subject: "Welcome to Home Quest!", // Subject line
    //   text: "Hello world?", // plain text body
    html: `
       <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            color: #666666;
            border-top: 1px solid #e4e4e4;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
     <div class="container">
        <div class="header">
            <h1>Security Alert: New Login Detected</h1>
        </div>
        <div class="content">
            <p>Dear ${clientName},</p>
            <p>We noticed a new login to your account on <strong>Home Quest</strong>. If this was you, you can safely ignore this email. Here are the details:</p>
            <ul>
               
                <li><strong>Date and Time:</strong> ${d} </li>
                <li><strong>Device:</strong> ${address.hostname}</li>
            </ul>
            <p>If you did not log in from this device, please <a href="mailtoprocess.env.email target="_blank" class="btn">Contact Support</a> immediately to secure your account.</p>
            <p>Thank you for using Home Quest.</p>
            <p>Best regards,<br>The Home Quest Team</p>
        </div>
        <div class="footer">
            <p>Home Quest &copy; 2024. All rights reserved.</p>
        </div>
    </div>
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = { mail  };
