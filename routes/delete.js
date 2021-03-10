let express = require('express');
let router = express.Router();

const con = require('./db.js');
const conn = con.init();
con.open(conn);
router.post('/:num', function (req, res) {
    const userId = req.body.userId;
    const num = req.params.num;

    if (userId == null || num == null) {
        const r = {
            status: "FORMAT_ERROR"
        }
        res.set('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify(r));
        return;
    }

    let pst = "DELETE FROM blog WHERE id = '?' AND num = '?';"
    let values = [userId, num];

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
