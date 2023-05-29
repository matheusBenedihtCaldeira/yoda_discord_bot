const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OpenAIApi } = require('openai');
const configAi = require('../config/openAi');
const openAi = new OpenAIApi(configAi);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask anything to Master Yoda, and with all his wisdom, he will respond to you.')
		.addStringOption(options => options.setName('question').setDescription('Question sent to Master Yoda').setRequired(true)),
	async execute(interaction) {
		const { options } = interaction;
		const question = options.getString('question');
		const yodaResponse = async (questionForYoda) => {
			const prompt = `Responda a seguinte pergunta como se fosse o mestre Yoda falando: ${questionForYoda}`;

			try {
				const completion = await openAi.createCompletion({
					model: 'text-davinci-003',
					prompt: prompt,
					max_tokens: 2048,
				});
				return completion.data.choices[0].text.trim();
			}
			catch (error) {
				console.log(error);
			}
		};
		const resposta = await yodaResponse(question);
		console.log(resposta);

		const embed = new EmbedBuilder()

			.setColor(0x9fad07)
			.setTitle('Mensagem enviada')
			.setDescription(resposta);
		await interaction.reply({ embeds: [embed], send: true });
	},
};
