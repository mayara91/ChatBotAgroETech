import Servico from "../Model/Servico.js";

export default class ServicoCtrl {
    //traduzir comandos http em ações negociais
    //Conceito REST 
    //Considerar o protocolo HTTP 

    gravar(requisicao, resposta) {
        if (requisicao.method == "POST" &&
            requisicao.is("application/json")) {
            const dados = requisicao.body;
            //pseudo validação
            if (dados.nome && dados.descricao && dados.valor >= 0 &&
                dados.urlImagem && dados.tempoInicioAtendimento > 0 &&
                dados.tempoSolucao > 0) {
                const servico = new Servico(0, dados.nome, dados.descricao,
                    dados.valor, dados.urlImagem,
                    dados.tempoInicioAtendimento,
                    dados.tempoSolucao);

                servico.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Serviço gravado com sucesso!",
                        "id": servico.id
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o serviço: " + erro.message,
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os dados necessários conforme documentação!"
                });
            }

        }
        else {
            resposta.status(405).json({
                "status": false,
                "mensagem": "Formato não permitido!"
            });
        }
    }


    alterar(requisicao, resposta) {
        if ((requisicao.method == "PUT" || requisicao.method == "PATCH")
            && requisicao.is("application/json")) {
            const dados = requisicao.body;
            //pseudo validação
            if (dados.id > 0 && dados.nome && dados.descricao && dados.valor >= 0 &&
                dados.urlImagem && dados.tempoInicioAtendimento > 0 &&
                dados.tempoSolucao > 0) {
                const servico = new Servico(dados.id, dados.nome, dados.descricao,
                    dados.valor, dados.urlImagem,
                    dados.tempoInicioAtendimento,
                    dados.tempoSolucao);

                servico.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Serviço alterado com sucesso!",
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar o serviço: " + erro.message,
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os dados necessários conforme documentação!"
                });
            }
        }
        else {
            resposta.status(405).json({
                "status": false,
                "mensagem": "Formato não permitido!"
            });
        }
    }

    excluir(requisicao, resposta) {
        if (requisicao.method == "DELETE" && requisicao.is("application/json")) {
            const id = requisicao.params.id; //o id deve ser informado na url
            //pseudo validação
            if (id > 0) {
                const servico = new Servico(id);

                servico.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Serviço excluído com sucesso!",
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o serviço: " + erro.message,
                    });
                })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe o id na url!"
                });
            }
        }
        else {
            resposta.status(405).json({
                "status": false,
                "mensagem": "Formato não permitido!"
            });
        }
    }

    consultar(requisicao, resposta) {
        const termoBusca = requisicao.params.servico;
        if (requisicao.method == "GET") {
            const servico = new Servico(0);
            servico.consultar(termoBusca).then((listaServicos) => {
                resposta.status(200).json({
                    "status": true,
                    "listaServicos": listaServicos
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível recuperar os serviços: " + erro.message,
                });
            })
        }
        else {
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido!"
            });
        }
    }
}