import fetch from 'node-fetch'
import core from '@actions/core'

const user_info_url = core.getInput('api_url', { required: true })
const page_url = core.getInput('page_url', { required: true })
const mid = core.getInput('mid', { required: true })
const target = core.getInput('target', { required: true })

const fetch_follower = async () => {
	const response = await fetch(`${user_info_url}?mid=${mid}`);

	let content = await response.text();
	content = JSON.parse(content)

	return content.data.follower;
};

const run = async() => {
	let follower = await fetch_follower()
	console.log(follower)
}

run()