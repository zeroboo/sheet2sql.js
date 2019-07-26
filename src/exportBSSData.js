const excel2Mysql = require("./");
var sheetFile = "";
var sqlFile = "./insert.sql";


console.log("----- Parameters:")
var config={}

///excel2Mysql.exportInsert("postgres", "C:/Users/pthung/Projects/bss/data-1563852566724.csv", config, "./bss/data");
excel2Mysql.exportInsert("postgres", "C:/Users/pthung/Downloads/data-1563866891154.csv", config, "./bss/management");
