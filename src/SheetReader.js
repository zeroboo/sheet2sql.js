`use strict`
const XLSX = require('xlsx');
const winston = require('winston');
const util = require('util');

/**
 * An excel reader wrapper 
 */
class SheetReader {
    constructor(filePath) {
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
        this.workbook = null;
        this.logInfo("SqlGenerator: %s", "Constructor");
        this.filePath = filePath;
    }
    logInfo(...objects) {
        this.logger.info(util.format(...objects));
    }
    logDebug(...objects) {
        this.logger.debug(util.format(...objects));
    }
    /**
     * Read spreadsheet with path from this.filePath
     */
    read() {
        this.readFile(this.filePath);
    }
    /**
     * Read spreadsheet with given path
     */
    readFile(filePath) {
        this.logger.info("SheetReader.readFile", filePath);
        this.workbook = XLSX.readFile(filePath);
        this.sheetNames = this.workbook.SheetNames;
        this.logger.info("SheetReader.readFile: SheetNames", this.workbook.SheetNames);
    }

    getWorkbook() {
        return this.workbook;
    }
    getSheetnames() {
        return this.sheetNames;
    }
    /**
     * 
     * @param {*} sheetName 
     * @param {*} sqlConfig Table config, @see RowConfig
     */
    readRows(sheetName, sqlConfig) {
        this.logInfo("SheetReader.readRows: sheetName=", sheetName, ", config=", sqlConfig, ", filter=", sqlConfig?sqlConfig.filter:"noFilter");
        var sheet = this.workbook.Sheets[sheetName];

        
        let returnRows = [];

        if (sheet) {
            if (sqlConfig) {
                var sheetJSON = XLSX.utils.sheet_to_json(sheet, { raw: true });
                if (sheetJSON) {
                    this.logInfo("SheetReader.rows: ", sheetJSON.length);

                    sheetJSON.forEach(function (row, rowIndex, sheetRows) {
                        this.logInfo("FieldJson: ", row);
                        let selectedRow = (!sqlConfig.startRow && !sqlConfig.endRow)
                            || (sqlConfig.startRow && rowIndex >= sqlConfig.startRow)
                            || (sqlConfig.endRow && rowIndex <= sqlConfig.endRow);

                        if (selectedRow) {
                            let currentRow = {};
                            let filtered = false;
                            
                            ///Create new row object
                            Object.keys(sqlConfig.fields).forEach(function (key) {
                                if(row.hasOwnProperty(key)){
                                    currentRow[key]=row[key];
                                }else{
                                    currentRow[key]=null;
                                }
                            }.bind(this));

                            ///Filter rows
                            filtered = !sqlConfig.filter || sqlConfig.filter(currentRow);
                            if(filtered){
                                this.logDebug("Filtered, row=", JSON.stringify(currentRow));
                                returnRows.push(currentRow);
                            }
                        }
                    }.bind(this));
                }
                else {
                    throw new Error("Parsing sheet error: " + sheetName);
                }
            }
        }
        else {
            throw new Error("Invalid sheet name: " + sheetName);
        }
        return returnRows;
    }
}

module.exports = SheetReader;
