const express = require("express");
const router = express.Router();

const Mascota = require("../models/mascota.js");

//Función para recuperar todos los datos de BBDD mediante GET
router.get('/', async (req,res)=>{

try {
    const arrayMascotasDB = await Mascota.find()
    res.render("mascotas",{
        arrayMascotas:arrayMascotasDB
    })

} catch (error) {
    console.log(error)
}

})

router.get('/crear', async (req,res)=>{
    res.render("crear")
})


//Función para guardar mediante POST
router.post("/", async(req,res)=>{
    const body = req.body
    try {
        await Mascota.create(body)

        res.redirect("/mascotas")
        
    } catch (error) {
        console.log(error)
    }
})


//Función para buscar mediante GET un solo documento de Mongo
router.get("/:id",async (req,res)=>{
    const id = req.params.id
    
    try {
        const mascotaDB = await Mascota.findOne({_id: id})

        res.render("detalle", {
            mascota: mascotaDB,
            error:false
        })

    } catch (error) {
        console.log(error)
        res.render("detalle", {
            error:true,
            mensaje:"No se encuentra el id buscado"
        })
    }
})

//Función para eliminar un documento mediante DELETE en Mongo
router.delete("/:id", async(req,res)=>{
    const id= req.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id:id})
       if(mascotaDB){
        res.json({
            estado:true,
            mensaje:"Eliminado"
        })

       }else{
        res.json({
            estado:false,
            mensaje:"No se puede eliminar el id"
        })
    }
    } catch (error) {
        console.log(error)
    }
})

//Función para buscar actualizar un documento en MONGO mediante PUT
router.put("/:id", async(req,res)=>{
    const id= req.params.id
    const body =req.body
    try {

        const mascotaDB = await Mascota.findByIdAndUpdate(id,body, {useFindAndModify:false})
        console.log(mascotaDB)

        res.json({
            estado:true,
            mensaje:"Editado"
        })
        
    } catch (error) {
        console.log(error)

        res.json({
            estado:false,
            mensaje:"Error al editar"
        })
    }
})




module.exports = router;