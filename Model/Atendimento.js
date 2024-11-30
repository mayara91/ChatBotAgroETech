import AtendimentoDAO from "../DB/AtendimentoDAO.js";

export default class Atendimento{
    #protocolo;
    #nome;
    #produto;
    #data;
    #funcoes;

    constructor(protocolo=0, nome, produto, data, funcoes = []) {
        this.#protocolo = protocolo;
        this.#nome = nome;
        this.#produto = produto;
        this.#data = data;
        this.#funcoes = funcoes;
    }

    // Getters
    get protocolo() {
        return this.#protocolo;
    }

    get nome() {
        return this.#nome;
    }
    get produto() {
        return this.#produto;
    }

    get data() {
        return this.#data;
    }

    get funcoes() {
        return this.#funcoes;
    }

    // Setters
    set protocolo(protocolo) {
        this.#protocolo = protocolo;
    }
    
    set nome(nome) {
        this.#nome = nome;
    }

    set produto(produto) {
        this.#produto = produto;
    }

    set data(data) {
        this.#data = data;
    }
    set funcoes(funcoes) {
        this.#funcoes = funcoes;
    }

    // Método toJSON
    toJSON() {
        return {
            protocolo: this.#protocolo,
            nome: this.#nome,
            produto: this.#produto,
            data: this.#data,
            funcoes: this.#funcoes,
        };
    }

    async gravar(){
        const atenDAO = new AtendimentoDAO();
        await atenDAO.gravar(this);
    }
}