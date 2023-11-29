import { stateDistricts } from './data.js';


import { talukData } from './dat.js';

try {
    var localData = JSON.parse(localStorage.getItem('tapovan'))

    Object.keys(localData).forEach((key) => {
        if (!(key in ['regis_state', 'regis_district', 'regis_taluk'])) {

            document.getElementById(key).value = localData[key];
        }
    })

} catch (err) {
    console.log(err);
}



const state = document.getElementById("regis_state");
const district = document.getElementById("regis_district");
const taluk = document.getElementById("regis_taluk");

var state_html = "<option value='' >Select the State</option>\n";

Object.keys(talukData).map((e) => state_html += `<option value='${e}' >${e}</option>\n`)

state.innerHTML = state_html;

window.stateChangee = stateChangee;


window.cleaer = cleaer;


document.getElementById('regis_date').valueAsDate = new Date();

function stateChangee() {
    const districts = talukData[state.value];
    var district_html = "<option selected value='' >Select the District</option>\n";
    Array.from(Object.keys(districts)).map((e) => district_html += `<option value='${e}' >${e}</option>\n`)
    console.log(district_html);

    district.innerHTML = district_html;

}


window.rmChange = (e) => {
    var value = e.target.form;
    var formdata = new FormData(value);
    var data = {

    }
    formdata.forEach((value, key) => {
        data[key] = value;
    })

    localStorage.setItem('tapovan', JSON.stringify(data))

}



window.districtChange = () => {
    const taluks = talukData[state.value][district.value]
    var taluk_html = "<option value='' selected >Select the Taluk</option>\n";


    Array.from(taluks).forEach((e) => {
        taluk_html += `<option value='${e}' >${e}</option>\n`
    })

    taluk.innerHTML = taluk_html;

}


window.onscroll = function (event) {
    let height = window.scrollY;
    if (height > 150)
        document.getElementsByClassName("header")[0].style.top = "-90px";
    else {
        // You might want to reset the top style here when height <= 150
        document.getElementsByClassName("header")[0].style.top = "0px";
    }
}


function cleaer() {
    console.log("clear");
    var inputs = Array.from(document.getElementsByTagName('input'));
    var textarea = Array.from(document.getElementsByTagName('textarea'));
    var select = Array.from(document.getElementsByTagName('select'));
    var elements = inputs.concat(textarea, select);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == 'submit')
            continue;

        elements[i].value = '';
    }

    localStorage.clear('topovan');
}


window.calculateAge = function () {
    var dob = document.getElementById("regis_dob").value;
    if (dob) {
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        document.getElementById("regis_age").value = age;
    }
}



window.snackbar = (e) => {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    x.innerHTML = e;

    // Add the "show" class to DIV
    x.className = "show";


    // After 3 seconds, remove the show class from DIV
    //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}


window.closeSnack = () => {
    var x = document.getElementById("snackbar");
    x.className = x.className.replace("show", "");
}


window.validateForm = (e) => {
    e.preventDefault();
    let valid = true;
    var error_text = `<button class="snackbar-button" onclick="closeSnack()">
    <img src="cross-svgrepo-com.svg" width="20px" height="20px" />
</button><h5>Form could not be validated</h5><ul>`;
    // name should be full 
    const body = e.target;
    const formData = new FormData(body);

    const data = {

    }

    formData.forEach((value, key) => {
        data[key] = value;
    })

    console.log(data);
    if (data.regis_name.split(' ').length < 2) {
        error_text += '<li>Enter Full Name </li> ';
        valid = false;
    }

    if (data.regis_addr.length < 15) {
        error_text += '<li>Address must be at least 15 characters </li>';
        valid = false;
    }

    if (data.regis_phone.length != 10) {
        error_text += '<li> Phone No must be at least 10 characters</li>';
        valid = false;
    }

    if (data.regis_tele.length != 10) {
        error_text += '<li>Telephone No must be at least 10 characters</li>';
        valid = false;
    }
    if (data.regis_tele_accomp.length != 10) {
        error_text += '<li>Accompany Phone No must be at least 10 characters</li>';
        valid = false;
    }


    error_text += '</ul>';

    if (!valid) {
        snackbar(error_text);
    }
    else {
        var pdf = document.getElementById("pdf");
        Object.keys(data).forEach((key) => {
            try {
                if (`p_${key}` === 'p_regis_living' || `p_${key}` === 'p_regis_referal') {
                    let radioButton = document.querySelector(`input[type="radio"][value="${data[key]}"]`);

                    if (radioButton) {
                        radioButton.checked = true;
                        radioButton.className += 'check' ; 
                        radioButton.parentElement.className += 'check'; 
                        console.log(radioButton) ;
                    } else {
                        console.log("Radio button not found");
                    }

                    console.log(data[key])
                }
                else
                    document.getElementById(`p_${key}`).innerHTML = data[key];

            } catch (err) {
                console.log(data[key]);
            }

        })
        var divContents = pdf.innerHTML;
        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write(`<html><head><title>Tapovan</title><style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                text-align: center;
            }

            check {
                background-color: blue ; 

            }
    
            h3, h4 {
                color: #333;
            }
    
            form {
                max-width: 800px;
                margin: auto;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
    
            th, td {
                padding: 10px;
                border: 1px solid #ddd;
            }
    
            .input-group {
                display: flex;
                justify-content: space-between;
            }
    
            label {
                display: block;
                margin-bottom: 5px;
            }
    
            p {
                margin: 0;
                padding: 8px;
                box-sizing: border-box;
            }
        </style>`);
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }



}
