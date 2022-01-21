$('#login-button').click(function(){
    $('#login-button').fadeOut("slow",function(){
        $("#container").fadeIn();
        TweenMax.from("#container", .4, { scale: 0, ease:Sine.easeInOut});
        TweenMax.to("#container", .4, { scale: 1, ease:Sine.easeInOut});
    });
});
  
$(".close-btn").click(function(){
    TweenMax.from("#container", .4, { scale: 1, ease:Sine.easeInOut});
    TweenMax.to("#container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
    $("#container, #forgotten-container").fadeOut(800, function(){
        $("#login-button").fadeIn(800);
    });
});
  
$('#forgotten').click(function(){
    $("#container").fadeOut(function(){
        $("#forgotten-container").fadeIn();
    });
});

let uye = "batuhan";

const loginControl = () =>{
    let email = document.getElementById('email').value;
    
    if(email !== "" && uye === email){
        $('#loginPage').animate({ "top": "-=1000px", opacity: 0 }, "slow" ).fadeOut();

        $('#fileUpload').fadeIn().animate({ "top": "200", opacity: 1 }, "slow" )
    }
}

document.getElementById('loginButton').addEventListener('click',loginControl);