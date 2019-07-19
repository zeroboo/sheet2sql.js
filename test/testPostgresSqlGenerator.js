const PostgresSqlGenerator = require("../src/PostgresSqlGenerator");
const assert = require('assert');
const DATA_TYPE_TEXT = require('./../src/SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./../src/SqlFieldConfig').DATA_TYPE_NUMBER;
const DATA_TYPE_BOOLEAN = require('./../src/SqlFieldConfig').DATA_TYPE_BOOLEAN;

describe("TestGenerateSQLInsert", function(){
    var sampleMission;
    var missionConfig;
    var simpleConfig;
    before(function(done){
            sampleMission = [ { id: 1,
                name: 'Win x time any game',
                description: 'Win in any game',
                type: 1,
                category: 0,
                frequency: 30,
                requirement_type: 1,
                parameters: 'NULL',
                active: true, "level required":1 }
              , { id: 2,
                name: 'Play x time with any game',
                description: 'Play in any game',
                type: 1,
                category: 0,
                frequency: 35,
                requirement_type: 2,
                parameters: 'NULL',
                active: true, "level required":2}
              , { id: 3,
                name: 'Exchange gold',
                description:
                 'Exchange Gold from oncase x times with any game - any value accepted',
                type: 1,
                category: 0,
                frequency: 35,
                requirement_type: 3,
                parameters: 'NULL',
                active: true,
                "level required":3}
            ];
            missionConfig = {
                fields:{
                    'id': {type: DATA_TYPE_TEXT, sqlField:'id', sqlFieldValue:''}
                    , 'name': {type: DATA_TYPE_TEXT, sqlField:'name'}
                    , 'description': {type: DATA_TYPE_TEXT, sqlField:'description'}
                    , 'type': {type: DATA_TYPE_NUMBER, sqlField:'type'}
                    , 'category': {type: DATA_TYPE_NUMBER, sqlField:'category'}
                    , 'frequency': {type: DATA_TYPE_NUMBER, sqlField:'frequency'}
                    , 'requirement_type': {type: DATA_TYPE_NUMBER, sqlField:'requirement_type'}
                    , 'parameters': {type: DATA_TYPE_TEXT, sqlField:'parameters'}
                    , 'active': {type: DATA_TYPE_BOOLEAN, sqlField:'active'}
                    , 'level required': {type: DATA_TYPE_NUMBER, sqlField:'level_required'}
                }
                , filter: (row) => {
                    
                    return row.Caption == 'PO-Number';
                }
                , table: "mission"
                , schema: "game"
                , preInsertSql:["-- Hello World"]
                , postInsertSql:["-- Bye World"]
            };

            simpleConfig = {
                fields:{
                    "field1": {type: DATA_TYPE_TEXT, sqlField:'field1'},
                    "field2": {type: DATA_TYPE_NUMBER, sqlField:'field2'}, 
                    "field3": {type: DATA_TYPE_BOOLEAN, sqlField:'field3'},
                    "field4": {type: DATA_TYPE_NUMBER, sqlField:'field4'},
                    "field5": {type: DATA_TYPE_TEXT, sqlField:'field5'},
                    "field6": {type: DATA_TYPE_TEXT, sqlField:'field6'}
                }
                , table: "table_name"
                , schema: "schema_name"

            }
            done();
        }
    );
    after(function(done){
        done();
    });

    it("TestNewGenerator_NoException", function(done){
        var generator = new PostgresSqlGenerator();
        done();
    });
    
    it("TestGenertingInsert_NullInput_ResponseError", function(done){
        var generator = new PostgresSqlGenerator();
        assert.throws(() => {
                generator.generateInsertQuery(null, null, null);
            }
            , Error
            , "Error: No outputfile");
        
        done();
    });

    it("TestQuoteFieldNameInInsertQuery_NotQuote_Correct", function(done){
        var generator = new PostgresSqlGenerator();
        assert.equal('fieldname', generator.quoteFieldNameInInsertQuery("fieldname"));
        done();
    });
    it("TestQuoteFieldNameInInsertQuery_Quote_Correct", function(done){
        var generator = new PostgresSqlGenerator();
        assert.equal('"field name"', generator.quoteFieldNameInInsertQuery("field name"));
        done();
    });
    
    it("TestGenerateInsertSingle_Normal_ResultCorrect", function(done){
        
        var generator = new PostgresSqlGenerator(simpleConfig);
        generator.generateInsertQuery([{
                field1: "field1", 
                field2: 1,
                field3: false,
                field4: 1.5,
                field5: "",
                field6: null
            }
        ]);
        var sql = Array.from(generator).join('');
        console.log("TestGenerateInsertSingle_Normal_ResultCorrect", sql);
        assert.equal(`INSERT INTO schema_name.table_name(field1, field2, field3, field4, field5, field6) VALUES ('field1', '1', 'false', '1.5', '', NULL);`
            , sql);
        done();
    });

    it("TestGenerateInsertSingle_SpecialCharacterQuote_ResultEscaped", function(done){
        var generator = new PostgresSqlGenerator(simpleConfig);
        generator.generateInsertQuery([{
                field1: "field1'", 
                field2: 1,
                field3: false,
                field4: 1.5,
                field5: "''\"",
                field6: "$$aa$$"
            }
        ]);
        var sql = Array.from(generator).join('');
        console.log("TestGenerateInsertSingle_SpecialCharacterQuote_ResultEscaped: ", sql);
        assert.equal(`INSERT INTO schema_name.table_name(field1, field2, field3, field4, field5, field6) VALUES ('field1''', '1', 'false', '1.5', '''''"', '$$aa$$');`
            , sql);
        done();
    });

    
    it("TestGenerateInsertSingle_SpecialCharacterWhiteSpace_ResultEscaped", function(done){
        var generator = new PostgresSqlGenerator(simpleConfig);
        generator.generateInsertQuery([{
                field1: "field1 and more'", 
                field2: 1,
                field3: false,
                field4: 1.5,
                field5: "field 5 with\t tab",
                field6: "field 6 in\nanother line \nand another"
            }
        ]);
        var sql = Array.from(generator).join('');
        console.log("TestGenerateInsertSingle_SpecialCharacterWhiteSpace_ResultEscaped: ", sql);
        var expectSql = "INSERT INTO schema_name.table_name(field1, field2, field3, field4, field5, field6) VALUES ('field1 and more''', '1', 'false', '1.5', 'field 5 with\t tab', 'field 6 in"
            + "\nanother line "
            + "\nand another');";
        assert.equal(expectSql, sql);
        done();
    });
    
    it("TestGenerateInsertSingle_SpecialCharacterPostgresOperator_ResultEscaped", function(done){
        var generator = new PostgresSqlGenerator(simpleConfig);
        generator.generateInsertQuery([{
                field1: "+ - * / < > = ~ ! @ # % ^ & | ` ?", 
                field2: 1,
                field3: false,
                field4: 1.5,
                field5: "$ $$ $$$ $$$$",
                field6: "~ ! @ # % ^ & | ` ?"
            }
        ]);
        var sql = Array.from(generator).join('');
        console.log("TestGenerateInsertSingle_SpecialCharacterPostgresOperator_ResultEscaped: ", sql);
        var expectSql = "INSERT INTO schema_name.table_name(field1, field2, field3, field4, field5, field6) VALUES"
            +" ('+ - * / < > = ~ ! @ # % ^ & | ` ?', '1', 'false', '1.5', '$ $$ $$$ $$$$', '~ ! @ # % ^ & | ` ?');";
        assert.equal(expectSql, sql);
        done();
    });

    it("TestGenerateInsertIntoPhrase_SQLInjection_ResultEscaped", function(done){
        var generator = new PostgresSqlGenerator(simpleConfig);
        generator.generateInsertQuery([{
                field1: "'; DROP TABLE schema_name.table_name;", 
                field2: 1,
                field3: false,
                field4: 1.5,
                field5: "College_Id=7 AND (SELECT LENGTH(current_database()))= 7",
                field6: "College_Id=7 AND (SELECT ascii(SUBSTR((SELECT table_name FROM information_schema.tables WHERE table_schema=current_schema() LIMIT 1 OFFSET 0),1,1)))>0"
            }
        ]);
        var sql = Array.from(generator).join('');
        console.log("TestGenerateInsertIntoPhrase_SQLInjection_ResultEscaped: ", sql);
        var expectSql = "INSERT INTO schema_name.table_name(field1, field2, field3, field4, field5, field6) VALUES"
            +" ('''; DROP TABLE schema_name.table_name;', '1', 'false', '1.5', 'College_Id=7 AND (SELECT LENGTH(current_database()))= 7'"
            +", 'College_Id=7 AND (SELECT ascii(SUBSTR((SELECT table_name FROM information_schema.tables WHERE table_schema=current_schema() LIMIT 1 OFFSET 0),1,1)))>0');";
        assert.equal(expectSql, sql);
        done();
    });

    it("TestGenerateInsertIntoPhrase_SpecialCharacterUnicode_ResultEscaped", function(done){
        var generator = new PostgresSqlGenerator(simpleConfig);
        generator.generateInsertQuery([{
                field1: "áàãạảäấẫầẩắẳẵ", 
                field2: 1,
                field3: false,
                field4: 1.5,
                field5: "多情劍客無情劍",
                field6: "กรรมตามสนอง"
            }
        ]);
        var sql = Array.from(generator).join('');
        console.log("TestGenerateInsertIntoPhrase_SpecialCharacterUnicode_ResultEscaped: ", sql);
        var expectSql = "INSERT INTO schema_name.table_name(field1, field2, field3, field4, field5, field6) VALUES"
            + " ('áàãạảäấẫầẩắẳẵ', '1', 'false', '1.5', '多情劍客無情劍', 'กรรมตามสนอง');";
        assert.equal(expectSql, sql);
        done();
    });

    it("TestGenerateInsert_NoSchema_CorrectResult", function(done){
        let simpleConfig = {
            fields:{
                "field1": {type: DATA_TYPE_TEXT, sqlField:'field1'},
                "field2": {type: DATA_TYPE_NUMBER, sqlField:'field2'}, 
                "field3": {type: DATA_TYPE_BOOLEAN, sqlField:'field3'},
                "field4": {type: DATA_TYPE_NUMBER, sqlField:'field4'},
                "field5": {type: DATA_TYPE_TEXT, sqlField:'field5'},
                "field6": {type: DATA_TYPE_TEXT, sqlField:'field6'}
            }
            , table: "table_name"
            , schema: ""

        }
        var generator = new PostgresSqlGenerator(simpleConfig);
        generator.generateInsertQuery([{
                field1: "field1", 
                field2: 1,
                field3: false,
                field4: 1.5,
                field5: "",
                field6: null
            }
        ]);
        var sql = Array.from(generator).join('');
        console.log("TestGenerateInsert_NoSchema_CorrectResult", sql);
        assert.equal(`INSERT INTO table_name(field1, field2, field3, field4, field5, field6) VALUES ('field1', '1', 'false', '1.5', '', NULL);`
            , sql);
        done();
    });

    it("TestGenerateInsertQueryMultiple_CorrectResult", function(done){
        console.info("TestGenerateInsertQueryMultiple_CorrectResult");
        
        
        var generator = new PostgresSqlGenerator(missionConfig);
        generator.generateInsertQuery(sampleMission);
        var sql = Array.from(generator);
        console.log("TestGenerateInsertQueryMultiple_CorrectResult: ", sampleMission.length, sql);
        assert.deepEqual(
            ["-- Hello World",
                'INSERT INTO game.mission(id, name, description, type, category, frequency, requirement_type, parameters, active, "level required") VALUES ',
                "('1', 'Win x time any game', 'Win in any game', '1', '0', '30', '1', 'NULL', 'true', '1'),",
                "('2', 'Play x time with any game', 'Play in any game', '1', '0', '35', '2', 'NULL', 'true', '2'),",
                "('3', 'Exchange gold', 'Exchange Gold from oncase x times with any game - any value accepted', '1', '0', '35', '3', 'NULL', 'true', '3');",
                "-- Bye World"
            ]
            , sql
        );
        done();
    });
    
    
});