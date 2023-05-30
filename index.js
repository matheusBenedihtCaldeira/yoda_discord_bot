// Require dotenv to get the keys
require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Get the command file paths
const fs = require('fs');
const path = require('path');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Store the commands in a collection
client.commands = new Collection;

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`Comando ${filePath} não possui "data" ou "execute"`);
	}
}

// Create a new client instance

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

// Configure the interactions
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error('Couldn\'t find command');
		return;
	}
	try {
		await command.execute(interaction);
	}
	catch (err) {
		console.error(err);
		await interaction.reply('A error occurred');
	}
});

client.on('guildMemberAdd', (member) => {
	const canal_logs = '1068352926713651220';
	const embed = new EmbedBuilder()
		.setColor(0x9fad07)
		.setTitle('Boas-vindas')
		.setDescription(`Ah, bem-vindo você é! Hmmm, alegria em meu coração eu sinto ao recebê-lo. Sim, sim! Pela Força guiado, aqui você é jovem padawan. Boas-vindas ${member}, eu dou a você!`);
	member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` });
});
