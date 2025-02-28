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
