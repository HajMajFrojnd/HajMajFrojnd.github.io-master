const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

if(!isMobile){

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.animation = "nav-load 1500ms forwards";
            if(document.getElementById("sear")!= null)
                document.getElementById("sear").style.animation = "nav-load 1500ms forwards";
        } else {
            document.getElementById("navbar").style.animation = "nav-hide 1500ms forwards";
            if(document.getElementById("sear")!= null)
                document.getElementById("sear").style.animation = "nav-hide 1500ms forwards";
        }
        prevScrollpos = currentScrollPos;
    }
    
}

function getTime(to) {
    const total = Date.parse(to) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return[ 
        days,
        hours,
        minutes,
        seconds
    ];
}
function countdown(){
    let days = document.getElementById("cdays");
    let hours = document.getElementById("chours");
    let minutes = document.getElementById("cminutes");
    let seconds = document.getElementById("cseconds");

    arr = getTime(new Date("January, 1 2023 00:00:00"));

    days.innerHTML = "" + arr[0];
    hours.innerHTML = "" + arr[1];
    minutes.innerHTML = "" + arr[2];
    seconds.innerHTML = "" + arr[3];

}

function rotateImage(lr){

    let inc_or_dec = 1;

    if( !lr ){
        inc_or_dec = -1;
    }

    radios = document.getElementsByClassName("gallery-selector");

    let check_index = 0;

    for(; check_index < radios.length; check_index++){
        if(radios[check_index].checked)
            break;
    }

    radios[check_index].checked = false;
    radios[(check_index + radios.length + inc_or_dec)%radios.length].checked = true;

}

function timer(){
    setInterval(() => {
        countdown();
    }, 1000);
}

window.addEventListener("load", ()=>{
    setInterval(() => {
        timer();
    }, 1000);


    let left = document.getElementById("left")
    let right = document.getElementById("right")

    if(left && right){
        left.addEventListener("click", () => rotateImage(false))
        right.addEventListener("click", () => rotateImage(true))
    }
})


function validateForm(){

    var userName = document.getElementById("firstname");
    var email = document.getElementById("contactmail");
    var message = document.getElementById("message");

    userName.style.borderColor = "white";
    email.style.borderColor = "white";
    message.style.borderColor = "white";

    var final = `<span class="poppins-semi f1-5 sucess-message white" onclick="hide(this)">`
    var error = document.getElementById("contacterror");
    var send = false;

    if(userName.value.length == 0){
        userName.style.borderColor = "red";
        final += `Full Name Cannot Be missing <br><br>`;
        send = true;
    }

    if(!/^([\w-\.*]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email.value)){
        email.style.borderColor = "red";
        final += `email must be in format abc@mail.com <br><br>`;
        send = true;
    }

    if(message.value.length < 10){
        message.style.borderColor = "red";
        final += `Message must be at least 10 characters long`;
        send = true;
    }

    final += `</span>`;

    error.innerHTML += final;

    if(send){
        setInterval(() => {
            error.innerHTML = ""
        }, 6000);
    }
    else{
        error.innerHTML = ""
    }

    return false;

}