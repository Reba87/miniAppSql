class student{

    // Declarando constructor y sus atributos //
    constructor (firts_name, last_name,grupo_id,admission_date,students_id)
                 {  
                     this.firts_name = firts_name;
                     this.last_name = last_name;
                     this.grupo_id = grupo_id;
                     this.admission_date = admission_date
                     this.students_id = students_id
                 }
}




function getStud(){
    
    let url = "http://localhost:5000/students";
    
    let param =
    {
        headers: {"Content-type": "application/json; charset=utf-8"},
        method: "GET"
    }

    let captureId = document.getElementById("getIdStud").value
    
    if(captureId != "") { 
        url =  "http://localhost:5000/students?id=" + captureId;
    }

    console.log(url)
   
    fetch(url,param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(result) {
        console.log(result);
         
        if (!result.error) {

            let mostrar = document.getElementById("tablaStud");
            mostrar.innerHTML = `<tr>
                                  
                                  <th>NAME</th>
                                  <th>LAST NAME</th>
                                  <th>GRUPO ID</th>
                                  <th>ADMISSION DATE</th>
                                 
                                </tr>`
            for (let student of result) 
            {
              mostrar.innerHTML +=`<tr>
                               
                                <td>${student.firts_name}</td>
                                <td>${student.last_name}</td>
                                <td>${student.grupo_id}</td>
                                <td>${student.admission_date}</td>                 
                                </tr>`
            }

       }
       else
       showToast("El estudiante no existe", "bg-danger")
    }) 

   .catch(function(error){
       console.log(error)
   })
  
}   



function postStud()
{
    let estudiante = new student (
        document.getElementById("firts_nameStud").value,
        document.getElementById("last_nameStud").value,
        document.getElementById("grupo_idStud").value,
        document.getElementById("admission_dateStud").value,
    )
        
    
    const url = "http://localhost:5000/students";
    console.log(JSON.stringify(estudiante));

    if(validar(estudiante)){

        let param =
    {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        body: JSON.stringify(estudiante),
        method: "POST"
    }


    
    fetch(url,param)
        .then(function(data){
            return data.json()
        })
        .then(function(result)
        {
            if(result.error)
            showToast("ERROR: " + result.message, "bg-danger");
            else
            showToast("Usuario creado correctamente", "bg-success");
            console.log(result);
        })
        .catch(function(error)
        {
            console.log(error)
        })
    }

    
}

function putStud(){  
let estudiante = new student (
    document.getElementById("firts_nameStud").value,
    document.getElementById("last_nameStud").value,
    document.getElementById("grupo_idStud").value,
    document.getElementById("admission_dateStud").value)

let id = document.getElementById("students_id").value

if(estudiante.firts_name == ""){
    estudiante.firts_name = null
}
if(estudiante.last_name == ""){
    estudiante.last_name = null
}
if(estudiante.grupo_id == ""){
    estudiante.grupo_id = null
}
if(estudiante.admission_date == ""){
    estudiante.admission_date = null
}
    
   console.log(document.getElementById("students_id").value)
    let url =  "http://localhost:5000/students?id=" + id
    
    
            let param =
            {
                headers: {"Content-type": "application/json; charset= UTF-8"},
                body: JSON.stringify(estudiante),
                method: "PUT"
            }
        
    if(students_id != "") { 
        console.log(url)

    fetch(url,param)
        .then(function(data){
            return data.json()
        })
        .then(function(result)
        {
            if(result.error)
            showToast("ERROR: " + result.message, "bg-danger");
            else
            showToast("Estudiante modificado correctamente", "bg-success");
            console.log(result);
        })
        .catch(function(error)
        {
            console.log(error)
        })
    } else showToast("Indique un ID valido", "bg-danger")

}

function deleteStud()
{
    
     
    let students_id = document.getElementById("students_id").value
    
    console.log(students_id)
    url =  "http://localhost:5000/students?id=" + students_id

  
    
    let param =
    {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        
        method: "DELETE"
    }

   
    if(students_id != "") { 
        console.log(url)

    fetch(url,param)
        .then(function(data){
            return data.json()
        })
        .then(function(result)
        {
            if(result.error)
            showToast("ERROR: " + result.message, "bg-danger");
            else
            showToast("Usuario ELIMINADO correctamente", "bg-success");
            console.log(result);
        })
        .catch(function(error)
        {
            console.log(error)
        })
    } else if (students_id == "") {showToast("Indique un ID valido", "bg-danger")}
    
    
}

//////////////////////////////////////////*MARKS*//////////////////////////////////////////////////

class marks{

