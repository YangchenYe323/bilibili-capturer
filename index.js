import fetch from 'node-fetch'
import core from '@actions/core'
import nodemailer from 'nodemailer'

const setInput = ( name, value )=> {
    process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`]=value
}

setInput('api_url', 'https://api.bilibili.com/x/web-interface/card')
setInput('page_url', 'https://space.bilibili.com')
setInput('mid', '25415856')
setInput('target', '1789')
setInput('user_email', 'yyc2022@outlook.com')
setInput('user_pass', 'Qwerty!23456')
setInput('receiver_email', 'yeyangchen0323@gmail.com')

const user_info_url = core.getInput('api_url', { required: true })
const page_url = core.getInput('page_url', { required: true })

const mid = core.getInput('mid', { required: true })
const target = core.getInput('target', { required: true })

// email configuration for sending
const user_email = core.getInput('user_email', { required: true })
const user_pass = core.getInput('user_pass', { required: true })

// email configuration for receiving
const receiver_email = core.getInput('receiver_email', { required: true })

const fetch_follower = async () => {
	const response = await fetch(`${user_info_url}?mid=${mid}`);

	let content = await response.text();
	content = JSON.parse(content)

	return content.data.follower;
};

const send_notification = async (follower) => {

	//! hotmail service is hard-coded for now, to enable
	//! your own outlook email, see 
	//! https://docs.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission
	let transporter = nodemailer.createTransport({
		service: "hotmail",
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
		text: `Follower reaches ${follower}`, // plain text body
		html: `
			<html>
				<body>
					<b>Follower reaches ${follower}</b>
				</body>
			</html>`, // html body
	});

	console.log(info)
}

const run = async() => {
	let follower = await fetch_follower()
	console.log(follower)
	// 摆烂操作
	// fail the job to let github send email
	if (Math.abs(follower - target) < 20) {
		throw new Error(`follower reaches ${follower}`);
	}
	// if (true || Math.abs(follower - target) < 20) {
	// 	await send_notification(follower)
	// }
}

run()