let express = require('express');
let router = express.Router();

const con = require('./db.js');
const conn = con.init();
con.open(conn);
router.post('/:num', function (req, res) {

    const num = req.params.num;
    if (num == null) {
        const r = {
            status: "FORMAT_ERROR"
        }
        res.set('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify(r));
        return;
    }

    let pst = "SELECT * FROM blog WHERE num=?;";
    let values = [num];

    conn.query(pst,values,function(err,results,fields){
        if(err){
            const r = {
                status: "CANNOT_FOUND"
            }
            res.set('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(r));
        }else{
            let c = Object.assign({},results[0]);
            let json = {
                userid: c.userid,
                subject: c.subject,
                body: c.body
            };
            res.set('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(json));
        }
    });

});

module.exports = router;
