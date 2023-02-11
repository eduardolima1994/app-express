"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const itensRepository = {
    criar: (item, callback) => {
        const sql = `INSERT INTO produtos (nome, descricao, preco) VALUES ($1, $2, $3)`;
        const params = [item.nome, item.descricao, item.preco];
        database_1.default
            .query(sql, params)
            .then(() => {
            console.log("Data created successfully!");
            callback();
        })
            .catch((err) => callback(err))
            .then(() => {
            console.log("Finished execution, exiting now");
        });
    },
    lerTodos: (callback) => {
        const sql = "SELECT * FROM produtos";
        const params = [];
        database_1.default
            .query(sql, params)
            .then((res) => {
            callback(res.rows);
        })
            .catch((err) => {
            console.error(err);
            throw err;
        });
    },
    ler: (id, callback) => {
        const sql = "SELECT * FROM produtos WHERE id = $1";
        const params = [id];
        database_1.default
            .query(sql, params)
            .then((res) => {
            callback(res.rows[0]);
        })
            .catch((err) => {
            console.error(err);
            throw err;
        });
    },
    atualizar: (id, item, callback) => {
        const sql = "UPDATE produtos SET nome = $1, descricao = $2, preco = $3 WHERE id = $4";
        const params = [item.nome, item.descricao, item.preco, id];
        database_1.default
            .query(sql, params)
            .then((res) => {
            callback(res.rowCount === 0);
        })
            .catch((err) => {
            console.error(err);
            throw err;
        });
    },
    apagar: (id, callback) => {
        const sql = "DELETE FROM produtos WHERE id = $1";
        const params = [id];
        database_1.default
            .query(sql, params)
            .then((res) => {
            callback(res.rowCount === 0);
        })
            .catch((err) => {
            console.error(err);
            throw err;
        });
    },
};
exports.default = itensRepository;
