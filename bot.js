import TelegramBot  from "node-telegram-bot-api"

const send_telegram_notification = async (
	bot_token,
	receiver_chat_id,
	message,
) => {
	const bot = new TelegramBot(bot_token);
	await bot.sendMessage(receiver_chat_id, message)
}

export default send_telegram_notification


