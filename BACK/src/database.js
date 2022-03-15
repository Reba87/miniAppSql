let mysql = require("mysql2")
let conection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'reba1302',
        database: `reto_2`,
        
    });

conection.connect(function (error){
    if (error) {
        console.error(error)
    } else{
        console.log("conexion correcta.")
    }
})

