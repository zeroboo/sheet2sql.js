const excel2Mysql = require("./../");
var excelFile = "./mission.xlsx";
var sqlFile = "./insert.sql";
var sprintf = require('sprintf-js').sprintf;
var parseArgs = require('minimist');

console.log("----- Parameters:")
var argv = parseArgs(process.argv.slice(2));
console.log("excelFile: " + excelFile);
console.log("sqlFile: " + sqlFile);
console.log(JSON.stringify(argv));

console.log("----- Reading excel:")
var config = {
    "Mission": {
      table_name: "poker_mission"
      , fields: {
        "id": "number"
        , "name": "text"
        , "description": "text"
        , "type": "number"
        , "category": "number"
        , "frequency": "number"
        , "requirement_type": "number"
        , "parameters": "text"
        , "active": "number"
      }
      , preInsertSql:["TRUNCATE TABLE `poker_mission`;"]
      , postInsertSql: ["SELECT * FROM `poker_mission`;"]
      , "truncate_table": true
    }
    , "MissionLevel": {
      table_name: "poker_mission_level"
      , fields: {
        "mission_id": "number"
        , "level": "number"
        , "params": "text"
        , "requirement_value": "number"
        , "reward_gold": "number"
      }
      , preInsertSql:["TRUNCATE TABLE `poker_mission_level`;"]
      , postInsertSql: ["SELECT * FROM `poker_mission_level`;"]
    }
};

excel2Mysql.exportSheetToQuery(excelFile, config, sqlFile);
