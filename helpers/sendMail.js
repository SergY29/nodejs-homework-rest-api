const sgMail = require('@sendgrid/mail')
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (data) => {
    try {
        const email = { ...data, from: "serg.yurtin.21@gmail.com" }
        await sgMail.send(email);
        return true;

    } catch (error) {
        return error.massage
    }
}

module.exports = {
    sendMail
};