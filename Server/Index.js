const express = require ("express");

const app = express ();

var participants = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var voters = {};

app.get("/", function (req, res) {
    //console.log(req.query);
    var pid = req.query.id;
    if (pid<1 || pid>12) {
        return;
    }

    participants[pid]++;
    console.log(participants);

    if (!voters[pid]) {
        voters[pid] = [];
    }
    voters[pid].push(req.query.email);
        
    
    console.log(voters);
    res.send("success");
});

app.listen(9000, function (){
    console.log("server listening on port 9000!")
});