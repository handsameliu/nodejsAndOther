var express = require('express');
var uuid = require('uuid');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();
app.use(cookieParser());
var SESSION_KEY= 'connect.sid';
app.get('/',function(req,res){
    var cookies = req.cookies;
    var sessionId = cookies[SESSION_KEY];
    if(sessionId){
        var sessions = getSessions();
        var sessionObj = sessions[sessionId];
        if(sessionObj){
            sessionObj.balance-=10;
            setSessions(sessions);
            res.send('欢迎再次光临，您的余额为'+sessionObj.balance+'元');
        }else{
            genId();
        }
    }else{
        genId();
    }
    function getSessions(){
        var sessions = {};
        var exists = fs.existsSync('./sessions.json');
        if(exists){
            var content = fs.readFileSync('./sessions.json');
            if(content){
                sessions = JSON.parse(content);
            }
        }
        return sessions;
    }
    function setSessions(sessions){
        fs.writeFile("./sessions.json",JSON.stringify(sessions),'utf8');
    }
    function genId(){
        var sessionId = uuid.v4();
        var sessions=getSessions();
        sessions[sessionId]={balance:100};
        setSessions(sessions);
        res.cookie(SESSION_KEY,sessionId);
        res.send('欢迎光临，您的余额为100元');
    }
});
app.listen(9090);




