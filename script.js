import {stateDistricts} from './data.js' ;


import { talukData } from './dat.js';

 

const state = document.getElementById("regis_state"); 
const district = document.getElementById("regis_district");
const taluk = document.getElementById("regis_taluk");

var state_html = "<option value='' >Select the State</option>\n" ;

Object.keys(stateDistricts).map((e)=> state_html += `<option value='${e}' >${e}</option>\n`)

state.innerHTML = state_html ;

window.stateChangee = stateChangee ;
window.cleaer = cleaer ;

function stateChangee(){
    const districts = talukData[state.value] ;
    var district_html = "<option value='' >Select the District</option>\n" ; 
    Array.from(Object.keys(districts)).map((e)=> district_html += `<option value='${e}' >${e}</option>\n`)
    console.log(district_html); 

    district.innerHTML = district_html; 
    
}


window.districtChange = () =>{
    const taluks = talukData[state.value][district.value]
    var taluk_html = "<option value='' >Select the Taluk</option>\n" ; 


    Array.from(taluks).forEach((e)=>{
        taluk_html += `<option value='${e}' >${e}</option>\n`
    })

    taluk.innerHTML = taluk_html ;

}


window.onscroll = function(event){
    let height = window.scrollY;
    console.log(height);
    if (height > 150)
        document.getElementsByClassName("header")[0].style.top = "-90px"; 
    else {
        // You might want to reset the top style here when height <= 150
        document.getElementsByClassName("header")[0].style.top = "0px"; 
    }
}


function cleaer(){
    console.log("clear");
    var inputs = Array.from(document.getElementsByTagName('input')); 
    var textarea = Array.from(document.getElementsByTagName('textarea'));
    var select = Array.from(document.getElementsByTagName('select'));
    var elements = inputs.concat(textarea, select);
    for(var i=0; i<elements.length; i++){
        if(elements[i].type == 'submit')
            continue ;
       
        elements[i].value = '';
    }
}


window.snackbar = (e) => {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    x.innerHTML += e  ; 
  
    // Add the "show" class to DIV
    x.className = "show";

  
    // After 3 seconds, remove the show class from DIV
    //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
  }


window.closeSnack = () =>{
    var x = document.getElementById("snackbar");
    x.className  = x.className.replace("show", "");
}


window.validateForm = (e) => {
    e.preventDefault() ;
    let valid = true ;
    var error_text = "<h5>Form could not be validated</h5><ul>"; 
    // name should be full 
    const body = e.target ; 
    const formData = new FormData(body) ; 

    const data = {

    }

    formData.forEach((value , key)=> {
        data[key] = value ;
    })

    localStorage.setItem('tapovan',data)

    console.log(data) ; 
    if(data.regis_name.split(' ').length < 2) {
        error_text += '<li>Enter Full Name </li> ' ; 
        valid = false ;
    }

    if(data.regis_addr.length < 15   ){
        error_text += '<li>Address must be at least 15 characters </li>' ;
        valid = false ;
    }

    if(data.regis_phone.length != 10){
        error_text += '<li> Phone No must be at least 10 characters</li>' ;
        valid = false ;
    }

    if(data.regis_tele.length != 10){
        error_text += '<li>Telephone No must be at least 10 characters</li>' ;
        valid = false ;
    }
    if(data.regis_tele_accomp.length != 10){
        error_text += '<li>Accompany Phone No must be at least 10 characters</li>' ;
        valid = false ;
    }


    error_text += '</ul>' ;

    if(!valid){
        snackbar(error_text) ;
    }




}
