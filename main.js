// initialize and open a connection to the RapidSockets Gateway

let games = document.getElementById("publicGames");
let chatBox = "";
let rs = new RapidSockets({
    key: 'mul-96fd045c-4c67-4420-b71e-945fa37ab0c7'
});




rs.subscribe({
    channel: "indexRemv",
    callback: function (packet) {
        alert(packet.message.id);
        document.getElementById(packet.message.id).style.visibility = "hidden";
    }
        
    
});

rs.subscribe({
    channel: "indexAdd",
    callback: function (packet) {
        if(chatBox != ""){
        newPage();
    }

        games.innerHTML += `<div class="game" id="${packet.message.message}">
        <div class="gameHead">
            ${packet.message.message}
        </div>
        <div onclick="remove('${packet.message.message}')" class="gameCount" class="gameBody">
            join
        </div>
    </div>`;
    }
});

function remove(name){
    rs.publish({
        channel: "indexRemv",
        message: {
            id: name,
        }

        
    })
    location.href="game.html?room=" + name + "&id=2";

}

function send() {
chatBox = document.getElementById('gameTitle').value;
    if (chatBox != "") {

        rs.publish({
            channel: "indexAdd",
            message: {
                message: chatBox,
                speler: 1
            }

            
        })
    
    
    } else {
        alert("Please give the game an name");
    }
    
} 
function newPage(){
    window.open("game.html?room=" + chatBox +"&id=1","_self");

}

