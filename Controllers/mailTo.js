const nodemailer = require("nodemailer");
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

async function mail(clientEmail, clientName) {
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

confirm = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f2f2f2;
    }

    .container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
      text-align: center;
      color: #007bff;
    }

    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }

    .details {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      font-size: 16px;
      color: #333;
    }

    .details p {
      margin: 5px 0;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Appointment Confirmed!</h1>
    <p>Dear <strong>[Client Name]</strong>,</p>
    <p>Your appointment with <strong>[Agent Name]</strong> has been successfully confirmed. Below are the details of your appointment:</p>

    <div class="details">
      <p><strong>Date:</strong> [Appointment Date]</p>
      <p><strong>Time:</strong> [Appointment Time]</p>
      <p><strong>Location:</strong> [Appointment Location]</p>
    </div>

    <p>If you have any questions or need to reschedule, feel free to contact us at <strong>[Contact Information]</strong>.</p>

    <p>Thank you for choosing our services!</p>

    <div class="footer">
      <p>&copy; 2024 Your Real Estate Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
async function appointmentReceivedMail(clientEmail, clientName) {
  const appointmentReceived = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Will Contact You Soon</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f2f2f2;
      }
  
      .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
  
      h1 {
        color: #007bff;
      }
  
      p {
        font-size: 16px;
        color: #555;
        line-height: 1.6;
      }
  
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Thank You!</h1>
      <p>Dear <strong>${clientEmail}</strong>,</p>
      <p>Your request has been received. An agent from our team will contact you shortly to discuss your requirements and assist you further.</p>
      <p>If you have any urgent questions, feel free to reach out to us at <strong>${process.env.CONTACT}</strong>.</p>
      <p>We appreciate your trust in our services and look forward to helping you find the perfect property!</p>
  
      <div class="footer">
        <p>&copy; 2024 Your Real Estate Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.email, // sender address
    to: clientEmail, // list of receivers
    subject: "Welcome to Home Quest Your Appointment !", // Subject line
    //   text: "Hello world?", // plain text body
    html: appointmentReceived
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

async function appointmentNoticeMail(clientEmail, clientName,agentMail,agentName) {
 const  appointmentNotice = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f2f2f2;
      }
  
      .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        text-align: center;
        color: #007bff;
      }
  
      p {
        font-size: 16px;
        color: #555;
        line-height: 1.6;
      }
  
      .details {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
        font-size: 16px;
        color: #333;
      }
  
      .details p {
        margin: 5px 0;
      }
  
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>New Appointment Request</h1>
      <p>Dear <strong>${agentName}</strong>,</p>
      <p>You have received a new appointment request from a client. Please find the details below:</p>
  
      <div class="details">
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Client Email:</strong> ${clientEmail}</p>
      </div>
  
      <p>Please reach out to the client as soon as possible to confirm and arrange the appointment.</p>
      <p>If you have any questions, feel free to contact the admin team at <strong>${process.env.CONTACT}</strong>.</p>
  
      <div class="footer">
        <p>&copy; 2024 Your Real Estate Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.email, // sender address
    to: agentMail, // list of receivers
    subject: "Welcome to Home Quest Your Appointment Request !", // Subject line
    //   text: "Hello world?", // plain text body
    html: appointmentNotice
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


module.exports = { mail,appointmentReceivedMail,appointmentNoticeMail };
