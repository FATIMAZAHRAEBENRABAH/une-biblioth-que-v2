const Ajouter=document.getElementById("Ajouter");
const Titre= document.getElementById("Titre");
const Auteur= document.getElementById("Auteur");
const Prix = document.getElementById("Prix");
const Email = document.getElementById("Email");
const date = document.getElementById("Date");
const option  = document.getElementById("option"); 
// const rbs = document.querySelector("input[name='owen']:checked").value;
const bodytable  = document.getElementById("bodyy"); 
const edit =document.getElementById("update");
class Library{

    constructor(id,Titre,Auteur,Prix,Email,date,option)
    {
        this.id=id;
        this.Titre=Titre;
        this.Auteur=Auteur;
        this.Prix=Prix;
        this.Email=Email;
        this.date=date;
        this.option=option;
        console.log(this.rbs);
    }

// show data  html

   displayData(){
    Library.showdHtml(this.id,this.Titre,this.Auteur,
        this.Prix,this.Email,this.date,this.option)
     return this;
    }





// stockage in local storage 
    storage()
    {
        const dataa =JSON.parse(localStorage.getItem("Library")) ?? [];
        dataa.push({
             id:this.id,
             Titre:this.Titre,
             Auteur:this.Auteur,
             Prix:this.Prix,
             Email:this.Email,

             date:this.date,
             option:this.option,
         })
          localStorage.setItem("Library",JSON.stringify(dataa))
    }



    // show data storage 
     static  showdata()
    {
        if(localStorage.getItem("Library"))
        {
         JSON.parse(localStorage.getItem("Library")).forEach((element) => {
            Library.showdHtml(element.id,element.Titre,element.Auteur,
                element.Prix,element.Email,element.date,element.option)
         })
 
 
        }
    }





   static showdHtml(id,Titre,Auteur,Prix,Email,date,option)
 {
     
    const trlm=document.createElement("tr");
    trlm.innerHTML=
     `<tr>
     <td>${Titre}</td>
     <td>${Auteur}</td>
     <td>${Prix}</td>
     <td>${Email}</td>
     <td>${date}</td>
     <td>${option}</td>
     <td>
         <button class="btn delete" data-id="${id}">Delete</button>
         <button class="btn edit" data-id="${id}">Edit</button>
     </td>
 
     </tr>
     `
     document.getElementById("bodyy").appendChild(trlm);
    }

 }




 Library.showdata(); 



 
 Ajouter.addEventListener("click",(e)=>{
    e.preventDefault();
    
    let id=Math.floor(Math.random()*1000000);
    const newLibr= new Library(id,Titre.value,Auteur.value,Prix.value,Email.value,date.value,option.value);
    newLibr.displayData().storage();
    Titre.value=""
    Auteur .value=""
    Prix.value=""
    date.value=""
    option.value=""
    Email.value=""
 })
 
    
    

    

bodytable.addEventListener("click",(e)=>{

    if(e.target.classList.contains("delete")){
        
        // remove localstorg
        const id=e.target.getAttribute("data-id");
        console.log(id)
        const emps =JSON.parse(localStorage.getItem("Library"));
        const Dataa=emps.filter(item => item.id !==+  id);
        console.log(Dataa)
        localStorage.setItem("Library",JSON.stringify(Dataa))
        // remove html 
        e.target.parentElement.parentElement.remove();
    }
    if(e.target.classList.contains("edit")){
        // remove localstorg
        const id=+e.target.getAttribute("data-id");
        // console.log(id)
        const item =JSON.parse(localStorage.getItem("Library")).find(element => element.id===id);
        Titre.value=item.Titre;
        
    Auteur .value=item.Auteur;
    Prix.value=item.Prix;
    date.value=item.date;
    option.value=item.option;
    Email.value=item.Email;
    edit.value=id;
        
     }
         
})


edit.addEventListener("click",function(id)
{
    const newitem={id:id,  
         Titre:this.Titre,
        Auteur:this.Auteur,
        Prix:this.Prix,
        Email:this.Email,

        date:this.date,
        option:this.option,}

        const updatedata=JSON.parse(localStorage.getItem("Library")).map((element)=>{
            if(element.id==id)
            {
                return newitem;
            }
            return element;
        })
        localStorage.setItem("Library",JSON.stringify(updatedata));
})