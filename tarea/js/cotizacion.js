"use strict"
let btnQuote=document
.getElementById("btnQuote");
let btnPrint=document.getElementById("btnPrint");


btnQuote.addEventListener("click", function (e) {
    e.preventDefault();

    let hours=parseInt(document.getElementById("inputHours").value);

    let rate=120;

    let extras=document.getElementById("inputExtras");

    let changes=parseInt(document.getElementById("inputChanges").value);

    let iva=document.getElementById("checkIVA").checked;
    changes=(isNaN(changes) ?0:changes);

    let fixedCost= parseFloat(document.getElementById("inputFCost").value);
    fixedCost=(isNaN(fixedCost) ?0:fixedCost);
    let cardText=document.getElementById("cardText");
    let cardCost=document.getElementById("cardCost");
    let flag=true;
    
    

    if (isNaN(hours)) {
        document.getElementById("inputHours").style.borderColor="#ed3b3b";
        flag=false; 
    }//if
    else{
        document.getElementById("inputHours").value=hours;
        document.getElementById("inputHours").style.borderColor="";
    }
    if (flag) {
        cardText.innerHTML=`Horas: ${hours} </br> Precio por hora: $120 </br> ${getRequirements(extras)} `;

        cardCost.innerHTML="$" + quote(hours,rate,iva, extras, changes, fixedCost).toFixed(2);
    }
}); //btnQuote

btnPrint.addEventListener("click", function (e){
    e.preventDefault();
    window.print();
}); //btnPrint

const getRequirements= (ex) =>{
    let str=`<ul class="list-group col-4">`;
    for (let i = 0; i< ex.options; i++) {
        console.log(ex.options[i].selected);
        if (ex.options[i].selected) {
            str += `<li class="list-group-item list-group-item-action"> ${ex.options[i].text} </li>`;
        } //if
        
    }//for
    str+= `</ul>`;
    return str;
}; //Function 

function quote(h,r,vat, ex, p, fc) {
    p/100; //porcentaje de cambios
    let result= (h*r)*(1+p);
    let i=0;
    do{
        console.log(ex.options[i].selected);
        if (ex.options[i].selected) {
            result+= parseFloat(ex.options[i].value);
        }
        i++;
    }while (i< ex.options.length);
    result += fc;
    if (vat) {
        result*= 1.16;
    }
       return result; 
    
    
}