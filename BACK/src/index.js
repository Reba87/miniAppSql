const app = require('./app');

require("./database");

app.listen(app.get('port'),()=>{console.log(`server listen on port`, app.get('port'))});