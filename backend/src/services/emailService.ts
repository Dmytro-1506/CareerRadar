import fs from "fs";
import path from "path";

import { pool } from "../db/pool";

import { transporter } from "../config/mail";

export async function sendEmail( to: string ) {

    const subject =
        "Anfrage zur betrieblichen Praxisphase – Fachinformatiker für Anwendungsentwicklung";

    const message =
        "";

    const lebenslaufPath =
        path.join(
            process.cwd(),
            "files/emailFiles",
            "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Lebenslauf.pdf"
        );
    const anschreibenPath =
        path.join(
            process.cwd(),
            "files/emailFiles",
            "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Anschreiben.pdf"
        );
    const certificateGoitPath =
        path.join(
            process.cwd(),
            "files/emailFiles",
            "Dmytro_Shkilniuk_Fullstack_Developer_Certificate_GoIT.pdf"
        );
    
    const zwieschenzeugnissComcavePath =
        path.join(
            process.cwd(),
            "files/emailFiles",
            "Shkilniuk_Dmytro_Umschulung_Fachinformatiker_Anwendungsentwicklung_Zwieschenzeugniss.pdf"
        );

    const htmlPath =
        path.join(
            process.cwd(),
            "files/emailText",
            "allgemeineEmailText.html"
        );

    const html =
        fs.readFileSync(
            htmlPath,
            "utf-8"
        );

    await transporter.sendMail({

        from:  process.env.EMAIL_USER,
        to,
        subject,
        text:  message,
        html,
        attachments:[
            {
                filename: "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Lebenslauf.pdf",
                path: lebenslaufPath
            },
            {
                filename: "Fachinformatiker_für_Anwendungsentwicklung_Dmytro_Shkilniuk_Anschreiben.pdf",
                path: anschreibenPath
            },
            {
                filename: "Shkilniuk_Dmytro_Umschulung_Fachinformatiker_Anwendungsentwicklung_Zwieschenzeugniss.pdf",
                path: zwieschenzeugnissComcavePath
            },
            {
                filename: "Dmytro_Shkilniuk_Fullstack_Developer_Certificate_GoIT.pdf",
                path: certificateGoitPath
            },
            {
                filename: "github.png",
                path: path.join(
                    process.cwd(),
                    "files/images/github.png"
                ),
                cid: "github"
            },
            {
                filename: "linkedin.png",
                path: path.join(
                    process.cwd(),
                    "files/images/linkedin.png"
                ),
                cid: "linkedin"
            }
        ]
    });

    await pool.query(
        ` INSERT INTO emails (
            to_email,
            subject,
            message
        )

        VALUES ( $1, $2, $3 )`,
        [to, subject, message])
}

export async function getEmails() {

    const result = await pool.query(
        `SELECT * FROM emails
        ORDER BY created_at DESC`
    );

    return result.rows;
}

export async function removeEmail( id: number ) {

    await pool.query(
        `DELETE FROM emails
        WHERE id=$1`,
        [id]
    );
}