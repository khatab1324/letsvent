import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/components/auth/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (email: string, token: string) => {
  const verificationLink = `http://localhost:3000/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "k.s.fayyad.dev@gmail.com", //chnage this to be email
    subject: "Hello world",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          .header {
            text-align: center;
            padding: 30px 0;
            background-color: #007BFF;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            text-align: left;
            line-height: 1.6;
            color: #333333;
          }
          .content h2 {
            color: #007BFF;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #28a745;
            text-decoration: none;
            border-radius: 5px;
          }
          .button:hover {
            background-color: #218838;
          }
          .footer {
            text-align: center;
            padding: 10px 0;
            background-color: #007BFF;
            color: #ffffff;
            border-radius: 0 0 8px 8px;
          }
          .footer p {
            margin: 0;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <h2>Hello ${email},</h2>
            <p>Thank you for registering with our service. Please click the button below to verify your email address:</p>
            <a href="${verificationLink}" class="button">Verify Email</a>
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>Best regards,</p>
            <p>The Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Our Service. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `, //write here
  });
};
