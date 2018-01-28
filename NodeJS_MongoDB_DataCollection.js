

var MongoClient = require('mongodb').MongoClient; //include MongoClient library
var url = "";     


var SerialPort = require('serialport');			// include the serialport library
var	portName =  process.argv[2];					
 // include the webSocket library
 // list of connections to the server

var myPort = new SerialPort(portName, 9600);// open the port
var Readline = SerialPort.parsers.Readline;	// make instance of Readline parser
var parser = new Readline();	
							
myPort.pipe(parser);		// pipe the serial stream to the parser

//  definitions for the serial events:
myPort.on('open', showPortOpen);    // called when the serial port opens
myPort.on('close', showPortClose);  // called when the serial port closes
myPort.on('error', showError);   // called when there's an error with the serial port
parser.on('data', readSerialData);  // called when there's new data incoming

// ------------------------ Serial event functions:
// function is called when the serial port is opened:
function showPortOpen() {
  console.log('port open. Data rate: ' + myPort.baudRate);
}

// function is called when new data comes into the serial port:
function readSerialData(data) {

 // console.log(data.toString);
 var globalData=data.toString();

MongoClient.connect(url, function(err, db) {
if (err) throw err;
  //globalData=data.toString();
console.log(globalData);
var myobj = { globalData}; 
  db.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
 // console.log(globalData2);
  }

function showPortClose() {
   console.log('port closed.');
}
// this is called when the serial port has an error:
function showError(error) {
  console.log('Serial port error: ' + error);
}





