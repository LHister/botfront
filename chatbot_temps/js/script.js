const form = document.querySelector('.form');
const input = document.querySelector('.form input');
const sendBtn = document.querySelector('.form .send-btn');
const messageContainer = document.querySelector('.container .message-container');
const dateContainer = document.querySelector('.container .container-header')
let userName = 'user'

function formController(){
    input.addEventListener('blur',()=>{
        form.classList.remove('active')
    });
    input.addEventListener('focus',()=>{
        form.classList.add('active')
    });
}

function checkUser(sender){
    if (sender != 'BOT'){
        return '';
    }
    else{
        return 'bot';
    }
}

function checkIcon(sender){
    if (sender != 'BOT'){
        return '<i class="fas fa-circle-user"></i>'
    }
    else{
        return '<i class="fas fa-robot"></i>'
    }
}

function sendMessage(sender,message,time,date){

    el = `
    <div class="message ${checkUser(sender)}">
        <div class="titles">                        
                <div class="logo">
                    ${checkIcon(sender)}
                </div>
            <div class="sender">${sender}</div>
        </div>
        <div class="message-content">
            <div class="message-info">
                <p>${message}</p>
            </div>
        </div>
        <div class="date">
            ${time} <i class="fas fa-check-circle"></i>
        </div>
    </div>
    `

    messageContainer.innerHTML += el;
    dateContainer.textContent = date
}

async function getMessages(message){
    let response = await fetch(`https://mrchatbot.pythonanywhere.com/chat/?q=${message}`)
    if (response.ok){
        let data = await response.json()
        sendMessage(data.name,data.message,data.time,data.date)
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    else {
        alert('Sorry !!! There is a problem in the server we will fix it soon')
    }
}

function setUserName(){
    if (localStorage.getItem('name')){
        userName = localStorage.getItem('name')
    }
    else {
        localStorage.setItem('name','user')
    }
}

window.addEventListener('DOMContentLoaded',()=> {
    formController()
    setUserName()
    sendBtn.addEventListener('click', () => {
        setUserName()
        if (input.value){
            let curTime = new Date()
            sendMessage(userName,input.value,`${curTime.getHours()}:${curTime.getMinutes()}`)
            messageContainer.scrollTop = messageContainer.scrollHeight;
            getMessages(input.value)
            input.value = ''
        }
    });
    input.addEventListener('keydown', (e) => {
        setUserName()
        if (e.keyCode == 13){
            if (input.value){
                let curTime = new Date()
                sendMessage(userName,input.value,`${curTime.getHours()}:${curTime.getMinutes()}`)
                messageContainer.scrollTop = messageContainer.scrollHeight;
                getMessages(input.value)
                input.value = ''
            }
        }
    });
});
