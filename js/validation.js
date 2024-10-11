document.querySelector(".btn").addEventListener("click",()=>{  
    let password = document.getElementById("password").value
    let confirmpassword = document.getElementById("confirm-password").value
    if(password !== confirmpassword){
        alert("Password is Mismatched")
    }
    console.log(password,confirmpassword)
})

