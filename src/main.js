const RBot = require("./core/RBot");

let bot = new RBot();
bot.configure("./bot-config.yml");
bot.start();

// TODO:

/**
* refactor project directory from
* core/* 
* 
* to 
* 
* core/rbot/*
* core/google/*
*
*/