import * as NodeMailer from 'nodemailer';

export class MailManager {

    private static transporter: NodeMailer.Transporter = NodeMailer.createTransport({
        host: "",
        port: 465,
        secure: true,
        auth: {
            user: "",
            pass: "",
        }
    });

    static sendMail(receiver: string, subject: string, content: string) {
        let mailOptions = {
            from: "SKLEP Z GRAMI < kdebowski@codingskies.com >",
            to: receiver,
            subject: subject,
            html: content
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("niue udało się wysłać wiadomości");
                console.log(error);
            }
            console.log("Wiadomość została wysłana");
        });
    }
}