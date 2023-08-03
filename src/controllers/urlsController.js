import { db } from "../database/db.js";

export async function postUrl(){
    const {url} = req.body

    try {
        const url = db.query(`SELECT * FROM shortly WHERE url= $1`, [url])
        if(url.rows.length)
    } catch (err) {
        
    }
}