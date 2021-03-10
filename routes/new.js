let express = require('express');
let router = express.Router();

const con = require('./db.js');
const conn = con.init();
con.open(conn);
router.post('/:id', function (req, res) {

    const id = req.params.id;
    const sub = req.body.subject;
    const body = req.body.text;


    if (sub == null || body == null) {
        const r = {
            status: "FORMAT_ERROR"
        }
        res.set('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify(r));
        return;
    }

    let pst = "INSERT INTO blog(userid,subject,body) VALUES(?,?,?);";
    let values = [id,sub,body];

    conn.query(pst,values,function(err,results,fields){
        if(err){
            const r = {
                status: "ALREADY_EXISTS"
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
