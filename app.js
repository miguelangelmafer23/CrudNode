/*
Creación de Server con Node puro

const http = require('http');
const server=http.createServer((req,res)=>{
  res.end('Estoy respondiendo a tu solicitud')
})

const port = 3000;
server.listen(port,()=>{
  console.log('Escuchando solicitudes')
})

*/


// Creación de Server con Express

const express = require('express');
const bodyParser = require("body-parser")
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


require('dotenv').config()

const port= process.env.PORT || 3000;

//Conexión a Base de datos
const mongoose = require('mongoose');


const uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.a3drz0y.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
  {useNewUrlParser:true,useUnifiedTopology:true})
.then(() =>console.log("Base de datos conectada"))
.catch(e => console.log(e))

//Motor de plantillas a utilizar
app.set("view engine","ejs")
//Ubicación de las plantillas
app.set("views",__dirname + "/views")

app.use(express.static(__dirname + "/public"))

//Rutas Web o de la API
app.use("/",require("./router/RutasWeb"))
app.use("/mascotas",require("./router/Mascotas.js"))


app.use((req,res)=>{
  res.status(404).render("404.ejs",{titulo:"Mi titulo 404"})
})

app.listen(port,()=>{
  console.log('Servidor a su servicio en el puerto', port);
})


/*//Configuramos lás páginas estáticas en nuestra carpeta public, el orden de esta línea es importante Middleware (use)
app.use(express.static(__dirname + "/public"))

//Endpoint,URL's
app.get('/',(req,res)=>{
  res.send("Mi respuesta desde express")
})

app.get("/servicios",(req,res)=>{
  res.send("Estás en la página de servicios")
})

app.use((req,res,next)=>{
  res.status(404).sendFile(__dirname + "/public/404.html")
})

app.listen(port,()=>{
  console.log('Servidor a su servicio en el puerto', port);
})*/