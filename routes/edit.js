let express = require('express');
let router = express.Router();

const con = require('./db.js');
const conn = con.init();
con.open(conn);
router.post('/:num', function (req, res) {

    const num = req.params.num;
    const new_sub = req.body.subject;
    const new_body = req.body.text;


    if (new_sub == null || new_body == null) {
        const r = {
            status: "FORMAT_ERROR"
        }
        res.set('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify(r));
        return;
    }

    let pst = "UPDATE blog SET subject = '?', body = '?' WHERE num = '?';"
    let values = [new_sub,new_body, num];

    conn.query(pst,values,function(err,results,fields){
        if(err){
            const r = {
                status: "CANNOT_FOUND"
            }
            res.set('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(r));
        }else{
            const r = {
                status: "SUCCESS"
            }
            res.set('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(JSON.stringify(r));
        }
    });

});

module.exports = router;
