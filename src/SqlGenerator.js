`use strict`;
const winston = require('winston');
const util = require('util');
const DATA_TYPE_TEXT = require('./SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./SqlFieldConfig').DATA_TYPE_NUMBER;
const DATA_TYPE_BOOLEAN = require('./SqlFieldConfig').DATA_TYPE_BOOLEAN;
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
        this.logInfo("SqlGenerator: config", JSON.stringify(config));
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
          let complete = true;
          let value = null;
          ///Pre sql
          if (complete && this.config.preInsertSql) {
            if (this.generatePreQueryCount < this.config.preInsertSql.length) {
              value = this.config.preInsertSql[this.generatePreQueryCount];
              this.generatePreQueryCount++;
              complete = false;
            }
          }
          
          ///INSERT INTO
          if (this.dataRows && this.dataRows.length > 0) {
            if (complete && !this.generateQueryPhraseInsertInto) {
              this.generateQueryPhraseInsertInto = true;
              let dataFields = Object.keys(this.config.fields).filter(function (key, index, arr) {
                ///console.log("Filtering key :", key, this.config.fields[key]);
                return this.config.fields[key].sqlField.length > 0;
                }
                , this
              );
              value = this.generateInsertIntoPhrase(this.config.schema, this.config.table, dataFields)
              console.log("hahaha", dataFields);
              complete = false;
            }
  
            if (complete && this.dataRows) {
              if (this.generateQueryPhraseValueCount < this.dataRows.length) {
                
                let fieldValues = Object.keys(this.config.fields)
                  .filter(function (key, index, arr) {
                    return this.config.fields[key].sqlField.length > 0;
                    }
                    , this
                  )
                  .map(function (key, index, arr) {
                      ///console.log("MapValueKey: ", key, this.generateQueryPhraseValueCount, this.config.fields[key]);
                      if (this.config.fields[key].sqlFieldValue && this.config.fields[key].sqlFieldValue.length > 0) {
                        return util.format(this.config.fields[key].sqlFieldValue, this.dataRows[this.generateQueryPhraseValueCount][key]);
                      }
                      else{
                        if (this.config.fields[key].type == DATA_TYPE_TEXT) {
                          return "'" + this.dataRows[this.generateQueryPhraseValueCount][key] + "'";
                        }
                        else {
                          return this.dataRows[this.generateQueryPhraseValueCount][key];
                        }
                      }
                      }
                    , this
                  ).join(',');
  
                value = util.format("(%s)%s"
                  , fieldValues
                  , (this.generateQueryPhraseValueCount == this.dataRows.length - 1)
                    ? ";"
                    : ","
                );
                this.generateQueryPhraseValueCount++;
                complete = false;
              }
            }
          }
          else {
            this.generateQueryPhraseInsertInto = true;
          }
  
          ///Post sql
          if (complete && this.config.postInsertSql) {
            if (this.generatePostQueryCount < this.config.postInsertSql.length) {
              value = this.config.postInsertSql[this.generatePostQueryCount];
              this.generatePostQueryCount++;
              complete = false;
            }
          }
  
          if (complete) {
            return { done: true };
          }
          else {
            return { value: value, done: false };
          }
        }.bind(this)
      };
    }
    quoteFieldNameInInsertQuery(fieldName)
    {
      return '"' + fieldName + '"';
    }
    
    generateInsertQuery(dataRows) {
      this.dataRows = dataRows;
      this.logInfo("SqlGenerator.generateInsertQuery: ", "config=", JSON.stringify(this.config), ", dataRows=", this.dataRows.length);
    }

    generateInsertIntoPhrase(schemaName, tableName, columnNames)
    {
        return "";
    }

    resetGeneratingInsertQuery()
    {
      this.generatePreQueryCount = 0;
      this.generateQueryPhraseInsertInto = false;
      this.generateQueryPhraseValueCount = 0;
      this.generatePostQueryCount = 0;
    }


}

module.exports = SqlGenerator;