import nodemailer from "nodemailer";

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "koshtisagar7778@gmail.com", // Replace with your email
    pass: "kway tluf ucwg bkqa", // Replace with your app password (not your actual password)
  },
});

// Function to Send Email
export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: "koshtisagar7778@gmail.com",
    to,
    subject,
    text,
    html: `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Notification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .email-container {
            max-width: 500px;
            margin: auto;
            background: #ffffff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #4F46E5;
            font-size: 24px;
            margin-bottom: 15px;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .button {
            display: inline-block;
            background-color:rgb(255, 255, 255);
            color: #ffffff;
            text-color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #3a3dbb;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <h1>🎉 ${subject}</h1>
        <p>${text}</p>
        <p class="footer">Best Regards,<br><strong>Your Team</strong></p>
    </div>

</body>
</html>

    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent: ", info.response);
    return true;
  } catch (error) {
    console.log("Email Error: ", error);
    return false;
  }
};
