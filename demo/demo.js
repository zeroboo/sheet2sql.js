const excel2Mysql = require("./../");
var excelFile = "./mission.xlsx";
var sqlFile = "./insert.sql";
var parseArgs = require('minimist');

console.log("----- Parameters:")
var argv = parseArgs(process.argv.slice(2));
console.log("excelFile: " + excelFile);
console.log("sqlFile: " + sqlFile);
console.log(JSON.stringify(argv));

console.log("----- Reading excel:")
var config = {
    "Mission": {
      schema: "game",
      table: "poker_mission",
      fields: {
        "id": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'id'},
        "name": {type: excel2Mysql.DATA_TYPE_TEXT, sqlField:'name'},
        "description": {type: excel2Mysql.DATA_TYPE_TEXT, sqlField:'description'},
        "type": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'type'},
        "category": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'category'},
        "frequency": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'frequency'},
        "requirement_type": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'requirement_type'},
        "parameters": {type: excel2Mysql.DATA_TYPE_TEXT, sqlField:'parameters'},
        "active": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'active'}
      }
      , preInsertSql:["TRUNCATE TABLE `poker_mission`;"]
      , postInsertSql: ["SELECT * FROM `poker_mission`;"]
    },
    "MissionLevel": {
      schema: "game",
      table: "poker_mission_level",
      fields: {
        "mission_id": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'mission_id'},
        "level": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'level'},
        "params": {type: excel2Mysql.DATA_TYPE_TEXT, sqlField:'params'},
        "requirement_value": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'requirement_value'},
        "reward_gold": {type: excel2Mysql.DATA_TYPE_NUMBER, sqlField:'reward_gold'}
      },
      preInsertSql:["TRUNCATE TABLE `poker_mission_level`;"],
      postInsertSql: ["SELECT * FROM `poker_mission_level`;"]
    }
};

excel2Mysql.exportInsert("postgres", excelFile, config, "./demo-with-config");
excel2Mysql.exportInsert("postgres", excelFile, config, "./demo-no-config");
