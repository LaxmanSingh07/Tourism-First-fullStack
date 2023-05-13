const nodeMailer = require('nodemailer');

const sendEmail = async options => { 

    //1. Create a transporter (a service that will send the email)
    const transporter=nodeMailer.createTransport({
        //Activate in gmail "less secure app" option 
        // i am using the mailtrap service for sending the email

        host:process.env.EMAIL_HOST,
        // port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
            }

    });

    // console.log(options);
    //2 Define the email options

    const mailOptions={
        from:'Laxman Singh <hello@laxman.io>',
        to:options.email,
        subject:options.subject,
        text:options.message
        // html: ---> later on we will use this 
    }
    // console.log(mailOptions);
    //3 Actually send the email

    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;