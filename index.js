const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send().json({
        "resposta": "Seja Bem vindo ao NodeJS"
    })
})

app.listen(port, ()=>{
    console.log("Servidor Rodando!");
});
console.log("Holla Mundo!!");