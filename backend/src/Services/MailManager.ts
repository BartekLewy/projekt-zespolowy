// import * as NodeMailer from 'nodemailer';
//
// import {config} from "../../config";
// import {log} from "../commons/Logger";
//
// export class MailManager {
//
//     private static transporter: NodeMailer.Transporter = NodeMailer.createTransport(config.mail.settings);
//
//     static sendMail(receiver: string, subject: string, content: string) {
//         let mailOptions = {
//             from: config.mail.senderName + ' <' +config.mail.senderEmail + '>',
//             to: receiver,
//             subject: subject,
//             html: content
//         };
//
//         this.transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return log.error({data:{errors: error}}, "Nie udało się wysłać wiadomości");
//             }
//             log.info({data:{info:info}}, "Wiadomość została wysłana");
//         });
//     }
// }