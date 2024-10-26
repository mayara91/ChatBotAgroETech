import { obterCardsServicos } from "../DialogFlow/funcoes.js";

export default class DFController {

    processarIntencoes(req, resp) {
        if (req.method == "POST" && req.is("application/json")) {
            const dados = req.body;
            const intencao = dados.queryResult.intent.displayName;
            //identificar a origem da requisição (custom ou messenger)
            //verificar a existência do atributo source
            const origem =  dados?.originalDetectIntentRequest?.source;
            switch (intencao) {
                case 'Default Welcome Intent':
                    const resposta = exibirMenu(tipo=origem);
                    resp.json(resposta);
                    break;
            }
        }

    } //fim processar intenções

    exibirMenu(tipo = 'custom') {
        let resposta = {
            "fulfillmentMessages": []
        };

        try {
            let cards = obterCardsServicos(tipo);

            if (tipo == custom) {
                resposta['fulfillmentMessages'].push({
                    "text": {
                        "text": ["Seja bem-vindo ao suporte de TI.\n",
                            "Estamos disponíveis 24h por dia e 7 dias na semana.\n",
                            "Estamos preparados para te ajudar com os seguintes serviços:\n"
                        ]
                    }
                });
                resposta['fulfillmentMessages'].push(...cards);
                resposta['fulfillmentMessages'].push({
                    "text": {
                        "text": ["Por favor nos informe o que você deseja."]
                    }
                });
                return resposta;
            }
            else {
                //formato de resposta para o ambiente messenger

                resposta.fulfillmentMessages.push({
                    "payload": {
                        "richContent": [[{
                            "type": "description",
                            "title": "Seja bem-vindo ao suporte de TI.\n",
                            "text": [
                                "Estamos disponíveis 24h por dia e 7 dias na semana.\n",
                                "Estamos preparados para te ajudar com os seguintes serviços:\n"
                            ]
                        }]]
                    }
                });
                //adicionando os cards de serviços
                resposta['fulfillmentMessages'][0]['payload']['richContent'][0].push(...cards);

                resposta['fulfillmentMessages'][0]['payload']['richContent'][0].push({
                    "type": "description",
                    "title": "Por favor nos informe o que você deseja.",
                    "text": []
                });
                return resposta;
            }
        }
        catch(erro){
            if (tipo == custom){
                resposta['fulfillmentMessages'].push({
                    "text": {
                        "text": ["Não foi possível recuperar a lista de suporte dos serviços disponíveis.",
                                 "Descupe-nos pelo transtorno!",
                                 "Entre em contato conosco por telefone (18) 3226-1515."
                        ]
                    }
                });
            }
            else{ //formato de mensagem para messenger
                resposta.fulfillmentMessages.push({
                    "payload": {
                        "richContent": [[{
                            "type": "description",
                            "title": "Não foi possível recuperar a lista de suporte dos serviços disponíveis.\n",
                            "text": [
                                "Descupe-nos pelo transtorno!\n",
                                "Entre em contato conosco por telefone (18) 3226-1515.\n"
                            ]
                        }]]
                    }
                });
            }//fim else
            return resposta;
        }

    }

}