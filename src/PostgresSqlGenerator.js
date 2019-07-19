const SqlGenerator = require("./SqlGenerator");
const util = require('util');
const escape = require('pg-escape');
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
    ///console.debug("generateInsertIntoPhrase", schemaName, tableName, columnNames);
    if(schemaName && schemaName.length >0)
    {
      return util.format("INSERT INTO %s.%s(%s) VALUES "
      , escape.ident(schemaName)
      , escape.ident(tableName)
      , columnNames.map(function(value, index, array){
          return this.quoteFieldNameInInsertQuery(value);
        }.bind(this))
        .join(', ')
      );
    }
    else{
      return util.format("INSERT INTO %s(%s) VALUES "
      , escape.ident(tableName)
      , columnNames.map(function(value, index, array){
          return this.quoteFieldNameInInsertQuery(value);
        }.bind(this))
        .join(', ')
      );
    }
    
  }
  generateFieldValue(value, valueType)
  {
    if(value==null || value==undefined)
    {
      return 'NULL';
    }
    else{
      return escape("%L", value.toString());
    }
  }
  quoteFieldNameInInsertQuery(fieldName)
  {
    return escape("%I", fieldName);
  }

}

module.exports = PostgresSqlGenerator;