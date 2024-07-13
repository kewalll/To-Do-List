import express from "express";
import bodyparser from "body-parser";
import pg from "pg";
import { Console } from "console";

const app = express();
const port = 3000;

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"toDoList",
    password:"kewal2105",
    port:5432,
});
db.connect();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

let list = [];

app.get("/", async (req,res) => {
    try{
        const result = await db.query("select * from list order by id asc");
        list = result.rows;
        res.render("todo.ejs",{
            listItems: list,
        });
    } catch(err){
        console.log(err);
    }    
});

app.post("/add", async (req,res) => {
    const task = req.body.newItem;
    try{
        await db.query("insert into list (task) values ($1)",[task]);
        res.redirect("/");
    } catch(err){
        console.log(err);
    }
});

app.post("/edit", async (req,res) => {
    const item = req.body.updateItemTitle;
    const id = req.body.updateItemId;
    try{
        await db.query("update list set task = $1 where id = $2",[item,id]);
        res.redirect("/");
    } catch(err){
        console.log(err);
    }
});

app.post("/delete", async (req,res) => {
    const id = req.body.deleteItem;
    try{
        await db.query("delete from list where id = $1",[id]);
        res.redirect("/");
    } catch(err){
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});