module.exports = function(io) {
    
    var SerialPort = require('serialport')
    let portNum = ""
    let serialports =[]
    SerialPort.list().then(ports => {
        console.log(ports[0].path)
        portNum = `${ports[0].path}`
        const Readline = SerialPort.parsers.Readline; 
        var port = new SerialPort(portNum, {
            baudRate: 115200
        }, false);
        const parser = port.pipe(new Readline()); 
        parser.on('data', data => {
            console.log(data)
            io.emit("return", {"message":data})
        });
        // ports.forEach((item)=>{
        //     serialports.push(item.path);
        // });
    // console.log(serialports)
    });
};