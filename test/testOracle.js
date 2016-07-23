var oracledb = require("oracledb");

oracledb.getConnection(
    {
        user: 'system',
        password: 'oracle',
        connectString: 'cd/XE'
    },
    function (err, connection) {
        if (err) {
            return console.error(err.message);
        }
        // connection.execute('select * from AAA201KC where 成本价 = :price ', [0.01],  function (err, result) {
        connection.execute('show database',  function (err, result) {
            if(err) {
                return console.error(err.message);
            }
            console.log(result);
        });
    }
);
