const SqlGenerator = require("./SqlGenerator");
const util = require('util');

const DATA_TYPE_TEXT = require('./SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./SqlFieldConfig').DATA_TYPE_NUMBER;
const DATA_TYPE_BOOLEAN = require('./SqlFieldConfig').DATA_TYPE_BOOLEAN;
class PostgresSqlGenerator extends SqlGenerator {
  constructor(config) {
    super(config);
    this.logInfo("PostgresSqlGenerator.Constructor");
  }
  
  generateInsertQuery(dataRows)
  {
    return super.generateInsertQuery(dataRows);
  }
  

  generateInsertIntoPhrase(schemaName, tableName, columnNames)
  {
    if(schemaName && schemaName.length >0)
    {
      return util.format("INSERT INTO %s.%s(%s) VALUES "
      , schemaName
      , tableName
      , columnNames.map(function(value, index, array){
        ///console.log("val", value);
          return this.quoteFieldNameInInsertQuery(value);
        }.bind(this))
        .join(',')
      );
    }
    else{
      return util.format("INSERT INTO %s(%s) VALUES "
      , tableName
      , columnNames.map(function(value, index, array){
        ///console.log("val", value);
          return this.quoteFieldNameInInsertQuery(value);
        }.bind(this))
        .join(',')
      );
    }
    
  }

  quoteFieldNameInInsertQuery(fieldName)
  {
    return util.format('"%s"', fieldName);
  }

}

module.exports = PostgresSqlGenerator;