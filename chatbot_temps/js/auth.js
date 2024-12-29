const userName = document.getElementById('us')
const sendBtn = document.getElementById('submit')

window.addEventListener('DOMContentLoaded',() => {
    sendBtn.addEventListener('click',()=>{
        if (userName.value){
            localStorage.setItem('name',userName.value)
            userName.value = ''
            window.location = 'index.html'
        }
        else {
            alert('Please enter your Username')
        }
    })
})