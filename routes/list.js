let express = require('express');
let router = express.Router();

const con = require('./db.js');
const conn = con.init();
con.open(conn);
router.post('/:id', function (req, res) {

    const userId = req.params.id;

    if (userId == null) {
        const r = {
            status: "FORMAT_ERROR"
        }
        res.set('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify(r));
        return;
    }

    let pst = "SELECT * FROM blog WHERE userid = '?';";
    let values = [userId];

    conn.query(pst,values,function(err,results,fields){
        if(err){
            const r = {
                status: "NO_EXISTS"
            }
            res.set('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(r));
        }else{

            let jsonArray = new Array();

            results.forEach( index =>{
               let c = Object.assign({},index);
               let obj = {
                   subject: index.subject,
                   body: index.body
               };
               jsonArray.push(obj);
            });

            res.set('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(jsonArray));
        }
    });

});

module.exports = router;
