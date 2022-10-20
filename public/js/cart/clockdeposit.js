var j = true;
function move(){
    if(localStorage.getItem('deposit-amount')) {
        if(!localStorage.getItem('paid-time')){
            var elemj = document.getElementById('pablos');
            localStorage.setItem('paid-left',600)
            var width = localStorage.getItem('paid-left');
            var id = setInterval(frame, 1000);
            function frame(){
                if(width <= 0){
                    clearInterval(id);
                    i = false;
                    localStorage.setItem('paid-left',null);
                    localStorage.removeItem('deposit-amount');
                    alert("Time's up. This progress is lost, select another bank log from the website and pay for it on time");
                    window.location.reload();
                } 
                else if( width <= 200) {
                    elemj.classList.add("bg-danger");
                    localStorage.setItem('paid-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/6) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else if( width <= 400) {
                    elemj.classList.add("bg-warning");
                    localStorage.setItem('paid-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/6) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else {
                    localStorage.setItem('paid-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/6) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                }
            }
        } else{
            var elemj = document.getElementById('pablos');
            var width = localStorage.getItem('paid-left');
            var id = setInterval(frame, 1000);
            function frame(){
                if(width <= 0){
                    clearInterval(id);
                    i = false;
                    localStorage.setItem('paid-left',null);
                    localStorage.removeItem('deposit-amount');
                    alert("Time's up. This progress is lost, select another bank log from the website and pay for it on time");
                    window.location.reload();
                } 
                else if( width <= 200) {
                    elemj.classList.add("bg-danger");
                    localStorage.setItem('paid-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/6) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else if( width <= 400) {
                    elemj.classList.add("bg-warning");
                    localStorage.setItem('paid-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/6) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 
                else {
                    localStorage.setItem('paid-left',width--);
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){
                        seconds = '0'+seconds
                    }
                    elemj.style.width = (width/6) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                }
            }
        }
        localStorage.setItem('paid-time',true)     
    } else {
        console.log('There was nothing on your cart')
    }           
}