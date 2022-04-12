import core from '@actions/core'
import fetch from 'node-fetch';
import captureWebsite from 'capture-website';

const user_info_url = 'https://api.bilibili.com/x/web-interface/card'
const page_url = 'https://space.bilibili.com'
const mid = '25415856'
const target = 1789

const fetch_follower = async () => {
	const response = await fetch(`${user_info_url}?mid=${mid}`);

	let content = await response.text();
	content = JSON.parse(content)

	return content.data.follower;
};

const screenshot = async (dirpath, follower) => {
	const filename = `${dirpath}/${follower}.png`

	await captureWebsite.file(`${page_url}/${mid}`, filename)
}

const run = async() => {
	let follower = await fetch_follower()
	console.log(follower)
	// if (Math.abs(follower - target) < 5) {
	// 	try {
	// 		await screenshot('pic', follower)
	// 	} catch {
	// 		// pass
	// 	}
	// }
}

run()
