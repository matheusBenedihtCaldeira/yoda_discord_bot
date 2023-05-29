const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Reply with pong'),

	async	execute(event) {
		await event.reply('Pong!');
	},
};
