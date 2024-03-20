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

var email
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
  email = req.body.email;
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
var c=[]
app.get("/cart",(req,res)=>{
  const q1=count(1)
  const q2=count(2)
  const q3=count(3)
  const q4=count(4)
  const q5=count(5)
  const q6=count(6)
  const q7=count(7)
  const q8=count(8)
  const q9=count(9)
  const q10=count(10)
  const q11=count(11)
  res.render("cartemp.ejs",{q1:q1,q2:q2,q3:q3,q4:q4,q5:q5,q6:q6,q7:q7,q8:q8,q9:q9,q10:q10,q11:q11})
  
})


function count(a)
{
  var k=0;
  for(var i=0;i<c.length;i++)
  {
    if(a===c[i])
    k++;
  }
  return k;
}



app.post("/addp1",()=>{
  c.push(1);
  console.log(c)
})
app.get("/addp2",()=>{
  c.push(2);
  console.log(c)
})
app.get("/addp3",()=>{
  c.push(3);
  console.log(c)
})
app.get("/addp4",()=>{
  c.push(4);
})
app.get("/addp5",()=>{
  c.push(5);
})
app.get("/addp6",()=>{
  c.push(6);
})
app.get("/addp7",()=>{
  c.push(7);
})
app.get("/addp8",()=>{
  c.push(8);
})
app.get("/addp9",()=>{
  c.push(9);
})
app.get("/addp10",()=>{
  c.push(10);
})
app.get("/addp11",()=>{
  c.push(11);
})
app.get("/garden",(req,res)=>
{
  res.render("garden.ejs")
})
app.get("/care",(req,res)=>
{
  res.render("care.ejs")
})
app.get("/shop",(req,res)=>
{
  res.render("shop.ejs")
})

var src=""
let name="";
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
    
    res.render("search.ejs", { content: JSON.stringify(result.data) });
    
  } catch (error) {
    res.render("search.ejs", { content: JSON.stringify(error.response.data) });
  }
})

app.get("/prod1",(req,res)=>{
  res.render("prod1.ejs")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

