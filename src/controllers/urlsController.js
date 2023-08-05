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
    if(getUrl.rows.length === 0) res.sendStatus(404)
    res .status(200).send({
      url: getUrl.rows[0].url,
      shorturl: getUrl.rows[0].shorturl,
      userid: getUrl.rows[0].userid
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getShortly(req, res){
  const {shortUrl} = req.params

  try {
    const getUrl = await db.query(`SELECT url FROM shortly WHERE shortUrl = $1`, [shortUrl]);
    if(getUrl.rows.length === 0) return res.sendStatus(404)
    const url= getUrl.rows[0].url

    const upVisit = await db.query(`UPDATE shortly SET visitCount=visitCount+1 WHERE shortUrl = $1`, [shortUrl])

    res.redirect(url)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deleteUrl(req, res){
  const {id} = req.params
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const tokenQuery = await db.query(
      `SELECT userId FROM tokens WHERE token = $1`,
      [token]
    );
    const userId = tokenQuery.rows[0].userId;

    const dell = await db.query(`DELETE FROM shortly WHERE id = $1 AND userId = $2`, [id, userId]);
    if(dell.rowCount === 0) return res.sendStatus(404);

    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getUserME(req, res){
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const tokenQuery = await db.query(
      `SELECT userId FROM tokens WHERE token = $1`,
      [token]
    );
    
    const userId = tokenQuery.rows[0].userid;
    console.log(userId)
    const getUser = await db.query(`SELECT users.id, users.name, SUM(shortly.visitCount) as "visitCount", json_agg(shortly.*) as "shortenedUrls"
    FROM users
    JOIN shortly ON users.id = shortly.userId
    WHERE users.id= $1
    GROUP BY users.id, users.name;`, [userId]);
    
    res.status(200).send(getUser.rows[0])
  } catch (err) {
    res.status(500).send(err.message)
  }
}



