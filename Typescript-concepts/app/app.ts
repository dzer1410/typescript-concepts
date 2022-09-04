function startGame(){
    var messageElement = document.getElementById('messages');
    messageElement!.innerText = 'Welcome to Multitash! Starting new game...';

}

document.getElementById('startGame')!.addEventListener('click', startGame);