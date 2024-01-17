let form = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");
let passwordError = document.getElementById("password-error");
let emailError = document.getElementById("email-error");
let user = JSON.parse(localStorage.getItem("user")) || {};
// error message
const sendError = (input, errorMessage) => {
    input.className = "form-error"
    input.innerText = errorMessage;

}
// success message
const sendSuccessMessage = (input, errorMessage) => {
    if (errorMessage === "success") {
        input.className = "success";
        input.innerText = errorMessage;

    }

}
// valid email checking
const isEmail = (emailVal) => {
    let atSymbol = emailVal.indexOf("@");

    if (atSymbol < 1) {
        return false;
    }
    let dot = emailVal.indexOf(".");
    if (dot < atSymbol + 2) {
        return false
    }
    else if (dot === emailVal.length - 1) {
        return false;
    }

    return true;

}

const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);

}
const validate = () => {

    let emailVal = email.value.trim();
    let passwordVal = password.value.trim();

    // email validation 

    if (!isEmail(emailVal)) {
        sendError(emailError, "Enter valid email!")
    }
    else {
        sendSuccessMessage(emailError, "success")
    }

    // password validation

    if (passwordVal.length < 8) {
        sendError(passwordError, "password length more than 8!")
    }
    else if (!passwordValidation(passwordVal)) {
        sendError(passwordError, "it take 1 uppercase 1 digit 1 special char!")
    }
    else {
        sendSuccessMessage(passwordError, "success");
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    validate();
    const payload ={
        email:email.value,
        password:password.value
    }

    fetch("https://mindeasef.onrender.com/api/v1/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload)
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        alert("login successfully!")
        localStorage.setItem("user",JSON.stringify(data));
        user=data;
        window.location.href="index.html"
        console.log('ww',user)
        return user;
    })
    .catch((err)=>{
        alert("something went wrong!")
        console.log(err)
    })
})

