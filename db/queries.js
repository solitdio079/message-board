import {pool} from "./pool.js"

async function getAllMessages(){
    const {rows} =  await pool.query("SELECT * FROM messages")
    return rows
}
async function getOneMessage(id){
    const {rows} =  await pool.query(`SELECT * FROM messages WHERE id=$1`,[id])
    return rows[0]
}

async function insertMessage(user,text,added){
   await pool.query(`INSERT INTO messages (username,message_text,added) VALUES ($1,$2,$3)`,[user,text,added])
}

async function searchMessage(q){
    const {rows} = await pool.query(`SELECT * FROM messages WHERE username LIKE $1`,[`%${q}%`])
    return rows
}

async function deleteAll(){
    await pool.query(`DELETE FROM messages`)
}
export default {
    getAllMessages,
    getOneMessage,
    insertMessage,
    searchMessage,
    deleteAll
}