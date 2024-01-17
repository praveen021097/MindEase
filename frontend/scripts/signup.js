
let form = document.getElementById("form");
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let nameError = document.getElementById("name-error");
let passwordError = document.getElementById("password-error");
let emailError = document.getElementById("email-error");

// error message
const sendError = (input , errorMessage) => {
    input.className = "form-error"
    input.innerText= errorMessage;

}
// success message
const sendSuccessMessage=(input,errorMessage)=>{
    if(errorMessage=== "success"){
        input.className= "success";
        input.innerText=errorMessage;

    }

}

const isEmail =(emailVal)=>{
    let atSymbol = emailVal.indexOf("@");
    
    if(atSymbol<1){
        return false;
    }
    let dot = emailVal.indexOf(".");
    if(dot < atSymbol +2){
        return false
    }
    else if(dot === emailVal.length-1){
        return false;
    }

    return true;

}

const passwordValidation=(password)=>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);

}
const validate = () => {
    let nameVal = name.value.trim();
    let emailVal = email.value.trim();
    let passwordVal = password.value.trim();
    
    //name validation
    if (nameVal === "") {
        sendError(nameError, "name can not be blank!")
    }
    else if (nameVal.length <= 3) {
        sendError(nameError, "name can not be less than 4 character")
    }
    else {
        sendSuccessMessage(nameError,"success");
    }

    // email validation 

    if (!isEmail(emailVal)){
        sendError(emailError,"Enter valid email!")
    }
    else{
        sendSuccessMessage(emailError,"success")
    }

    // password validation

    if(passwordVal.length<8){
        sendError(passwordError,"password length more than 8!")
    }
    else if(!passwordValidation(passwordVal)){
        sendError(passwordError,"it take 1 uppercase 1 digit 1 special char!")
    }
    else{
        sendSuccessMessage(passwordError,"success");
    }


}



form.addEventListener("submit", (event) => {
    event.preventDefault();

    validate();
    const payload ={
        name:name.value,
        email:email.value,
        password:password.value
    }

    fetch("https://mindeasef.onrender.com/api/v1/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload)
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        alert("sign up successfully!");
        window.location.href="login.html";
        return data;
    })
    .catch((err)=>{
        alert("something went wrong!")
        console.log(err)
    })


})