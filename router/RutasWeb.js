const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("index.ejs",{titulo:"Mi titulo dinámico"})
  })
  
  router.get("/servicios",(req,res)=>{
    res.render("servicios.ejs",{titulo:"Mi titulo Servicios"})
  })


  module.exports = router;