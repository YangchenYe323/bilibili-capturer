import fetch from 'node-fetch';

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

const run = async() => {
	let follower = await fetch_follower()
	console.log(follower)
}

run()