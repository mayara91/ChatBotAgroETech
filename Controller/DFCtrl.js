import { obterCardsServicos } from "../DialogFlow/funcoes.js";
import Atendimento from "../Model/Atendimento.js";

export default class DFController {

    async processarIntencoes(req, resp) {
        if (req.method == "POST" && req.is("application/json")) {
            const dados = req.body;
            const intencao = dados.queryResult.intent.displayName;
            //identificar a origem da requisição (custom ou messenger)
            //verificar a existência do atributo source
            const origem = dados?.originalDetectIntentRequest?.source;
            let resposta;
           
            switch(intencao) {
                case 'Default Welcome Intent':
                    resposta = await this.gerarProtocoloAtendimento(origem, dados)
                    break
                case 'Entrada animais':
                    resposta = 'Entre no módulo que deseja cadastrar o animal. Na aba animal, clique em inserir e preencha todos os campos obrigatórios, depois clique em salvar. Para cadastrar um novo pasto, entre no módulo estoque de rebanho. Cliquei em pasto inserir um novo. Te ajudo em algo mais?';
                    break;
                case 'Financeiro':
                    resposta = 'Acesse o financeiro, entre em lançamentos, lançar despesa, preencha todos os campos obrigatórios e clique em salvar. Te ajudo em algo mais?';
                    break;
                case 'Financeiro saldo':
                    resposta = 'Clique em financeiro, relatórios, selecione a conta e cliquei em saldo. Te ajudo em algo mais?';
                    break;
                case 'Pasto':
                    resposta = 'Para cadastrar um novo pasto, entre no módulo estoque de rebanho. Cliquei em pasto inserir um novo. Te ajudo em algo mais?';
                    break;
                case 'Pesagem':
                    resposta = 'Entre no módulo curral, clique na aba pesagem, insira a identificação do animal e o peso. Após pesar todos os animais clique em salvar. Te ajudo em algo mais?';
                    break;
                case 'saldo dos animais por venda':
                    resposta = 'Acesse o módulo venda, clique em inserir nova vendar e preencha os campos obrigatórios Te ajudo em algo mais?';
                    break;
            }

            resp.json({
                fulfillmentText: resposta,
            });
        }


    } //fim processar intenções

    async gerarProtocoloAtendimento(origem, dados) {
        const nome = dados.queryResult.parameters['nome'].name
        const produto = dados.queryResult.parameters['produto']
        const atendimento = new Atendimento(0, nome, produto)
        await atendimento.gravar()

        this.obterSessao()[dados.session] = atendimento
        return  `Oie ${nome},\n`+
                "Aqui é a analista de suporte Mayumi.\n" +
                `Protocolo de atendimento: ${atendimento.protocolo}\n` +
                `Qual sua dúvida com o ${produto}?`
    }

    obterSessao() {
        if(!global.session) {
            global.session = []
        }
        return global.session
    }
}