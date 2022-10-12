var n,s,f,a1,b3,cv,a,p,d

function gather_info_hs(){
    n = document.getElementById("bus_num").value;
    s = document.getElementById("bus_nam").value;
    f = document.getElementById("bus_j_nam").value;
}
function gather_info(){
    a = document.getElementById('name').value;
    p = document.getElementById("Num").value;
    d = document.getElementById("Add").value;
}

function Go(){
    gather_info()
    firebase
    .database()
    .ref("Fathers/"+a+"/")
    .set({
       'Phone Number':p,
       'Address':d
    });
    document.getElementById("f").innerHTML = "Father: "+a;
    document.getElementById("p").innerHTML = "Phone Number: "+p;
    document.getElementById("a").innerHTML = "Address: "+d;
    document.getElementById("clo").click()
}

function Show_All(){
   firebase
   .database()
   .ref("Fathers/")
   .on("value",(snap)=>{
    a1 = snap.val();
    let c1 = Object.keys(a1)
    document.getElementById("m-body").innerHTML =   c1;
   })
} 

function Search(){
    firebase
    .database()
    .ref("Fathers/")
    .on("value",(snap)=>{
     a1 = snap.val();
     let search = document.getElementById("SRCH").value.toUpperCase();
     let len = Object.keys(a1).length;
     for(let i=0; i<len; i++){
       let kk = Object.keys(a1)[i]
       let jj = kk.toUpperCase();
       if(jj.indexOf(search) > -1){
        document.getElementById("opn").click();
        document.getElementById('m1-body').innerHTML = Object.keys(a1)[i]+": "+JSON.stringify(a1[ Object.keys(a1)[i]]);
       }
       
     }
     
    });

 
}

function warn(msg){
alert(msg)
}
function Go_student(){
    gather_info_hs()
    firebase
    .database()
    .ref("Fathers/")
    .on("value",(snap)=>{
     a1 = snap.val();
     let search = f.toUpperCase();
     let len = Object.keys(a1).length;
     for(let i=0; i<len; i++){
       let kk = Object.keys(a1)[i]
       let jj = kk.toUpperCase();
       if(jj.indexOf(search) > -1){
        agree()
        break
       }
       
     }
     
    });
    function agree(){
        firebase
    .database()
    .ref("Students/"+s+"/")
    .set({
       'FatherName':f,
       'Bus Number':n
    });
    document.getElementById("f").innerHTML = "Student Name: "+s;
    document.getElementById("p").innerHTML = "Fathers Name: "+f;
    document.getElementById("a").innerHTML = "Bus Number: "+n;
    document.getElementById("clo").click()
    }
}

function Show_All_Student(){
    firebase
    .database()
    .ref("Students/")
    .on("value",(snap)=>{
     a1 = snap.val();
     let c1 = Object.keys(a1)
     document.getElementById("m-body").innerHTML =   c1;
    })
}
function search_s3(){
    firebase
    .database()
    .ref("Students/")
    .on("value",(snap)=>{
     a1 = snap.val();
     let search = document.getElementById("SRCH").value.toUpperCase();
     let len = Object.keys(a1).length;
     for(let i=0; i<len; i++){
       let kk = Object.keys(a1)[i]
       let jj = kk.toUpperCase();
       if(jj.indexOf(search) > -1){
        agree()
        break
       }
       function agree(){
        firebase
        .database()
        .ref("Students/"+kk+"/")
        .on('value',(snap)=>{
            console.log(snap.val().FatherName)
            cv = snap.val().FatherName;
            firebase
            .database()
            .ref('Fathers/'+cv+"/")
            .on('value',(snap)=>{
            b3 = snap.val()
            document.getElementById('opn').click()
            document.getElementById("m1-body").innerHTML = cv+": "+JSON.stringify(b3);
            console.log(b3)
            })
        })
       }
     }
     
    });

 
}