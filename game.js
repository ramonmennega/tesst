let vakjes = document.getElementsByClassName("vakje");
let vakarray = ["", "", "", "", "", "", "", "", ""];
let beurt = 1;
let restartt = false;
let winner = "";
let chat = document.getElementById("chat");
let chats = document.getElementById("chats");

function keyPressed(k) {
    if (k.code == 'Enter')      // only if the key is "Enter"...
        sendChat();                // ...add a new task (using same handler as the button)
    return false;               // no propagation or default
}
// Create an; array to keep query string variables
var qsParm = new Array();
// This function gets query string values from current page
// and stores them in above defined array
function qs()
    {
            var query = window.location.search.substring(1);
            var parms = query.split('&');
           
            for (var i=0; i<parms.length; i++) {
                var pos = parms[i].indexOf('=');
                if (pos > 0)
                {
                    var key = parms[i].substring(0,pos);
                    var val = parms[i].substring(pos+1);
                    qsParm[key] = val;
                }
            }
    }

qsParm['room'] = null;
qsParm['id'] = null;
// Call function – get query strings
qs();
// For example show ListId
let speler = qsParm['id'];
let rs = new RapidSockets({
    key: 'mul-96fd045c-4c67-4420-b71e-945fa37ab0c7'
});

window.onload = function(){
    for(i = 0; i < vakjes.length; i++){
        vakjes[i].value = i;
       
        
  }
  chat.addEventListener("keypress", keyPressed);  // bind to taskInput, not addButton

  document.getElementById("speler").innerHTML ="Player: " + qsParm['id'];

  loadGame();
  
}

function restarter(){
    restartt = true;
    send();
    

}



function loadGame(){
   
    for(i = 0; i < vakjes.length; i++){
        vakjes[i].innerHTML = vakarray[i];
    }
    if(vakarray[0] == 'X' && vakarray[3] == 'X'  && vakarray[6] == 'X'){
        winner = "kruisje";

    } else if(vakarray[2] == 'X' && vakarray[5] == 'X'  && vakarray[8] == 'X')  {
                winner = "kruisje";

    } else if(vakarray[1] == 'X' && vakarray[4] == 'X'  && vakarray[7] == 'X')  {
                winner = "kruisje";

    } else if(vakarray[0] == 'X' && vakarray[1] == 'X'  && vakarray[2] == 'X')  {
                winner = "kruisje";

    } else if(vakarray[3] == 'X' && vakarray[4] == 'X'  && vakarray[5] == 'X')  {
                winner = "kruisje";

    } else if(vakarray[6] == 'X' && vakarray[7] == 'X'  && vakarray[8] == 'X')  {
                winner = "kruisje";

    }else if(vakarray[0] == 'X' && vakarray[4] == 'X'  && vakarray[8] == 'X')  {
                winner = "kruisje";

    }else if(vakarray[2] == 'X' && vakarray[4] == 'X'  && vakarray[6] == 'X')  {
                winner = "kruisje";

    }

    else if(vakarray[0] == 'O' && vakarray[3] == 'O'  && vakarray[6] == 'O'){
                winner = "rondje";
    } else if(vakarray[2] == 'O' && vakarray[5] == 'O'  && vakarray[8] == 'O')  {
                winner = "rondje";
    } else if(vakarray[1] == 'O' && vakarray[4] == 'O'  && vakarray[7] == 'O')  {
                winner = "rondje";
    } else if(vakarray[0] == 'O' && vakarray[1] == 'O'  && vakarray[2] == 'O')  {
                winner = "rondje";

    } else if(vakarray[3] == 'O' && vakarray[4] == 'O'  && vakarray[5] == 'O')  {
                winner = "rondje";

    } else if(vakarray[6] == 'O' && vakarray[7] == 'O'  && vakarray[8] == 'O')  {
                winner = "rondje";

    }else if(vakarray[0] == 'O' && vakarray[4] == 'O'  && vakarray[8] == 'O')  {
                winner = "rondje";

    }else if(vakarray[2] == 'O' && vakarray[4] == 'O'  && vakarray[6] == 'O')  {
                winner = "rondje";
    }  
   
    
    if (speler == "1"){
        if(beurt == 1){
            for(i = 0; i < vakjes.length; i++){
                if(vakjes[i].innerHTML == ""){
                vakjes[i].addEventListener('click', vakklik);
            }
            }
    
    } else{
        for(i = 0; i < vakjes.length; i++){
            vakjes[i].removeEventListener('click', vakklik);
        }
    
      
    }
    }
     if(speler == "2"){
        if(beurt == 2){
            for(i = 0; i < vakjes.length; i++){
                if(vakjes[i].innerHTML == ""){
                vakjes[i].addEventListener('click', vakklik);
            }
            }
        
    
        } else{
            for(i = 0; i < vakjes.length; i++){
                vakjes[i].removeEventListener('click', vakklik);
            }
    
        }
    }
    if(winner != ""){
        for(i = 0; i < vakjes.length; i++){
            vakjes[i].removeEventListener('click', vakklik);
        }
        document.getElementById("winner").innerHTML = winner;
        document.getElementById("restart").innerHTML = "Restart";
        document.getElementById("quit").innerHTML = "Quit";
        
        }
}

rs.subscribe({

    channel: qsParm['room'],

    callback: function (packet) {

        if (packet.message.restart == true){
            location.reload();
        } 
        for(i = 0; i < vakjes.length; i++){
            vakarray[i] = packet.message.vakjes[i];

            beurt = packet.message.beurt;

        }

        
    loadGame();

    }
       
       
    
});



function vakklik(){
    if (speler == "1"){
        if(beurt == 1){
            
        vakarray[event.target.value] = "X";
        beurt = 2;
    } else{
        
      
    }
    }
     if(speler == "2"){
        if(beurt == 2){
          
            
            vakarray[event.target.value] = "O";
            beurt = 1;
    
        } else{
            
    
        }
    }
    send();
}

function send() {
    console.log(restartt);
        rs.publish({
            channel: qsParm['room'],
            message: {
                vakjes: vakarray,
                beurt: beurt,
                restart: restartt,
            }
            
        })
    } 

    function sendChat() {
        if(chat.value != ""){
            rs.publish({
                channel: qsParm['room']+"chat",
                message: {
                    message: chat.value,
                    username: qsParm['id']
                }
            
                
            })
        }
            chat.value = "";
        } 

        rs.subscribe({

            channel: qsParm['room']+"chat",
        
            callback: function (packet) {
                chats.innerHTML += `<li>Player ${packet.message.username}: \n${packet.message.message}</li>`;
           
            }
               
               
            
        });
    
    
