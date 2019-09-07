import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import { adjectives, nouns } from './words';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
  const randomNumber = (array) => Math.floor(Math.random() * array.length);
  return `${adjectives[randomNumber(adjectives)]} ${nouns[randomNumber(adjectives)]}`;
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  }
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "goffh91@gmail.com",
    to: address,
    subject: `Auth code for ${process.env.PROJECT}`,
    html: `
      Hello! Your authentication code is <strong>${secret}</strong>.<br>
      Copy paste on the ${process.env.PROJECT} to login.
    `
  }
  return sendMail(email);
}