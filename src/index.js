const util = require('util');
const DATA_TYPE_TEXT = require('./../src/SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./../src/SqlFieldConfig').DATA_TYPE_NUMBER;
const DATA_TYPE_BOOLEAN = require('./../src/SqlFieldConfig').DATA_TYPE_BOOLEAN;

const winston = require('winston');
const XLSX = require('xlsx');
const SheetReader = require('./SheetReader');
const PostgresSqlGenerator = require('./PostgresSqlGenerator');
const SqlWriter = require('./SqlWriter');
var fs = require('fs');

const supportedDialect = ['postgres'];

class Exporter{
  constructor(){
    this.DATA_TYPE_TEXT = DATA_TYPE_TEXT;
    this.DATA_TYPE_NUMBER = DATA_TYPE_NUMBER;
    this.DATA_TYPE_BOOLEAN = DATA_TYPE_BOOLEAN;
    
    this.logger = winston.createLogger({
        level: 'debug',
        format: winston.format.simple(),
        ///defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'log.log' }),
            new winston.transports.Console({
                format: winston.format.simple()
            })
        ]
    });
  }
  logInfo(...objects) {
    this.logger.info(util.format(...objects));
  }
  logDebug(...objects) {
      this.logger.debug(util.format(...objects));
  }

  createSQLInsertQuery(tableConfig, rowData){
    this.logInfo("--- createSQLInsertQuery start");
    this.logInfo("All keys = " + Object.getOwnPropertyNames(rowData));
    this.logInfo("Table config = " + JSON.stringify(tableConfig));
    if(Object.getOwnPropertyNames(rowData).length>0)
    {
      var sqlInsert = util.format("\nINSERT INTO `%s` (%s) VALUES (%s);"
        , tableConfig['table_name']
        , Object.keys(tableConfig['fields']).map(function(key, index){ return "`" + key + "`";}).join(', ')
        , Object.keys(tableConfig['fields']).map(function(key, index){
            if(rowData[key] != undefined && rowData[key] !== "NULL")
            {
                if(tableConfig['fields'][key].toLowerCase() == DATA_TYPE_TEXT) {
                    return "'" + rowData[key] + "'";
                  }
                else if(tableConfig['fields'][key].toLowerCase() == DATA_TYPE_NUMBER){
                    return rowData[key];
                  }
            }
            return "NULL";
          }).join(', ')
      );
      this.logDebug("--- createSQLInsertQuery result: " + sqlInsert);
      return sqlInsert;
    }
    this.logDebug("--- createSQLInsertQuery: fail");
    return undefined;
  }
  
  exportSheetToQuery(filePath, config, sqlFilePath){
    this.logInfo("---exportSheetToQuery");
    this.logInfo('- Excel file path: ' + filePath);
    this.logInfo("- Config: " + JSON.stringify(config, null, 2));
    
    var workbook = XLSX.readFile(filePath);
    
    
    var allInsertQueries = [];
    var sqlDesc = '/***************************************************\n'
      + '- [EXPORT-QUERY-START]\n'
      + '- Import queries from ' + filePath + "\n"
      + util.format("- Created time: %s", new Date()) + "\n"
      + '****************************************************/\n';

    allInsertQueries.push(sqlDesc);
    var extraSql = config['pre_insert_sql'];
    if(extraSql != undefined)
    {
      this.logInfo("Printing pre_insert_sql: " + Object.getOwnPropertyNames(extraSql).length);
      allInsertQueries.push('\n----- Pre-insert queries: \n');
      for(var index in extraSql){
          allInsertQueries.push(extraSql[index] + "\n");
          this.logDebug("Extra sql: " + extraSql[index]);
      }
    }

    
    this.logInfo("ExportSheet, config=", JSON.stringify(config));
    
    workbook.SheetNames.forEach(function(sheetName){
      
      var tableConfig = config[sheetName];
      this.logInfo("\tLoadingSheet: sheet=", sheetName, ", config=", JSON.stringify(tableConfig));


      if(tableConfig)
      {
        var sheet = workbook.Sheets[sheetName];
        
        ///this.logInfo("SheetColumns ", sheetName, Object.getOwnPropertyNames(sheetJSON));

        

        var reader = new SheetReader(filePath);
        reader.read();
        var rowss = reader.readRows(sheetName, tableConfig);
        console.log("SampleRow1", rowss[0]);
        console.log("SampleRow2", rowss[1]);
        console.log("SampleRow3", rowss[2]);

      
        var sheetJSON = XLSX.utils.sheet_to_json(sheet);
        this.logInfo("LoadedSheet: sheet=", sheetName, ", rows=", sheetJSON.length);
        if(sheetJSON.length > 0)
        {
            ///Read headers
            var rowHeader = sheetJSON['0'];
            var rowNum = rowHeader['__rowNum__'];
            this.logInfo(util.format("\tHeaders info: type %s, %d total, values=%s"
              , typeof(rowHeader)
              , rowNum
              , Object.getOwnPropertyNames(rowHeader)));


            var sqlInsertDesc = util.format("\n----- Insert into table %s, data get from sheet %s", tableConfig['table_name'], sheetName);
            allInsertQueries.push(sqlInsertDesc);

            for(let i = 0;i<sheetJSON.length;i++)
            {
              ///Read data
              var row = sheetJSON[i];
              this.logInfo(util.format("\tParsing row %d/%d: %s", (i+1), sheetJSON.length, JSON.stringify(row)));
              var insertQuery = this.createSQLInsertQuery(tableConfig, row);
              if(insertQuery != undefined)
              {
                allInsertQueries.push(insertQuery);
              }
            }
        }
      }
      else {
        console.log("\tSheet has no config, bypass it!");
      }
    }.bind(this));

    var extraSql = config['postInsertSql'];
    if(extraSql != undefined)
    {
      this.logInfo("Printing postInsertSql: " + Object.getOwnPropertyNames(extraSql).length);
      allInsertQueries.push('\n----- Post-insert queries: \n');
      for(var index in extraSql){
          allInsertQueries.push(extraSql[index] + "\n");
          this.logDebug("Extra sql: " + extraSql[index]);
      }
    }

    allInsertQueries.push('\n/***************************************************\n');
    allInsertQueries.push('- [EXPORT-QUERY-END] \n');
    allInsertQueries.push('****************************************************/\n');
    
    
    var fs = require('fs');
    fs.writeFile(sqlFilePath, allInsertQueries.join(''), function (err) {
      if (err) throw err;
      var path = require("path");
      var absolutePath = path.resolve(sqlFilePath);
      this.logInfo("SQL file generated: " + absolutePath);

    }.bind(this));
  }
  createDefaultConfig(sheetName, sheetColumns){
    this.logInfo("createDefaultConfig", sheetName, sheetColumns.length);
    let config = {};
    this.logInfo("Columns found:", sheetColumns.length);
    config["fields"] = {};
    sheetColumns.forEach(function(field){
        config.fields[field] = {type: DATA_TYPE_TEXT, sqlField:field};
    }.bind(this));

    config["schema"] = "";
    config["table"] = sheetName;
    return config;
  }
  
  
  exportInsert(sqlDialect, sheetFilePath, sqlConfig, sqlFolderPath){
    this.logInfo("Sheet2Sql.export");
    this.logInfo('- Sheet path: ' + sheetFilePath);
    this.logInfo('- SQL path: ' + sqlFolderPath);
    this.logInfo('- SQL dialect: ' + sqlDialect);
    this.logInfo("- Config:", JSON.stringify(sqlConfig, null, 2));
    this.logInfo("- Config:", sqlConfig);

    var reader = new SheetReader();
    reader.readFile(sheetFilePath);
    
    if (!fs.existsSync(sqlFolderPath)){
        fs.mkdirSync(sqlFolderPath);
    }
    
    ///No config given => parse all sheet
    if(sqlConfig == null || Object.keys(sqlConfig).length == 0) {
        this.logInfo("NoConfig given, generating default config: ", reader.getSheetnames());
        for(let sheetIndex in reader.getSheetnames()){
          let sheetName = reader.getSheetnames()[sheetIndex];
          let sheetColumns = reader.getColumns(sheetName);
          
          sqlConfig[sheetName] = this.createDefaultConfig(sheetName, sheetColumns);
          
        }
        this.logInfo("Generating default config: ", Object.keys(sqlConfig).length);
    }

    Object.keys(sqlConfig).forEach(function (sheet) {
      this.logInfo("Exporting sheet: ", sheet, sqlConfig[sheet]);
      let rows = reader.readRows(sheet, sqlConfig[sheet]);

      let generator = new PostgresSqlGenerator(sqlConfig[sheet]);
      generator.generateInsertQuery(rows);
      
      let sqlWriter = new SqlWriter();
      sqlWriter.writeFile(sqlFolderPath + "/" + sheet + "." +sqlDialect + ".sql", generator);
      
    }.bind(this));
    
  }
  
}


            

            
module.exports = new Exporter();
