const excel2Mysql = require("./");
var sheetFile = "C:/Users/pthung/Projects/bss/data-1563852566724.csv";
var sqlFile = "./insert.sql";


console.log("----- Parameters:")
var config={}

excel2Mysql.exportInsert("postgres", sheetFile, config, "./");
