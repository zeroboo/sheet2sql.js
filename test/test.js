const excel2Mysql = require("xlsx2mysql");
excel2Mysql.info("tada");

var excelFile ="./mission.xlsx";
var sqlFile ="./insert.sql";
var sprintf = require('sprintf-js').sprintf;
var parseArgs = require('minimist');

console.log("----- Parameters:")
var argv = parseArgs(process.argv.slice(2));
console.log("excelFile: " + excelFile);
console.log("sqlFile: " + sqlFile);
console.log(JSON.stringify(argv));

console.log("----- Reading excel:")
var config = {
  "sheets":{
    "Mission":{"table_name":"poker_mission"
      , "fields": {
          "id":"number"
          ,"name":"text"
          ,"description":"text"
          ,"type":"number"
          ,"category":"number"
          ,"frequency":"number"
          , "requirement_type":"number"
          ,	"parameters":"text"
          , "active":"number"
        }
      , "truncate_table":true}
    , "MissionLevel":{
        "table_name":"poker_mission_level"
        , "fields":{
            "mission_id":"number"
            ,"level":"number"
            ,"params":"text"
            , "requirement_value":"number"
            ,	"reward_gold":"number"
      }
    , "truncate_table":true}
  },
  "post_insert_sql":["SELECT * FROM poker_mission_level;"
      , "SELECT * FROM poker_mission;"
      , "SELECT * FROM poker_mission LEFT JOIN poker_mission_level ON poker_mission.id = poker_mission_level.mission_id;"
    ]

};

excel2Mysql.exportExcelToQuery(excelFile, config, sqlFile);