    // Declarando constructor//
    constructor (student_id, subject_id,date,mark)
                 {  
                     this.student_id = student_id;
                     this.subject_id = subject_id;
                     this.date = date;
                     this.mark = mark;
                 }
}




function getMarks(){
    
    let url = "http://localhost:5000/marks";
    
    let param =
    {
        headers: {"Content-type": "application/json; charset=utf-8"},
        method: "GET"
    }

    let marks_id = document.getElementById("getIdMarks").value
    
    if(marks_id != "") { 
        url =  "http://localhost:5000/marks?id=" + marks_id;
    }

    console.log(url)
   
    fetch(url,param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(result) {
        console.log(result);
         
        if (!result.error) {

            let mostrar = document.getElementById("tablaMarks");
            mostrar.innerHTML = `<tr>
                                  
                                  <th>STUDENT ID</th>
                                  <th>SUBJECT ID</th>
                                  <th>DATE</th>
                                  <th>MARK</th>
                                  
                                 
                                </tr>`
            for (let nota of result) 
            {
              mostrar.innerHTML +=`<tr>
                               
                                <td>${nota.student_id}</td>
                                <td>${nota.subject_id}</td>
                                <td>${nota.date}</td>
                                <td>${nota.mark}</td>                 
                                </tr>`
            }

       }
       else
       showToast("The mark does`t exist", "bg-danger")
    }) 

   .catch(function(error){
       console.log(error)
   })
  
}   



function postMarks()
{
    let nota = new marks (
        document.getElementById("studen_id").value,
        document.getElementById("subject_id").value,
        document.getElementById("dateMark").value,
        document.getElementById("mark").value,
    )
        
    
    const url = "http://localhost:5000/marks";
    console.log(JSON.stringify(nota));

    if(validarMarks(nota)){

        let param =
    {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        body: JSON.stringify(nota),
        method: "POST"
    }


    
    fetch(url,param)
        .then(function(data){
            return data.json()
        })
        .then(function(result)
        {
            if(result.error)
            showToast("ERROR: " + result.message, "bg-danger");
            else
            showToast("Marks uploaded correctly", "bg-success");
            console.log(result);
        })
        .catch(function(error)
        {
            console.log(error)
        })
    }

    
}

function putMarks(){  
    let nota = new marks (
        document.getElementById("studen_id").value,
        document.getElementById("subject_id").value,
        document.getElementById("dateMark").value,
        document.getElementById("mark").value
    )

let marks_id = document.getElementById("idMarks").value

if(nota.student_id == ""){
    nota.student_id = null
}
if(nota.subject_id == ""){
    nota.subject_id = null
}
if(nota.date == ""){
    nota.date = null
}
if(nota.mark == ""){
    nota.mark = null
}
    
   console.log(document.getElementById("idMarks").value)
    let url =  "http://localhost:5000/marks?id=" + marks_id
    
    
            let param =
            {
                headers: {"Content-type": "application/json; charset= UTF-8"},
                body: JSON.stringify(nota),
                method: "PUT"
            }
        
    if(marks_id != "") { 
        console.log(url)

    fetch(url,param)
        .then(function(data){
            return data.json()
        })
        .then(function(result)
        {
            if(result.error)
            showToast("ERROR: " + result.message, "bg-danger");
            else
            showToast("Mark modified successfully", "bg-success");
            console.log(result);
        })
        .catch(function(error)
        {
            console.log(error)
        })
    } else showToast("Indicate a valid ID", "bg-danger")

}

function deleteMarks()
{
    
     
    let student_id = document.getElementById("idMarks").value
    
    console.log(students_id)
    url =  "http://localhost:5000/marks?id=" + student_id

  
    
    let param =
    {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        
        method: "DELETE"
    }

   
    if(students_id != "") { 
        console.log(url)

    fetch(url,param)
        .then(function(data){
            return data.json()
        })
        .then(function(result)
        {
            if(result.error)
            showToast("ERROR: " + result.message, "bg-danger");
            else
            showToast("Indicated ID deleted successfully", "bg-success");
            console.log(result);
        })
        .catch(function(error)
        {
            console.log(error)
        })
    } else if (students_id == "") {showToast("Indicate a valid ID", "bg-danger")}
    
    
}







//////////////////////////////////////////*INFORMACION*//////////////////////////////////////////////////

