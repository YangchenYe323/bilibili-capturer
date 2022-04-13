import fetch from 'node-fetch'
import core from '@actions/core'
import send_telegram_notification from './bot.js'

const user_info_url = core.getInput('api_url', { required: true })

const mid = core.getInput('mid', { required: true })
const target = core.getInput('target', { required: true })

const token = core.getInput('token', { required: true })
const receiver_chat_id = core.getInput('receiver_chat_id', { required: true })

const fetch_follower = async () => {
	const response = await fetch(`${user_info_url}?mid=${mid}`);

	let content = await response.text();
	content = JSON.parse(content)

	return content.data.follower;
};


const run = async() => {
	let follower = await fetch_follower()
	console.log(follower)
	if (true || Math.abs(follower - target) < 20) {
		await send_telegram_notification(token, receiver_chat_id, `Number of follower is ${follower}`)
	}
}

run()