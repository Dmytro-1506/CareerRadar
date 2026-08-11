
import fs from "fs";
import path from "path";
import { transporter } from "../config/mail.ts";
// import emailList from "../files/emailAdresse/emails.js";


async function sendEmail(to) {
    
    const subject =
    "Bewerbung um einen Platz für die betriebliche Praxisphase als Fachinformatiker für Anwendungsentwicklung";
    
    const filePath_1 = path.join(
            process.cwd(),
            "../files/emailFiles",
            "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Lebenslauf.pdf"
        );
    const filePath_2 = path.join(
            process.cwd(),
            "../files/emailFiles",
            "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Anschreiben.pdf"
        );
    const filePath_3 = path.join(
            process.cwd(),
            "../files/emailFiles",
            "Dmytro_Shkilniuk_Fullstack_Developer_Certificate_GoIT.pdf"
        );
    const filePath_4 = path.join(
            process.cwd(),
            "../files/emailFiles",
            "Shkilniuk_Dmytro_Umschulung_Fachinformatiker_Anwendungsentwicklung_Zwieschenzeugniss.pdf"
        );

    const htmlPath = path.join(
            process.cwd(),
            "../files/emailText",
            "emailText_2.html"
        );
    
    const html = fs.readFileSync(
            htmlPath,
            "utf-8"
        );

    await transporter.sendMail({
        
        from:  process.env.EMAIL_USER,
        to,
        subject,
        html,
        attachments:[
            {
                filename: "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Lebenslauf.pdf",
                path: filePath_1
            },
            {
                filename: "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Anschreiben.pdf",
                path: filePath_2
            },
            {
                filename: "Dmytro_Shkilniuk_Fullstack_Developer_Certificate_GoIT.pdf",
                path: filePath_3
            },
            {
                filename: "Shkilniuk_Dmytro_Umschulung_Fachinformatiker_Anwendungsentwicklung_Zwieschenzeugniss.pdf",
                path: filePath_4
            },
            {
                filename: "github.png",
                path: "../images/github.png",
                cid: "github"
            },
            {
                filename: "linkedin.png",
                path: "../images/linkedin.png",
                cid: "linkedin"
            }
        ]
    });
}

async function sichBewerben(emailList) {
    let counter = 1;

    for (const email of emailList) {
        console.log('${counter} ${email}');
        counter += 1;

        await sendEmail(email);
    }
}

sichBewerben(emailList).catch(console.error);