const express = require("express");

const app = express();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jasonma20060626@gmail.com',
        pass: 'Mazhiliang06'
    }
});



var ticketNum = 0;




var participants = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var voters = {};

app.get("/", function (req, res) {
    //console.log(req.query);
    var pid = req.query.id;
    if (pid < 1 || pid > 14) {
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

app.get("/ticket", function (req, res) {
    // console.log(req.query.email);

    var mailOptions = {
        from: 'jasonma20060626@gmail.com',
        to: req.query.email + ', jasonma20060626@gmail.com',
        subject: 'Impact Initiative 50/50 Ticket',
        text: 'Your 50/50 Ticket is: ' + ticketNum++
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send('ok');
});

app.listen(9000, function () {
    console.log("server listening on port 9000!")
});