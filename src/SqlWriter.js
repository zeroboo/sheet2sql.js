`use strict`
const fs = require('fs');

class SqlWriter {
    constructor(){

    }

    writeFile(outputFilePath, sqlGenerator){
        var stream = fs.createWriteStream(outputFilePath);
        stream.once('open', function(fd) {
            for(var line of sqlGenerator)
            {
                stream.write(line);
                stream.write("\n");
            }
            stream.end();
        });
        
    }
}

module.exports = SqlWriter;