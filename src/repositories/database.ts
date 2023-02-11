import { Client } from "pg";
import * as dotenv from 'dotenv' 
dotenv.config()
const DBSOURCE = process.env.DB_CONNECTION;
const SQL_ITENS_CREATE = `CREATE TABLE IF NOT EXISTS produtos ( id UUID DEFAULT gen_random_uuid(), nome TEXT, descricao TEXT, preco TEXT, PRIMARY KEY (id));`;

const client = new Client({
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
export default client;
