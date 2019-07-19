`use strict`;
const winston = require('winston');
const util = require('util');
const DATA_TYPE_TEXT = require('./SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./SqlFieldConfig').DATA_TYPE_NUMBER;
const DATA_TYPE_BOOLEAN = require('./SqlFieldConfig').DATA_TYPE_BOOLEAN;

const STEP_PRE_INSERT = 0;
const STEP_INSERT_PHRASE = 1;
const STEP_INSERT_VALUES = 2;
const STEP_POST_INSERT = 3;

class SqlGenerator{
    constructor(config){
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            ///defaultMeta: { service: 'user-service' },
            transports: [
              //new winston.transports.File({ filename: 'error.log', level: 'error' }),
              //new winston.transports.File({ filename: 'combined.log' })
              new winston.transports.Console({
                format: winston.format.simple()
              })
            ]
          });
        this.config = config;
        this.resetGeneratingInsertQuery();
        this.dataRows = null;
        this.logInfo("SqlGenerator: config", (config));
    }
    logInfo(... objects)
    {
        this.logger.info(util.format(...objects));
    }
    logDebug(... objects)
    {
        this.logger.debug(util.format(...objects));
    }
    
    [Symbol.iterator]() {
      
      return {
        next: function(){
          let complete = false;
          let value = null;
          ///Pre sql
          while(value ==null && !complete){

            if(this.generateStep == STEP_PRE_INSERT)
            {
              if (this.config.preInsertSql) {
                if (this.generatePreQueryCount < this.config.preInsertSql.length) {
                  value = this.config.preInsertSql[this.generatePreQueryCount];
                  this.generatePreQueryCount++;
                }
                else{
                  this.generateStep++;
                }
              }
              else{
                this.generateStep++;
              }
            }
            else if(this.generateStep == STEP_INSERT_PHRASE)
            {
              if (this.dataRows && this.dataRows.length > 0) {
                let dataFields = Object.keys(this.config.fields).filter(function (key, index, arr) {
                    ///console.log("Filtering key :", key, this.config.fields[key]);
                    return this.config.fields[key].sqlField.length > 0;
                  }
                  , this
                );
                value = this.generateInsertIntoPhrase(this.config.schema, this.config.table, dataFields)
                this.generateStep++;
              } else{
                this.generateStep++;
              }
              
            }
            else if(this.generateStep == STEP_INSERT_VALUES)
            {
              if (this.dataRows) {
                if (this.generateQueryPhraseValueCount < this.dataRows.length) {
                  let fieldValues = Object.keys(this.config.fields)
                    .filter(function (key, index, arr) {
                      return this.config.fields[key].sqlField.length > 0;
                      }
                      , this
                    )
                    .map(function (key, index, arr) {
                        this.logDebug("MapValueKey: ", key, this.generateQueryPhraseValueCount, this.config.fields[key]);
                        if (this.config.fields[key].sqlFieldValue && this.config.fields[key].sqlFieldValue.length > 0) {
                          ///Field value is a subquery
                          return util.format(this.config.fields[key].sqlFieldValue, this.dataRows[this.generateQueryPhraseValueCount][key]);
                        } else{
                          return this.generateFieldValue(this.dataRows[this.generateQueryPhraseValueCount][key], this.config.fields[key].type);
                        }
                      }
                      , this
                    ).join(', ');
    
                  value = util.format("(%s)%s"
                    , fieldValues
                    , (this.generateQueryPhraseValueCount == this.dataRows.length - 1)
                      ? ";"
                      : ","
                  );
                  this.generateQueryPhraseValueCount++;
                }
                else{
                  this.generateStep++;
                }
              } else {
                this.generateStep++;
              }
            }
            else if (this.generateStep == STEP_POST_INSERT)
            {
                ///Post sql
                if (this.config.postInsertSql) {
                  if (this.generatePostQueryCount < this.config.postInsertSql.length) {
                    value = this.config.postInsertSql[this.generatePostQueryCount];
                    this.generatePostQueryCount++;
                  }
                  else{
                    complete = true;  
                  }
                }
                else{
                  complete = true;
                }
            }
          }
          ///console.log("Generating: ", value, complete, this.generateStep)
          return { value: value, done: complete };
        }.bind(this)
      };
    }

    quoteFieldNameInInsertQuery(fieldName)
    {
      return '"' + fieldName + '"';
    }
    
    generateInsertQuery(dataRows) {
      this.dataRows = dataRows;
      ///this.logInfo("SqlGenerator.generateInsertQuery: ", "config=", JSON.stringify(this.config), ", dataRows=", this.dataRows.length);
    }

    generateInsertIntoPhrase(schemaName, tableName, columnNames)
    {
        return "";
    }

    generateFieldValue(value, valueType)
    {
      if (valueType == DATA_TYPE_TEXT) {
        return "'" + value + "'";
      }
      else {
        return value;
      }
    }
    resetGeneratingInsertQuery()
    {
      this.generatePreQueryCount = 0;
      this.generateQueryPhraseValueCount = 0;
      this.generatePostQueryCount = 0;
      this.generateStep = 0;

    }


}

module.exports = SqlGenerator;