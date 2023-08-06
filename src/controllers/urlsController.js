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

    res.status(201).send({
      id: resShorty.rows[0].id,
      shortUrl: resShorty.rows[0].shorturl,
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const getUrl = await db.query(
      `SELECT url, shortUrl, userId FROM shortly WHERE id=$1`,
      [id]
    );
    if (getUrl.rows.length === 0) res.sendStatus(404);
    res.status(200).send({
      id: getUrl.rows[0].userid,
      url: getUrl.rows[0].url,
      shortUrl: getUrl.rows[0].shorturl,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getShortly(req, res) {
  const { shortUrl } = req.params;

  try {
    const getUrl = await db.query(
      `SELECT url FROM shortly WHERE shortUrl = $1`,
      [shortUrl]
    );
    if (getUrl.rows.length === 0) return res.sendStatus(404);
    const url = getUrl.rows[0].url;

    const upVisit = await db.query(
      `UPDATE shortly SET visitCount=visitCount+1 WHERE shortUrl = $1`,
      [shortUrl]
    );

    res.redirect(url);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
  
    
    const checkuser =  await db.query(`SELECT userId FROM shortly WHERE id = $1`, [id])
    const checktoken =  await db.query(`SELECT userId FROM tokens WHERE token = $1`,[token]);

    if(checkuser.rows.length === 0) return res.sendStatus(404)
    if(checkuser.rows[0] !== checktoken.rows[0]) return res.sendStatus(401)
    console.log(checkuser.rows[0])
    console.log(checktoken.rows[0])
   

    const dell = await db.query(
      `DELETE FROM shortly WHERE id = $1`,
      [Number(id)]
    );

    

    if (dell.rowCount === 0) return res.sendStatus(404);
      
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUserME(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const tokenQuery = await db.query(
      `SELECT userId FROM tokens WHERE token = $1`,
      [token]
    );

    const userId = tokenQuery.rows[0].userid;
    console.log(userId);
    const getUser = await db.query(
      `SELECT users.id, users.name,
    CASE
        WHEN COUNT(shortly.id) > 0 THEN SUM(shortly.visitCount)
        ELSE 0
    END AS "visitCount",
    CASE
        WHEN COUNT(shortly.id) > 0 THEN 
        JSON_AGG(JSON_BUILD_OBJECT(
          'id', shortly.id,
          'shortUrl', shortly.shortUrl,
          'url', shortly.url,
          'visitCount', shortly.visitCount
        ) ORDER by shortly.visitCount DESC) 
        ELSE '[]'::json
    END AS "shortenedUrls"
    FROM users
    LEFT JOIN shortly ON users.id = shortly.userId
    WHERE users.id = $1
    GROUP BY users.id, users.name;`,
      [userId]
    );

    res.status(200).send(getUser.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
