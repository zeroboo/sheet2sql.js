const SheetReader = require('./SheetReader');
const SqlWriter = require('./SqlWriter');
const PostgresSqlGenerator = require('./PostgresSqlGenerator');

const DATA_TYPE_TEXT = require('./SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_BOOLEAN = require('./SqlFieldConfig').DATA_TYPE_BOOLEAN;

var reader = new SheetReader();
reader.readFile('./demo/mission.xlsx');

var missionConfig = {
    fields:{
        'id': {type: DATA_TYPE_TEXT, sqlField:'country', sqlFieldValue:''}
        , 'name': {type: DATA_TYPE_TEXT, sqlField:'field_id'}
        , 'description': {type: DATA_TYPE_TEXT, sqlField:''}
        , 'type': {type: DATA_TYPE_NUMBER, sqlField:'keyword'}
        , 'category': {type: DATA_TYPE_NUMBER, sqlField:'up'}
        , 'frequency': {type: DATA_TYPE_NUMBER, sqlField:'down'}
        , 'requirement_type': {type: DATA_TYPE_NUMBER, sqlField:'requirement_type'}
        , 'parameters': {type: DATA_TYPE_TEXT, sqlField:'parameters'}
        , 'active': {type: DATA_TYPE_BOOLEAN, sqlField:'active'}
        , 'level required': {type: DATA_TYPE_NUMBER, sqlField:'level_required'}
    }
    , table: "mission"
    , schema: "game"
    , preInsertSql:["-- Hello World"]
    , postInsertSql:["-- Bye World"]
};

var rows = reader.readRows("Mission", missionConfig);
console.log("SampleRow1", JSON.stringify(rows[0]));
console.log("SampleRow2", JSON.stringify(rows[1]));
console.log("SampleRow3", JSON.stringify(rows[2]));
console.log("SampleRow4", JSON.stringify(rows[3]));
console.log("Total read rows=", rows.length);

var generator = new PostgresSqlGenerator(missionConfig);
generator.generateInsertQuery(rows);

var sqlWriter = new SqlWriter();
sqlWriter.writeFile("./mission.sql", generator);