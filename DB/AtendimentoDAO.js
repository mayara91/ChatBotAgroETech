import Atendimento from "../Model/Atendimento.js";
import atendimento from "../Model/Atendimento.js";
import conectar from "./Conexao.js";

export default class AtendimentoDAO {

    constructor(){
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS atendimento(
                    protocolo integer primary key AUTOINCREMENT,
                    nome varchar(100) not null,
                    produto varchar(100) not null,
                    data varchar(10) not null
                )
            `;
            await conexao.exec(sql);
        }
        catch (erro) {
            console.error(erro)
        }
    }
    async gravar(atendimento) {
        if (atendimento instanceof Atendimento) {
            const conexao = await conectar();
            //inserir o atendimento na tabela
            const sqlAtendimento = "INSERT INTO atendimento(nome, produto, data) VALUES(?, ?, ?)";
            const data = new Date();
            atendimento.data = data;
            let parametros = [atendimento.nome, atendimento.produto, atendimento.data.toLocaleDateString()];
            const resultado = await conexao.run(sqlAtendimento, parametros);
            atendimento.protocolo = resultado.lastID;
        }

    }
}