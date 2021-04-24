const socket = io()
let name1;
do{
    name1=prompt("Enter your name: ")
} while(! name1 )
let textarea=document.querySelector('#textarea')
textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value)}
})

function sendMessage(message)
{
    let msg={
        user:name1,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrolltoBottom()

    //Send to server
    socket.emit('message',msg)

}

    let messageArea= document.querySelector('.message_area')
    function appendMessage(msg,type){
        let mainDiv= document.createElement('div')
        let className=type
        mainDiv.classList.add(className,'message')
        let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
        mainDiv.innerHTML=markup
        messageArea.appendChild(mainDiv)
    }

socket.on('message',(msg)=>{
    //console.log(msg)
    appendMessage(msg,'incoming')
    scrolltoBottom()
})

function scrolltoBottom()
{
    messageArea.scrollTop=messageArea.scrollHeight
}