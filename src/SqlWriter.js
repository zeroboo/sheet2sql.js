`use strict`
const fs = require('fs');

class SqlWriter {
    constructor(){

    }

    writeFile(outputFilePath, sqlGenerator){
        var stream = fs.createWriteStream(outputFilePath, {
            encoding:"utf-8"
            , autoClose:true
        });
        stream.once('open', function(fd) {
            
        });
        for(var line of sqlGenerator)
            {
                ///console.log(line);
                stream.write(line);
                stream.write("\n");
            }
            stream.end();
    }
}

module.exports = SqlWriter;