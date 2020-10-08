const express= require('express');
const {dbConnection} =require('./database/config')
//busca el archivo .env
require('dotenv').config();


const app=express();
//Conexion a la base de datos
dbConnection();
//Carpeta de entrada
app.use(express.static('public'))
//Buscar en body
app.use(express.json());
//Routes
app.use('/api/auth',require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log(`Escuchando Puerto ${process.env.PORT}`)
})