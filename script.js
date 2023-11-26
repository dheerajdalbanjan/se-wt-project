import {stateDistricts} from './data.js' ;

console.log(Object.keys(stateDistricts)); 

const state = document.getElementById("regis_state"); 
const district = document.getElementById("regis_district");

var state_html = "<option value='' >Select the State</option>\n" ;

Object.keys(stateDistricts).map((e)=> state_html += `<option value='${e}' >${e}</option>\n`)

state.innerHTML = state_html ;

window.stateChangee = stateChangee ;
window.cleaer = cleaer ;

function stateChangee(){
    const districts = stateDistricts[state.value] ;
    var district_html = "<option value='' >Select the District</option>\n" ; 
    Array.from(districts).map((e)=> district_html += `<option value='${e}' >${e}</option>\n`)
    console.log(district_html); 

    district.innerHTML = district_html; 
    
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
        console.log("ara"); 
        elements[i].value = '';
    }
}
