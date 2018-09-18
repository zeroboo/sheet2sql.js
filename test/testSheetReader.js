const SheetReader = require("../src/SheetReader");
const assert = require('assert');
const DATA_TYPE_TEXT = require('./../src/SqlFieldConfig').DATA_TYPE_TEXT;
const DATA_TYPE_NUMBER = require('./../src/SqlFieldConfig').DATA_TYPE_NUMBER;
const DATA_TYPE_BOOLEAN = require('./../src/SqlFieldConfig').DATA_TYPE_BOOLEAN;

describe("TestReadExcel", function(){
    var missionConfig;
    before(function(done){
        missionConfig = {
                fields: {
                    id: {type: DATA_TYPE_TEXT}
                    , name: {type: DATA_TYPE_TEXT}
                    , description: {type: DATA_TYPE_TEXT}
                    , type: {type: DATA_TYPE_NUMBER}
                    , category: {type: DATA_TYPE_NUMBER}
                    , frequency: {type: DATA_TYPE_TEXT}
                    , requirement_type: {type: DATA_TYPE_TEXT}
                    , parameters: {type: DATA_TYPE_TEXT}
                    , active: {type: DATA_TYPE_BOOLEAN}
                    , unreal: {type: DATA_TYPE_BOOLEAN}
                }
                , filter: function(row){
                    console.log("Filtering", row);
                    return row.description.indexOf("Win")>-1;
                }
        };
        done();
    });
    after(function(done){
        done();
    });

    it("TestReadWorkbook_CorrectSheetNamess", function(done){
        console.info("--- TestReadWorkbook_CorrectSheetNamess");
        var reader = new SheetReader();
        reader.readFile("./test/mission.xlsx");
        console.log(reader.getSheetnames());
        assert.deepEqual([ 'Mission', 'MissionLevel', 'Reference' ], reader.getSheetnames());
        done();
    });
    it("TestReadRows_InvalidSheetName_Error", function(done){
        console.info("--- TestReadRows_InvalidSheetName_Error");
        var reader = new SheetReader();
        reader.readFile("./test/mission.xlsx");
        assert.throws(()=>{reader.readRows("invalidSheet")}, Error, "Invalid sheet name: invalidSheet");
        
        done();
    });
    it("TestReadRows_NoConfig_ReturnEmpty", function(done){
        console.info("--- TestReadRows_NoConfig_ReturnEmpty");
        var reader = new SheetReader();
        reader.readFile("./test/mission.xlsx");
        var rows = reader.readRows("Mission");
        assert.equal(0, rows.length);

        rows = reader.readRows("MissionLevel");
        assert.equal(0, rows.length);

        rows = reader.readRows("MissionLevel");
        assert.equal(0, rows.length);
        
        done();
    });
    
    
    it("TestReadRows_SingleValuePerRow_CorrectRowCount", function(done){
        console.info("--- TestReadRows_SingleValuePerRow_CorrectRowCount");
        var reader = new SheetReader("./test/mission.xlsx");
        reader.read();
        let missionConfig = {
                fields: {'id': {'type':'number'}
            }
        };
        
        
        var rows = reader.readRows("Mission", missionConfig);
        assert.equal(27, rows.length);

        // rows = reader.readRows("MissionLevel");
        // assert.equal(27, rows.length);

        // rows = reader.readRows("MissionLevel");
        // assert.equal(27, rows.length);
        
        done();
    });
    
    it("TestReadRows_MultipleValuesPerRow_CorrectRowCount", function(done){
        console.info("--- TestReadRows_MultipleValuesPerRow_CorrectRowCount");
        var reader = new SheetReader("./test/mission.xlsx");
        reader.read();
        let missionConfig = {
                fields: {id: {type: DATA_TYPE_TEXT}
                    , name: {type: DATA_TYPE_TEXT}
                    , description: {type: DATA_TYPE_TEXT}
                    , type: {type: DATA_TYPE_TEXT}
                    , category: {type: DATA_TYPE_TEXT}
                    , frequency: {type: DATA_TYPE_TEXT}
                    , requirement_type: {type: DATA_TYPE_TEXT}
                    , parameters: {type: DATA_TYPE_TEXT}
                    , active: {type: DATA_TYPE_TEXT}

            }
        };
        
        var rows = reader.readRows("Mission", missionConfig);
        assert.equal(27, rows.length);

        done();
    });
    
    it("TestReadRows_TextValues_CorrectFieldExtracted", function(done){
        console.info("--- TestReadRows_TextValues_CorrectFieldExtracted");
        var reader = new SheetReader("./test/mission.xlsx");
        reader.read();
        let missionConfig = {
                fields: {id: {type: DATA_TYPE_TEXT}
                    , name: {type: DATA_TYPE_TEXT}
                    , description: {type: DATA_TYPE_TEXT}
                    , type: {type: DATA_TYPE_TEXT}
                    , category: {type: DATA_TYPE_TEXT}
                    , frequency: {type: DATA_TYPE_TEXT}
                    , requirement_type: {type: DATA_TYPE_TEXT}
                    , parameters: {type: DATA_TYPE_TEXT}
                    , active: {type: DATA_TYPE_TEXT}

            }
        };
        
        var rows = reader.readRows("Mission", missionConfig);
        
        rows.forEach(function(row, index){
            ///console.debug("Loaded row: ", index, row);
            
            ///Has correct fields number
            assert.equal(Object.keys(missionConfig.fields).length, Object.keys(row).length);
            assert.deepEqual(Object.keys(missionConfig.fields), Object.keys(row));
        });
        assert.equal(27, rows.length);
        done();
    });
    it("TestReadRows_MultipleTypes_CorrectFieldExtracted", function(done){
        console.info("--- TestReadRows_MultipleTypes_CorrectFieldExtracted");
        var reader = new SheetReader("./test/mission.xlsx");
        reader.read();
        let missionConfig = {
                fields: {id: {type: DATA_TYPE_TEXT}
                    , name: {type: DATA_TYPE_TEXT}
                    , description: {type: DATA_TYPE_TEXT}
                    , type: {type: DATA_TYPE_NUMBER}
                    , category: {type: DATA_TYPE_NUMBER}
                    , frequency: {type: DATA_TYPE_TEXT}
                    , requirement_type: {type: DATA_TYPE_TEXT}
                    , parameters: {type: DATA_TYPE_TEXT}
                    , active: {type: DATA_TYPE_BOOLEAN}

            }
        };
        
        var rows = reader.readRows("Mission", missionConfig);
        
        rows.forEach(function(row, index){
            
            ///Has correct fields number
            assert.equal(Object.keys(missionConfig.fields).length, Object.keys(row).length);
            assert.deepEqual(Object.keys(missionConfig.fields), Object.keys(row));
        });
        assert.equal(27, rows.length);
        done();
    });

    
    it("TestReadRows_WithNumberFilter_CorrectTypeExtracted", function(done){
        console.info("--- TestReadRows_WithNumberFilter_CorrectTypeExtracted");
        var reader = new SheetReader("./test/mission.xlsx");
        reader.read();
        let missionConfig = {
                fields: {
                    id: {type: DATA_TYPE_TEXT}
                    , name: {type: DATA_TYPE_TEXT}
                    , description: {type: DATA_TYPE_TEXT}
                    , type: {type: DATA_TYPE_NUMBER}
                    , category: {type: DATA_TYPE_NUMBER}
                    , frequency: {type: DATA_TYPE_TEXT}
                    , requirement_type: {type: DATA_TYPE_TEXT}
                    , parameters: {type: DATA_TYPE_TEXT}
                    , active: {type: DATA_TYPE_BOOLEAN}
                }
                , filter: (row) =>{
                    return row.id >= 10 && row.id < 20;
                }
        };
        var rows = reader.readRows("Mission", missionConfig);
        assert.equal(10, rows.length);
        ///Test if result is correct
        rows.forEach(function(row){
            assert.ok(row.id >= 10 && row.id < 20);
        });
        ///console.log("Rows:", rows);
        done();
    });
    it("TestReadRows_WithTextFilter_CorrectTypeExtracted", function(done){
        console.info("--- TestReadRows_WithTextFilter_CorrectTypeExtracted");
        var reader = new SheetReader("./test/mission.xlsx");
        reader.read();
        
        let missionConfig = {
                fields: {
                    id: {type: DATA_TYPE_TEXT}
                    , name: {type: DATA_TYPE_TEXT}
                    , description: {type: DATA_TYPE_TEXT}
                    , type: {type: DATA_TYPE_NUMBER}
                    , category: {type: DATA_TYPE_NUMBER}
                    , frequency: {type: DATA_TYPE_TEXT}
                    , requirement_type: {type: DATA_TYPE_TEXT}
                    , parameters: {type: DATA_TYPE_TEXT}
                    , active: {type: DATA_TYPE_BOOLEAN}
                }
                , filter: function(row){
                    console.log("Filtering", row);
                    return row.description.indexOf("Win")>-1;
                }
        };
        var rows = reader.readRows("Mission", missionConfig);
        assert.equal(13, rows.length);

        rows.forEach(function(row){
            assert.ok(row.description.indexOf("Win")>-1);
        });
        done();
    });

    it("TestReadRows_FieldsNotFoundInSheet_NullValueFilled", function(done){
        console.info("--- TestReadRows_WithTextFilter_CorrectTypeExtracted");
        var reader = new SheetReader("./test/mission.xlsx");
        reader.read();
        var rows = reader.readRows("Mission", missionConfig);
        assert.equal(13, rows.length);

        rows.forEach(function(row){
            assert.ok(row.hasOwnProperty('unreal'));
            assert.equal(null, row.unreal);
        });
        done();
    });
});