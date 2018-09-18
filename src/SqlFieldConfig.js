`use strict`

const DATA_TYPE_TEXT = "text";
const DATA_TYPE_NUMBER = "number";
const DATA_TYPE_BOOLEAN = "boolean";

const ROW_RANGE_ALL = -1;

class SqlFieldConfig {
    constructor(){
        this.type = "";

    }
}

module.exports = SqlFieldConfig;
module.exports.DATA_TYPE_TEXT = DATA_TYPE_TEXT;
module.exports.DATA_TYPE_NUMBER = DATA_TYPE_NUMBER;
module.exports.DATA_TYPE_BOOLEAN = DATA_TYPE_BOOLEAN;
module.exports.ROW_RANGE_ALL = ROW_RANGE_ALL;