function GetMedia(){
    
    let url = "http://localhost:5000/media";
    
    let param =
    {
        headers: {"Content-type": "application/json; charset=utf-8"},
        method: "GET"
    }

    let info_id = document.getElementById("idInfo").value
    
    if(info_id != "") { 
        url =  "http://localhost:5000/media?id=" + info_id;
    }

    console.log(url)
   
    fetch(url,param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(result) {
        console.log(result);
         
        if (!result.error) {

            let mostrar = document.getElementById("tablaInfo");
            mostrar.innerHTML = `<tr>
                                  
                                  <th>AVERAGE</th>
                                  <th>STUDENT ID</th>
                                  </tr>`
            for (let average of result) 
            {
              mostrar.innerHTML +=`<tr>
                               
                                <td>${average.average}</td>
                                <td>${average.student_id}</td>
                                                
                                </tr>`
            }

       }
       else
       showToast("The mark does`t exist", "bg-danger")
    }) 

   .catch(function(error){
       console.log(error)
   })
  
}   
function Getapunta(){
    
    let url = "http://localhost:5000/apuntadas";
    
    let param =
    {
        headers: {"Content-type": "application/json; charset=utf-8"},
        method: "GET"
    }

    let info_id = document.getElementById("idInfo").value
    
    if(info_id != "") { 
        url =  "http://localhost:5000/apuntadas?id=" + info_id;
    }

    console.log(url)

   
    fetch(url,param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(result) {
        console.log(result);
         
        if (!result.error) {

            let mostrar = document.getElementById("tablaInfo");
            mostrar.innerHTML = `<tr>
                                  
                                  <th>FIRST NAME</th>
                                  <th>LAST NAME</th>
                                  <th>SUBJECT</th>
                                  </tr>`
            for (let apuntada of result) 
            {
              mostrar.innerHTML +=`<tr>
                               
                                <td>${apuntada.firts_name}</td>
                                <td>${apuntada.last_name}</td>
                                <td>${apuntada.title}</td>
                                                
                                </tr>`
            }

       }
       else
       showToast("The mark does`t exist", "bg-danger")
    }) 

   .catch(function(error){
       console.log(error)
   })

 
    
  
}  

function GetImparti(){
    
    let url = "http://localhost:5000/impartidas";
    
    let param =
    {
        headers: {"Content-type": "application/json; charset=utf-8"},
        method: "GET"
    }

    let info_id = document.getElementById("idInfo").value
    
    if(info_id != "") { 
        url =  "http://localhost:5000/impartidas?id=" + info_id;
    }

    console.log(url)

   
  
    fetch(url,param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(result) {
        console.log(result);
         
        if (!result.error) {

            let mostrar = document.getElementById("tablaInfo");
            mostrar.innerHTML = `<tr>
                                  
                                  <th>FIRST NAME</th>
                                  <th>LAST NAME</th>
                                  <th>SUBJECT</th>
                                  </tr>`
            for (let apuntada of result) 
            {
              mostrar.innerHTML +=`<tr>
                               
                                <td>${apuntada.first_name}</td>
                                <td>${apuntada.last_name}</td>
                                <td>${apuntada.title}</td>
                                                
                                </tr>`
            }

       }
       else
       showToast("The mark does`t exist", "bg-danger")
    }) 

   .catch(function(error){
       console.log(error)
   })

 
    
  
}  




//////////////////////////////////////////*VALIDADORES*//////////////////////////////////////////////
function validarMarks(nota){
    resutado = false
    if (nota.student_id == "" || nota.student_id =="null") {
        showToast("Enter a name", "bg-warning")
    }
    else if (nota.subject_id == "" || nota.subject_id =="null") {
        showToast("Enter a last name", "bg-warning")
    }
    else if (nota.date == "" || nota.date =="null") {
        showToast("Enter a group id", "bg-warning")
    }
    else if (nota.mark == "" || nota.mark =="null") {
        showToast("Enter an admission date", "bg-warning")
    }
    else 
    resultado = true

    return resultado;
}


function validar(student){
    resutado = false
    if (student.firts_name == "" || student.firts_name =="null") {
        showToast("Enter a name", "bg-warning")
    }
    else if (student.last_name == "" || student.last_name =="null") {
        showToast("Enter a last name", "bg-warning")
    }
    else if (student.grupo_id == "" || student.grupo_id =="null") {
        showToast("Enter a group id", "bg-warning")
    }
    else if (student.admission_date == "" || student.admission_date =="null") {
        showToast("Enter an admission date", "bg-warning")
    }
    else 
    resultado = true

    return resultado;
}
//////////////////////////////////////////*TOAST*//////////////////////////////////////////////////
function showToast(message, color)
{
    document.getElementById("toastText").innerText=message;
    let toastElement  = document.getElementById('toast')
    toastElement.className = toastElement.className.replace("bg-warning").replace("bg-danger") + " "  + color;
    console.log(toastElement);
    let toast = new bootstrap.Toast(toastElement)
    toast.show()
}