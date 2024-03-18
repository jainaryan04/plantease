import express from "express"
import bodyParser from "body-parser"

import path from "path"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>
{
  res.sendFile(path.join(__dirname+'/views/index.html'));
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });