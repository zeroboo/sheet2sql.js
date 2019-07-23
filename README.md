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

To generating mysql import queries:<br>
`excel2Mysql.exportSheetToQuery(excelFile, config, sqlFile);`

## Configuration

## Demo
From root folder, go to demo folder
`cd demo`
Run demo script
`node demo.js`
Query file will be generated from mission.xlsx
Scripts will be generated under sub folder
`demo-with-config`: run exporter with a configuration
`demo-no-config`: run exporter with default configuration



## Support

## Notes




