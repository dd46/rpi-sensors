var program = require('commander');
var colors = require('colors');
const express = require('express');

program
    .option('-p, --pin <pin>', 'Pin number')
    .option('-wp, --webport <webport>', 'web server port number')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp(make_red);
}


function make_red(txt) {
    return colors.red(txt); //display the help text in red on the console
}

var pin = program.pin;
var port = program.webport;
var lastMotionStatus = "";

const app = express();
app.get('/', function(req, res) { {lastMotionStatus: lastMotionStatus}});
app.listen(3000, function() { console.log('motion sensor listening on port '+ port +'!');})

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var motion = new five.IR.Motion(pin);
    motion.on("calibrated", function() { lastMotionStatus = "calibrated"; });
    motion.on("motionstart", function() { lastMotionStatus = "motionstart"});
    motion.on("motionend", function() { lastMotionStatus = "motionend"});
});
