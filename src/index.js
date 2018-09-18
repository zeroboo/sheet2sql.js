function Importer(){

            this.sprintf = require('sprintf-js').sprintf;

            Importer.prototype.info = function (info) {
              console.log("[INFO]" + info);
            };
            Importer.prototype.warning = function (warning) {
                console.log('Warning: ' + warning);
            };
            Importer.prototype.error = function (error) {
                console.log('Error: ' + error);
            };
            var debugOn = false;
            Importer.prototype.debug = function (error) {
              if(this.debugOn == true)
                {
                  console.log('[DEBUG]: ' + error);
                }
            };
            const FIELD_TYPE_TEXT = "text";
            const FIELD_TYPE_NUMBER = "number";
            Importer.prototype.createSQLInsertQuery = function(tableConfig, rowData){
				      this.debug("--- createSQLInsertQuery start");
              this.debug("All keys = " + Object.getOwnPropertyNames(rowData));
              this.debug("Table config = " + JSON.stringify(tableConfig));
              if(Object.getOwnPropertyNames(rowData).length>0)
              {
                var sqlInsert = this.sprintf("\nINSERT INTO `%s` (%s) VALUES (%s);"
                  , tableConfig['table_name']
                  , Object.keys(tableConfig['fields']).map(function(key, index){ return "`" + key + "`";}).join(', ')
                  , Object.keys(tableConfig['fields']).map(function(key, index){
                      if(rowData[key] != undefined && rowData[key] !== "NULL")
                      {
                          if(tableConfig['fields'][key].toLowerCase() == FIELD_TYPE_TEXT)
                            {
                              return "'" + rowData[key] + "'";
                            }
                          else if(tableConfig['fields'][key].toLowerCase() == FIELD_TYPE_NUMBER){
                              return rowData[key];
                            }
                      }
                      return "NULL";
                    }).join(', ')
                );
                this.debug("--- createSQLInsertQuery result: " + sqlInsert);
                return sqlInsert;
              }
              this.debug("--- createSQLInsertQuery: fail");
              return undefined;
            }

            Importer.prototype.exportExcelToQuery = function(filePath, insertConfig, sqlFilePath){
              this.info("exportExcelToQuery");
              this.info('- Excel file path: ' + filePath);
              this.info("- Inserting's config: " + JSON.stringify(insertConfig, null, 2));
              var XLSX = require('xlsx');
              var workbook = XLSX.readFile(filePath);

              const util = require('util');

              var fs = require('fs');
              var allInsertQueries = [];

              var sqlDesc = '/***************************************************\n'
                + '- [EXPORT-QUERY-START]\n'
                + '- Import queries from ' + filePath + "\n"
                + this.sprintf("- Created time: %s", new Date()) + "\n"
                + '****************************************************/\n';

              allInsertQueries.push(sqlDesc);
              var extraSql = insertConfig['pre_insert_sql'];
              if(extraSql != undefined)
              {
                this.info("Printing pre_insert_sql: " + Object.getOwnPropertyNames(extraSql).length);
                allInsertQueries.push('\n----- Pre-insert queries: \n');
                for(var index in extraSql){
                    allInsertQueries.push(extraSql[index] + "\n");
                    this.debug("Extra sql: " + extraSql[index]);
                }
              }


              var sheetConfig = insertConfig['sheets'];
              this.info(this.sprintf("Sheets config: %s", JSON.stringify(sheetConfig)));
              workbook.SheetNames.forEach(sheetName => {

                console.log("\tLoaded sheet: " + sheetName);
                var tableConfig = sheetConfig[sheetName];
                this.info(this.sprintf("\t- Table's config: %s", JSON.stringify(tableConfig)));

                if(tableConfig != undefined)
                {
                  var sheet = workbook.Sheets[sheetName];
                  var sheetJSON = XLSX.utils.sheet_to_json(sheet);
                  ///console.log(Object.getOwnPropertyNames(sheetJSON));

                  this.info(this.sprintf("Parsing sheet %s, total rows %d", sheetName, sheetJSON.length));

                  // if(tableConfig['truncate_table'] === true)
                  // {
                  //     var sqlTruncate = '-- Truncating table `' + tableConfig.table_name+ '`\n'
                  //       +'TRUNCATE TABLE `' + tableConfig.table_name + '`;\n';
                  //
                  //     allInsertQueries.push(sqlTruncate);
                  // }
                  if(sheetJSON.length > 0)
                  {
                      ///Read headers
                      var rowHeader = sheetJSON['0'];
                      var rowNum = rowHeader['__rowNum__'];
                      this.info(this.sprintf("\tHeaders info: type %s, %d total, values=%s", typeof(rowHeader), rowNum, Object.getOwnPropertyNames(rowHeader)));


                      var sqlInsertDesc = this.sprintf("\n----- Insert into table %s, data get from sheet %s", tableConfig['table_name'], sheetName);
                      allInsertQueries.push(sqlInsertDesc);

                      for(let i = 0;i<sheetJSON.length;i++)
                      {
                        ///Read data
                        var row = sheetJSON[i];
                        this.info(this.sprintf("\tParsing row %d/%d: %s", (i+1), sheetJSON.length, JSON.stringify(row)));
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
              });

              var extraSql = insertConfig['post_insert_sql'];
              if(extraSql != undefined)
              {
                this.info("Printing post_insert_sql: " + Object.getOwnPropertyNames(extraSql).length);
                allInsertQueries.push('\n----- Post-insert queries: \n');
                for(var index in extraSql){
                    allInsertQueries.push(extraSql[index] + "\n");
                    this.debug("Extra sql: " + extraSql[index]);
                }
              }

              allInsertQueries.push('\n/***************************************************\n');
              allInsertQueries.push('- [EXPORT-QUERY-END] \n');
              allInsertQueries.push('****************************************************/\n');
              var info = this.info;
              fs.writeFile(sqlFilePath, allInsertQueries.join(''), function (err) {
                if (err) throw err;
                var path = require("path");
                var absolutePath = path.resolve(sqlFilePath);
                info("SQL file generated: " + absolutePath);

              });
            };
    };

module.exports = new Importer();
