const express = require("express");
const Agora = require("agora-access-token");
const body_parser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(body_parser.json());

app.get("/", (req, res)=>{
    res.send({
        "resposta": "Seja Bem vindo ao NodeJS"
    });
});



app.post("/rtctoken", (req, res)=>{
    const appId = process.env.APPID || "";
    const appCertificate = process.env.APPCERTIFICATE || "";
    const uid = Math.floor(Math.random() * 100000 );

    // Tempo de Expiração - 1 hora em segundos
    const expirationTimeSeconds = 3600;

    // Tempo actual
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    // Carimbo de tempo para expirar o token
    const privilegeExpiretedTs = expirationTimeSeconds + currentTimestamp;
    
    // Papel do Usuário - PUBLICADOR || SUBSCRITOR
    const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
    
    
    const channel = req.body.channel;
    if(channel == "" || channel == null){
        //res.send({"error":"not definied channel!"}); //json({"error":"the channel was not definied!"})
        throw("Error channel not definied!");
    }else if(appId == "" || appId == null){
        throw("Error appId not definied!");
    }else if(appCertificate == "" || appCertificate == null){
        throw("Error appCertificate not definied!");
    }

    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channel, uid, role, privilegeExpiretedTs);
    res.send({
        "uid":uid,
        "token":token});

});

app.listen(port, ()=>{
    console.log("Servidor Rodando!");
});
console.log("Holla Mundo!!");