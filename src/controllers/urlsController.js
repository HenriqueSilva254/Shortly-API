import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const { url } = req.body;
  const { authorization } = req.headers;

  try {
    const token = authorization?.replace("Bearer ", "");
    const iduser = await db.query(`SELECT userid FROM tokens WHERE token= $1`, [
      token,
    ]);
    const userId = iduser.rows[0].userid;
    const shortUrl = nanoid(8);
    const postUrl = await db.query(
      `INSERT INTO shortly (url, shortUrl, userId) VALUES ($1, $2, $3)`,
      [url, shortUrl, userId]
    );
    const resShorty = await db.query(
      `SELECT id, shortUrl FROM shortly WHERE shortUrl= $1`,
      [shortUrl]
    );

    res.status(200).send({
      id: resShorty.rows[0].id,
      shortUrl: resShorty.rows[0].shorturl,
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
}
