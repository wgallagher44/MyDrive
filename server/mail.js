const nodeMailer = require('nodemailer')

const html = `
<h1>Hello World</h1>
<p>Isn't NodeMailer USeful</p>`

 function main(){
   var transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        port:465,
        secure:true,
        auth: {
            user:'mydrive3456@gmail.com',
            pass:"mednajzjdhptkxkf"
        }

    })
  const mailOptions = {
      from: "MyDrive <mydrive3456@gmail.com>",
    to:"creeksidewill@gmail.com",
    subject:"Testing nodemailer",
    text:"This is to test out node mailer"
  }
   transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log("Email sent: " + info.response)
    }
  })
}
main()