
/*

criar o arquivo .env na raiz do projeto com o seguinte conteúdo:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=chatbot

*/
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Connect to SQLite instead of MySQL

export default async function conectar() {
    if (global.dbConnection) {
        return global.dbConnection;
    } else {
        // Open a connection to SQLite database
        const db = await open({
            filename: process.env.DB_DATABASE || './database.sqlite', // Specify the path to the SQLite file
            driver: sqlite3.Database,
        });

        global.dbConnection = db;
        return global.dbConnection;
    }
}