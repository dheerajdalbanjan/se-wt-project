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
