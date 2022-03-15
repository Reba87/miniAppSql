const getStudent = {}

getStudent.student = (request, response) => {
    
    let sql;
    if(request.query.id == null) {
        sql ="SELEC * FROM students"
    } else {
        sql ="SELEC * FROM students WHERE id" + request.query.id;
    }
    connection.query(sql, function(err, result)
    {
        if(err) { console.log(err)}
        else {response.send(result);}
    })
}

module.exports = getStudent