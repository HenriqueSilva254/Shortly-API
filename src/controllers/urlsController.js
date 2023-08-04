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


export async function getUrl(req, res){
  const {id} = req.params

  try {
    const getUrl = await db.query(`SELECT url, shortUrl, userId FROM shortly WHERE id=$1`, [id])
    if(getUrl.rows.length === 0) res.sendStatus(401)
    res .status(200).send({
      url: getUrl.rows[0].url,
      shorturl: getUrl.rows[0].shorturl,
      userid: getUrl.rows[0].userid
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getUrl(req, res){
  const {id} = req.params

  try {
    const getUrl = await db.query(`SELECT url, shortUrl, userId FROM shortly WHERE id=$1`, [id])
    if(getUrl.rows.length === 0) res.sendStatus(401)
    res .status(200).send({
      url: getUrl.rows[0].url,
      shorturl: getUrl.rows[0].shorturl,
      userid: getUrl.rows[0].userid
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}