const PostgresSqlGenerator = require("../src/PostgresSqlGenerator");
const assert = require('assert');
const DATA_TYPE_TEXT = require('./../src/SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./../src/SqlFieldConfig').DATA_TYPE_NUMBER;
const DATA_TYPE_BOOLEAN = require('./../src/SqlFieldConfig').DATA_TYPE_BOOLEAN;

describe("TestGenerateSQLInsert", function(){
    var sampleMission;
    var missionConfig;
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

    it("TestQuoteFieldNameInInsertQuery_Correct", function(done){
        var generator = new PostgresSqlGenerator();
        assert.equal('"fieldname"', generator.quoteFieldNameInInsertQuery("fieldname"));
        done();
    });
    
    it("TestGenerateInsertIntoPhrase_FullOption_CorrectResult", function(done){
        var generator = new PostgresSqlGenerator();
        assert.equal('INSERT INTO schema_name.table_name("field1","field2","field3","field4") VALUES '
            , generator.generateInsertIntoPhrase("schema_name"
                , 'table_name'
                , ["field1", "field2", "field3", "field4"])
        );
        done();
    });
    it("TestGenerateInsertIntoPhrase_NoSchema_CorrectResult", function(done){
        var generator = new PostgresSqlGenerator();
        assert.equal('INSERT INTO table_name("field1","field2","field3","field4") VALUES '
            , generator.generateInsertIntoPhrase(""
                , 'table_name'
                , ["field1", "field2", "field3", "field4"])
        );
        done();
    });

    it("TestGenerateInsertQuery_CorrectResult", function(done){
        console.info("TestGenerateInsertQuery_CorrectResult");
        console.log("TestOnRows: ", sampleMission.length);
        
        var generator = new PostgresSqlGenerator(missionConfig);
        generator.generateInsertQuery(sampleMission);
        var sql = "";
        for(var line of generator)
        {
            sql += line + "\n";
        }
        console.debug("sql: \n", sql);
        


        assert.equal(
            ["-- Hello World"
            , 'INSERT INTO game.mission("id","name","description","type","category","frequency","requirement_type","parameters","active","level required") VALUES '
            , "('1','Win x time any game','Win in any game',1,0,30,1,'NULL',true,1),"
            , "('2','Play x time with any game','Play in any game',1,0,35,2,'NULL',true,2),"
            , "('3','Exchange gold','Exchange Gold from oncase x times with any game - any value accepted',1,0,35,3,'NULL',true,3);"
            , "-- Bye World\n"].join('\n')
            , sql
        );
        done();
    });
    
    
});