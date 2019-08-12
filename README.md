# sheet2sql.js
A node module for generating sql from sheet document (xls, xslx, csv...)

## Table of Contents
**[Installation Instructions](#installation-instructions)**<br>
**[Usage](#Usage)**<br>
**[Configuration](#Configuration)**<br>
**[Demo](#Demo)**<br>
**[Support](#Support)**<br>
**[Notes](#Notes)**<br>



## Installation-instructions
From npm: `npm install sheet2sql`
## Usage
Require module:<br>
`const sheet2Sql = require("sheet2sql");`

To generating mysql insert queries:<br>
`sheet2sql.exportInsert(sqlDialect, sheetFile, config, outputFolder);`
* `sqlDialect`: currently support `postgres` 
* `sheetFile`: path to sheet file
* `config`: exporting config, `null` to use default config
* `outputFolder` Folder for generated SQL queries
## Configuration
Config object has fields that map a sheet name to this sheet parsing config.
{
    "Sheet1": {} 
}

SheetConfig 
{

}


## Demo
From root folder, go to demo folder<br>
```cd demo```
Run demo script<br>
```node demo.js```
Query file will be generated from demo/mission.xlsx<br>

Scripts will be generated under sub folder<br>
```demo-with-config```: run exporter with a configuration<br>
```demo-no-config```: run exporter with default configuration<br>



## Support

## Notes




