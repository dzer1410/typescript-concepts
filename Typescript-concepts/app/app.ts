function startGame(){

    let playerName: string = 'Audrey';
    logPlayer(playerName);

    var messageElement = document.getElementById('messages');
    messageElement!.innerText = 'Welcome to Multitash! Starting new game...';

}

function logPlayer(name: string){
    console.log(`New game starting for player: ${name}`);
}

document.getElementById('startGame')!.addEventListener('click', startGame); 