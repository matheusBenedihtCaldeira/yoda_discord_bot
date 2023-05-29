const { yodaResponse } = require('./yoda');

(async () => {
	const pergunta = 'O que é uma estrela?';
	const resposta = await yodaResponse(pergunta);
	console.log(resposta);
})();
