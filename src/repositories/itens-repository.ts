import Item from "../models/item";
import client from "./database";
const itensRepository = {
  criar: (item: Item, callback: (id?: number) => void) => {
    const sql = `INSERT INTO itens (nome, descricao) VALUES ($1, $2)`;
    const params = [item.nome, item.descricao];
    client
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
  lerTodos: (callback: (itens: Item[]) => void) => {
    const sql = "SELECT * FROM itens";
    const params: any[] = [];
    client
      .query(sql, params)
      .then((res) => {
        callback(res.rows);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  },
  ler: (id: number, callback: (item?: Item) => void) => {
    const sql = "SELECT * FROM itens WHERE id = $1";
    const params = [id];
    client
      .query(sql, params)
      .then((res) => {
        callback(res.rows[0]);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  },
  atualizar: (
    id: number,
    item: Item,
    callback: (notFound: boolean) => void
  ) => {
    const sql = "UPDATE itens SET nome = $1, descricao = $2 WHERE id = $3";
    const params = [item.nome, item.descricao, id];
    client
      .query(sql, params)
      .then((res) => {
        callback(res.rowCount === 0);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  },
  apagar: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM itens WHERE id = $1";
    const params = [id];
    client
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
export default itensRepository;
