import Item from "../models/item";
import client from "./database";
const itensRepository = {
  criar: (item: Item, callback: (id?: string) => void) => {
    const sql = `INSERT INTO produtos (nome, descricao, preco) VALUES ($1, $2, $3)`;
    const params = [item.nome, item.descricao, item.preco];
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
    const sql = "SELECT * FROM produtos";
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
  ler: (id: string, callback: (item?: Item) => void) => {
    const sql = "SELECT * FROM produtos WHERE id = $1";
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
    id: string,
    item: Item,
    callback: (notFound: boolean) => void
  ) => {
    const sql = "UPDATE produtos SET nome = $1, descricao = $2, preco = $3 WHERE id = $4";
    const params = [item.nome, item.descricao, item.preco, id];
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
  apagar: (id: string, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM produtos WHERE id = $1";
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
