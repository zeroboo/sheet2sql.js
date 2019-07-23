const assert = require('assert');
const exporter = require("./../");
describe("Test Sheet2Sql", function(){
    before(function(done){
            done();
        }
    );
    after(function(done){
        done();
    });

    it("testCreateDefaultConfig_Correct", function(){
        console.log("testCreateDefaultConfig_Correct");
        let defaultConfig = exporter.createDefaultConfig("sheetName", ["field1", "field2", "field3"]);
        console.log("DefaultConfig: ", defaultConfig);

        assert.equal("", defaultConfig.schema);
        assert.equal("sheetName", defaultConfig.table);
        assert.equal(3, Object.keys(defaultConfig.fields).length);

        assert.equal("text", defaultConfig.fields.field1.type);
        assert.equal("field1", defaultConfig.fields.field1.sqlField);

        assert.equal("text", defaultConfig.fields.field2.type);
        assert.equal("field2", defaultConfig.fields.field2.sqlField);

        assert.equal("text", defaultConfig.fields.field3.type);
        assert.equal("field3", defaultConfig.fields.field3.sqlField);

    });
});