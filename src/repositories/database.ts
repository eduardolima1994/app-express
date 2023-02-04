import { Client } from "pg";
const DBSOURCE = "postgres://postgres:mypassword@localhost:5432/postgres";
const SQL_ITENS_CREATE = `CREATE TABLE IF NOT EXISTS itens ( id SERIAL PRIMARY KEY, nome TEXT, descricao TEXT )`;
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
        console.log("Table itens created successfully");
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
