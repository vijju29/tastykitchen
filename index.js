const express = require("express");
const app = express();
const path = require("path");
const dbPath = path.join(__dirname,"tastykitchen.db");
const sqlite3 = require("sqlite3");
const {open} = require("sqlite");
const cors = require("cors")
app.use(cors())

let db = null

const restaurant = require("./restaurantDetails.json")
const offers = restaurant.offers

const initailizeDbAndServer = async ()=>{
    try{
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database,
        })
        app.listen(4000,()=>{
            console.log("server running at https://localhost:4000/")
        })
    }
    catch(err){
        console.log(`DB Error:${err.message}`)
        process.exit(1)
    }
}

initailizeDbAndServer();




app.get("/offers",async (req,res) => {
    const getQuery = `SELECT * FROM offers;`
    const data = await db.all(getQuery)
    res.send(data)
})