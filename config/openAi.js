const { Configuration } = require('openai');
require('dotenv').config();

const configAi = new Configuration({
	apiKey: process.env.OPENAIAPIKEY,
	organization: process.env.OPENAI_ORGANIZATION,
});

module.exports = configAi;
