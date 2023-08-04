import { db } from "../database/db.js"

export async function tokenValidation(req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    
    if (!token) return res.sendStatus(401)

    try {
        const session = await db.query(`SELECT * FROM tokens WHERE token = $1`, [token])
        if(session.rows.length === 0) return res.sendStatus(401)
        
        next()
    } catch (err) {
        return res.status(404).send(err.message);
    }
  
  }

  