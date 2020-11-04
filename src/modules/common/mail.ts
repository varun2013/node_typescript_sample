import * as nodemailer from 'nodemailer';
import environment from "../../environment";


const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
  //  secure: true, // use SSL
    auth: {
        user: "azizkanwal10@gmail.com",
        pass: "Talentelgia!@#"
    }
};
export default class MailService {
  private _transporter: nodemailer.Transporter;
  constructor() {
    this._transporter = nodemailer.createTransport(smtpConfig);
  }
  sendMail(to: string, subject: string, content: string) {
    let options = {
      from: 'azizkanwal10@gmail.com',
      to: to,
      subject: subject,
      text: content
    }

    this._transporter.sendMail(
      options, (error, info) => {
        if (error) {
          return console.log(`error: ${error}`);
        }
        console.log(`Message Sent ${info.response}`);
      });
  }
}
