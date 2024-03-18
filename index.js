import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
import path from "path"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

app.get("/cart",(req,res)=>
{
  res.render("cart.ejs");
})

app.get("/care",(req,res)=>
{
  res.render("care.ejs");
})

app.get("/acc",(req,res)=> //account
{
  res.render("acc.ejs"); 
})

app.post("/search",(req,res)=> 
{
  let src=req.body["t"]
  console.log(src)
  for(var i=0;i<plant.length;i++)
  {
    if(plant[i]==src)
    break;
  }
  res.render("search.ejs",{t:`./images/${1}.jpg`});

    
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
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      console.log(result);
      res.render("");
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
        res.render("");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });