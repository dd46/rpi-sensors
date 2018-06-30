import program from "commander";
import colors from "colors";
import startServer from "./libs/server"
import five from "johnny-five";

program.option("-p, --pin <pin>", "Pin number")
    .option("-wp, --webport <webport>", "web server port number")
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp(make_red);
}

function make_red(txt) {
    return colors.red(txt); //display the help text in red on the console
}

let pin = program.pin;
let port = program.webport;
let board = new five.Board();

board.on("ready", function () {
    let lastMotionStatus = "";
    let updateFunction = startServer(port);
    let motion = new five.IR.Motion(pin);
    motion.on("calibrated", function () {
        lastMotionStatus = "calibrated";
        updateFunction({motion: lastMotionStatus})
    });
    motion.on("motionstart", function () {
        updateFunction({motion: lastMotionStatus})
    });
    motion.on("motionend", function () {
        updateFunction({motion: lastMotionStatus})
    });
});
