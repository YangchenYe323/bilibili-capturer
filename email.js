import nodemailer from 'nodemailer'

const send_notification = async (
	{
		user_email,
		user_pass,
		receiver_email,
	}, 
	message
) => {

	//! hotmail service is hard-coded for now, to enable
	//! your own outlook email, see 
	//! https://docs.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission
	let transporter = nodemailer.createTransport({
		service: 'hotmail',
		auth: {
		  user: user_email,
		  pass: user_pass,
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"Bilibili Capturer" ${user_email}`, // sender address
		to: receiver_email, // list of receivers
		subject: "Notification", // Subject line
		text: `${message}`, // plain text body
		html: `
			<html>
				<body>
					${message}
				</body>
			</html>`, // html body
	});

	console.log(info)
}

export default send_notification