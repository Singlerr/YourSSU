

let express = require('express');
let app = express();
let http = require('http');




let viewRouter = require('./routes/view.js');
let editRouter = require('./routes/edit.js');
let deleteRouter = require('./routes/delete.js');
let newRouter = require('./routes/new.js');
let listRouter = require('./routes/list.js');


app.use('/edit', editRouter);
app.use('/delete', deleteRouter);
app.use('/new',newRouter);
app.use('/view',viewRouter);
app.use('/list',listRouter);

/*
 DB 설정:
 columns: userid, num(auto_increment), subject, body
 */


http.createServer(app).listen(80,"localhost");
