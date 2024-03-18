import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
import path from "path"
import axios from "axios"
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_URL="https://perenual.com/api/species-list"
const API_KEY="sk-ipX865f8885b4bec24783"
const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"plantease",
  password:"aryan5567",
  port:5432
});
db.connect();

app.get("/",(req,res)=>
{
  res.render("index.ejs")
})


app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});


app.post("/register", async(req,res)=> {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.render("login.ejs",{msg:"Email aldready exists. Try logging in"});
    } else {
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      console.log(result);
      res.render("index.ejs",{email:email});
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("index.ejs",{email:email});
      } else {
        res.render("login.ejs",{msg:"Incorrect Password. Try again"});
      }
    } else {
      res.render("login.ejs",{msg:"User not found"});
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/garden",(req,res)=>
{
  res.render("garden.ejs")
})
app.get("/care",(req,res)=>
{
  res.render("care.ejs")
})

var src=""

app.post("/search",async(req,res)=> 
{
  src=req.body["t"];
  console.log(src)
  try {
    console.log(API_URL+"?key="+API_KEY+"&q="+src)
    const result = await axios.get(API_URL,{
        params: {
          key:API_KEY,
          q:src,
        },
      });
    console.log(result)
    res.render("search.ejs", { content: JSON.stringify(result.data) });
    console.log(JSON.stringify(result.data))
  } catch (error) {
    res.render("search.ejs", { content: JSON.stringify(error.response.data) });
  }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });