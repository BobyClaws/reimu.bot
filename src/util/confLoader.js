const YAML = require("yaml");
const fs = require("fs");

let confLoader = {};

confLoader.load = function(path) {
    let configFile = fs.readFileSync(path, "utf-8");
    return YAML.parse(configFile);
};

confLoader.save = function(path, data) {
    let dataString = YAML.stringify(data);
    fs.writeFileSync(path, dataString);
};

module.exports = confLoader;
