const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
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

async function mail(clientEmail,clientName) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.email, // sender address
      to: clientEmail, // list of receivers
      subject: "Welcome to Home Quest!", // Subject line
    //   text: "Hello world?", // plain text body
      html: `
      <head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
      <div class="container">
        <div class="header">
            <h1>Welcome to Home Quest!</h1>
        </div>
        <div class="content">
            <p>Dear <b>${clientName}</b> &#10084; ,</p>
            <p>We are thrilled to have you on board. Your journey towards finding your dream home begins here, and we are committed to making it as seamless and enjoyable as possible.</p>
            <p>At Home Quest, you will find a wide range of properties to explore, all tailored to meet your unique preferences. Whether you are looking to buy, rent, or simply browse, our platform offers the best tools and resources to assist you.</p>
            <p>If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us anytime.</p>
            <p>Thank you for choosing Home Quest. We look forward to helping you find your perfect home.</p>
            <p>Warm regards,</p>
            <p>The Home Quest Team</p>
        </div>
        <div class="footer">
            <p>Home Quest &copy; 2024</p>
        </div>
    </div>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  


  module.exports = {mail};