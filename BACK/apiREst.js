let express = require('express');
let app = express();
let cors = require('cors');
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

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());



/*ESTUDIANTE*/ 

app.get("/students",
function(request, response){
    let sql;
    if (request.query.id == null){
        sql = "SELECT * FROM students"
    } else
        sql ="SELECT * FROM reto_2.students WHERE students_id =" + request.query.id;

        conection.query(sql, function(err,result)
     {
            if (err)
            console.log(err);
            else
            {
                response.send(result)
            }
     })
     console.log(sql);
})


app.post(`/students`, function (request, response) {
    console.log(request.body);

    let params = [name = request.body.firts_name, last_name = request.body.last_name, 
        grupo = request.body.grupo_id, admission = request.body.admission_date]
    let sql = "INSERT INTO students (firts_name, last_name, grupo_id, admission_date)" +
    "VALUES ('" + name + "', '" + 
                  last_name + "', '" +
                  grupo + "', '" +
                  admission + "')"

                console.log(sql)
    conection.query(sql,params, function(err, result) {
        if (err) { console.log(err) }
        else {
            console.log(result)
            if(result.students_id)
            response.send(String(result.insertId));
            else
            response.send("-1")
        }
    })
          
});

app.put("/students", 
        function(request, response)
        {
            console.log(request.body);
            
          let params = [

          
              request.body.firts_name,
              request.body.last_name,
              request.body.grupo_id,
              request.body.admission_date,
              request.query.id
            ]

            let sql = "UPDATE students SET firts_name = COALESCE(?, firts_name) , " + 
                       "last_name = COALESCE(?, last_name) , " + 
                       "grupo_id = COALESCE(?, grupo_id) , " + 
                       "admission_date = COALESCE(?, admission_date)  WHERE students_id = ?"
                       
             console.log(params)
            conection.query(sql,params, function (err, result) 
            { 
                if (err) 
                    console.log(err);
                else 
                {   console.log(sql)
                   
                    response.send(result);
                    
                }
            })
        }
        ); 
        
        app.delete("/students/", 
        function(request, response) {    
           
           
            let sql = "DELETE FROM students WHERE students_id ='" + request.query.id + "'";
            console.log(request.query.id);
            console.log(sql); 
            conection.query(sql,function (err, result) 
            {
                if (err) 
                    console.log(err);
                else 
                {
                    response.send(result);
                   
                }
            })
        }
        );  


 //////////////////////////////*MARKS*///////////////////////////////////////////////////

 app.get("/marks",
function(request, response){
    let sql;
    if (request.query.id == null){
        sql = "SELECT * FROM marks"
    } else
        sql ="SELECT * FROM reto_2.marks WHERE student_id =" + request.query.id;

        conection.query(sql, function(err,result)
     {
            if (err)
            console.log(err);
            else
            {
                response.send(result)
            }
     })
     console.log(sql);
})


app.post(`/marks`, function (request, response) {
    console.log(request.body);

    let params = [students = request.body.student_id, subject = request.body.subject_id, 
        dateM = request.body.date, mark = request.body.mark]
    let sql = "INSERT INTO marks (student_id, subject_id, date, mark)" +
    "VALUES ('" + students + "', '" + 
                  subject + "', '" +
                  dateM + "', '" +
                  mark + "')"
    
    console.log(params);
    console.log(sql)
    conection.query(sql,params, function(err, result) {
        if (err) { console.log(err) }
        else {
            console.log(result)
            if(result.students_id)
            response.send(String(result.insertId));
            else
            response.send("-1")
        }
    })
          
});

app.put("/marks", 
        function(request, response)
        {
            console.log(request.body);
            
          let params = [

          
              request.body.student_id,
              request.body.subject_id,
              request.body.date,
              request.body.mark,
              request.query.id
            ]

            let sql = "UPDATE marks SET student_id = COALESCE(?, student_id) , " + 
                       "subject_id = COALESCE(?, subject_id) , " + 
                       "date = COALESCE(?, date) , " + 
                       "mark = COALESCE(?, mark)  WHERE student_id = ?"
                       
             console.log(params)
            conection.query(sql,params, function (err, result) 
            { 
                if (err) 
                    console.log(err);
                else 
                {   console.log(sql)
                   
                    response.send(result);
                    
                }
            })
        }
        ); 
        
        app.delete("/marks", 
        function(request, response) {    
           
           
            let sql = "DELETE FROM marks WHERE student_id ='" + request.query.id + "'";
            console.log(request.query.id);
            console.log(sql); 
            conection.query(sql,function (err, result) 
            {
                if (err) 
                    console.log(err);
                else 
                {
                    response.send(result);
                   
                }
            })
        }
        );  

 //////////////////////////////*INOFRMACION*///////////////////////////////////////////////////

app.get("/media",
function(request, response){
    let sql;

    if (request.query.id == null){
        sql = "SELECT AVG(mark) AS average FROM marks"
    } else
        sql ="SELECT AVG(mark) AS average,student_id FROM marks WHERE subject_id =" + request.query.id;

        conection.query(sql, function(err,result)
     {
            if (err)
            console.log(err);
            else
            {
                response.send(result)
                console.log(result);
            }
     })
     console.log(sql);
     
})

app.get("/apuntadas",
function(request, response){
    let sql;

    if (request.query.id == null){
        sql = "SELECT firts_name, last_name,title FROM students JOIN marks ON (students.students_id = marks.student_id) JOIN subjects ON (marks.subject_id = subjects.id)"
    } else
        sql = "SELECT firts_name, last_name,title FROM students JOIN marks ON (students.students_id = marks.student_id) JOIN subjects ON (marks.subject_id = subjects.id) WHERE students_id =" + request.query.id;


    conection.query(sql, function(err,result)
     {
            if (err)
            console.log(err);
            else
            {
                response.send(result)
                console.log(result);
            }
     })
     console.log(sql);
     
})

app.get("/impartidas",
function(request, response){

    let sql;

    if (request.query.id == null){
        sql = "SELECT first_name, last_name,title FROM teacher JOIN subject_teacher ON (teacher.id = subject_teacher.id_subject) JOIN subjects ON (subject_teacher.id_subject = subjects.id);"
    } else
        sql ="SELECT first_name, last_name,title FROM teacher JOIN subject_teacher ON (teacher.id = subject_teacher.id_subject) JOIN subjects ON (subject_teacher.id_subject = subjects.id) WHERE subject_teacher.id_teacher =" + request.query.id


    

    conection.query(sql, function(err,result)
     {
            if (err)
            console.log(err);
            else
            {
                response.send(result)
                console.log(result);
            }
     })
     console.log(sql);
     
})

app.listen(5000);