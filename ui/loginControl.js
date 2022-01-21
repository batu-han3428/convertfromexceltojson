let uye = "batuhan";

const loginControl = () =>{
    let Mail = document.getElementById('email').value;
    let Password =document.getElementById('password').value;

    if(Mail === "" || Password === ""){
        Swal.fire({
            icon: 'info',
            title: 'Alanlar boş geçilemez..!'
        })
        return false;
    }

    var data={
        method:"POST",
        body:JSON.stringify({
            mail:Mail,
            password:Password       
        }),
        headers:new Headers({
            'content-type':'application/json'
        })
    }

    fetch("https://localhost:5001/api/Convert/LoginControl",data).
    then(res=>{
        if(res.status === 401){
            Swal.fire({
                icon: 'info',
                title: 'Kullanıcı adı yada parola hatalı..!'
            })
        }else if(res.status === 200){
            $('#loginPage').animate({ "top": "-=1000px", opacity: 0 }, "slow" ).fadeOut();
            $('#fileUpload').fadeIn().animate({ "top": "200", opacity: 1 }, "slow" );
        }
    }).
    catch(error=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Beklenmeyen bir hata oluştu..!'
        })
    });
}

document.getElementById('loginButton').addEventListener('click',loginControl);