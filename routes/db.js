const mysqlClient = require('mysql');

const conf = {
    init: function(){
        return mysqlClient.createConnection({
            host: 'localhost',
            port: 99,
            user:'user',
            password:'pass',
            database: 'db',
        });
    },
    open: function(con){
        con.connect(function(err){
           if(err){
               console.error('err');
           }
        });
    }
}
module.exports = conf;