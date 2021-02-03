function  log(...msg) {
    let [hour, minute, second] = new Date()
        .toLocaleTimeString("en-US")
        .split(/:| /);
    
    // msg = msg.reduce((prev, cur) => {
    //     return prev + " " + cur;
    // });

    console.log(`[${hour}:${minute}:${second}] `, ...msg);
    
    

}

module.exports = log;