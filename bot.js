import fetch from 'node-fetch'

const send_telegram_notification = async (
	bot_token,
	receiver_chat_id,
	message,
) => {
	const url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${receiver_chat_id}&text=${message}`
	const body = await fetch(url)
	const response = await body.json()
	console.log(response)
}

export default send_telegram_notification


