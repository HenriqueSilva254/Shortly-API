import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/db.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.status(422).send("senhas nao conferem");

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (user.rows.length > 0) return res.sendStatus(409);

    const insertUser = await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    );
    res.sendStatus(201);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (user.rows.length === 0) return res.status(401).send("usuario não existe");

    if (user && bcrypt.compareSync(password, user.rows[0].password)) {
      const token = uuid();
      const userId = user.rows[0].id;

      // Verificar e Atualizar token

      const existingToken = await db.query(
        `SELECT * FROM tokens WHERE userId = $1`,
        [userId]
      );

      if (existingToken.rows.length > 0) {
        // Atualiza o token existente
        await db.query(`UPDATE tokens SET token = $1 WHERE userId = $2`, [
          token,
          userId,
        ]);
      } else {
        // Insere um novo token
        await db.query(
          `INSERT INTO tokens (token, userId) VALUES ($1, $2)`,
          [token, userId]
        );
      } res.status(200).send({ token });
    } else return res.status(401).send("senha incorreta");
  } catch (err) {
    return res.status(404).send(err.message);
  }
}
