"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const DBSOURCE = process.env.DB_CONNECTION;
const SQL_ITENS_CREATE = `CREATE TABLE IF NOT EXISTS produtos ( id UUID DEFAULT gen_random_uuid(), nome TEXT, descricao TEXT, preco TEXT, PRIMARY KEY (id));`;
const client = new pg_1.Client({
    connectionString: DBSOURCE,
});
client
    .connect()
    .then(() => {
    console.log("Successfully connected to the database");
    client
        .query(SQL_ITENS_CREATE)
        .then(() => {
        console.log("Table products created successfully");
    })
        .catch((err) => {
        console.error(err);
        throw err;
    });
})
    .catch((err) => {
    console.error(err);
    throw err;
});
exports.default = client;
