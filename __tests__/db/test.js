var odbc = require("node-odbc");
var util = require('util');

var db = new odbc.Database();
var cs = "DSN=<(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=mypagetest-db)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=test.mypage)))>;UID=<mypagesd>;PWD=<mypagesd>";
db.open(cs, function(err){
    var sql = "select foo, bar from HOGE";
    db.query(sql, function(err, rows, rs){
        //console.log(rows);
        var i=0;
        for (i=0; i<rows.length; i++) {
            console.log([
                i,
                rows[i]["foo"],
                rows[i]["bar"]
            ].join(", "));
        }

        db.close(function(){
            console.log("close.");
        });
    });
});