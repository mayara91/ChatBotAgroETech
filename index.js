import express from 'express';
import rotaServico from './Routes/rotaServico.js';
import dotenv from 'dotenv';

//carrega as variáveis de ambiente
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/servico",rotaServico);


const host = "localhost";
const porta = "3000";

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
});