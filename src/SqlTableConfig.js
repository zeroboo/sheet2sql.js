`use strict`
class SqlTableConfig {
    constructor() {
        this.rowFilter = null;
        this.startRow = ROW_RANGE_ALL;
        this.endRow = ROW_RANGE_ALL;            
        this.fields = [];
        this.schema = "";
        this.preInsertSql = "";
        this.postInsertSql = "";

    }
}


module.exports = SqlTableConfig;