import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));

var plant=[]


app.get("/",(req,res)=>
{
  res.render("home.ejs");
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