const apiKey = 'key'

function removeOld(){
    oldText = document.getElementsByClassName("response-message")
    if (oldText.length > 0){
        for (i = 0; i < oldText.length; i++){
            oldText[i].remove()
        }
    }
}

function basicMessage(){
    removeOld()
    sendMessage("Create a dialogue in russian between 2 people using basic russian vocabulary that someone who has been learning for 1 month could understand. ")
}

function intermediateMessage(){
    removeOld()
    sendMessage("Create a dialogue in russian between 2 or 3 people using intermediate russian vocabulary that someone who has been learning for about 6 months could understand, preferably with 20 lines or more.")
}

function advancedMessage(){
    removeOld()
    sendMessage("Create a long dialogue in russian between 2 to 4 people, with 40-50 lines or more.")
}

function sendMessage(m){

    var status = document.getElementById('status')
    var btnSubmit = document.getElementsByClassName('btn-submit')

    status.style.display = 'block'
    status.style.color = "white"
    status.innerHTML = 'Loading...'
    for (i = 0; i < btnSubmit.length; i++){
        btnSubmit[i].disabled = true
        btnSubmit[i].style.cursor = 'not-allowed'
    }
    
    fetch("https://api.openai.com/v1/completions",{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: m,
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.8 // criatividade na resposta
        })
    })
    .then((response) => response.json())
    .then((response) => {
        let r = response.choices[0]['text']
        status.style.display = 'none'
        showHistory(r)
    })
    .catch((e) => {
        console.log(`Error -> ${e}`)
        status.innerHTML = 'Error!'
    })
    .finally(() => {
        for (i = 0; i < btnSubmit.length; i++){
            btnSubmit[i].disabled = false
            btnSubmit[i].style.cursor = 'pointer'
        }
    })
}

function showHistory(response){
    var historyBox = document.getElementById('history')

    var boxResponseMessage = document.createElement('div')
    boxResponseMessage.className = 'box-response-message'

    var chatResponse = document.createElement('p')
    chatResponse.className = 'response-message'
    chatResponse.innerHTML = response

    boxResponseMessage.appendChild(chatResponse)

    historyBox.appendChild(boxResponseMessage)
}