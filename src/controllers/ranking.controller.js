import { db } from "../database/db.js";

export async function getRanking(req, res){
    try {
        const ranking = await db.query(`SELECT
        users.id,
        users.name,
        COALESCE(COUNT(shortly.url), 0) AS "linksCount",
        COALESCE(CAST(SUM(shortly.visitCount) AS INTEGER), 0) AS "visitCount"
        FROM users
        LEFT JOIN shortly ON users.id = shortly.userId
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10;` )
        res.status(200).send(ranking.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }   
} 