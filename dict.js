const result=document.querySelector(".result");
const inputval=document.querySelector(".flex-raw input");
const dictApp=async(value)=>{
    const request= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
    const response=await request.json();
    response.forEach((data)=>{ 
       result.innerHTML=`
       <div id="word">
       <h3>${data.word}</h3>
       <button onclick="playsound()">
       <i class="ri-volume-up-fill"></i>
       </button>
       </div>
       <p id="type">${data.meanings[0].partOfSpeech}</p>
       <p id="synonyms">${data.meanings[0].synonyms}</p>
       <p id="mean">${data.meanings[0].definitions[0].definition}</p>
       `
    })
}
function playsound(){
    let text=inputval.value;
   let utterance=new SpeechSynthesisUtterance(text);
   speechSynthesis.speak(utterance);
}

inputval.addEventListener("keyup",()=>{
  let SecrchValue=inputval.value;
  if(SecrchValue!=""){
    dictApp(SecrchValue)
  }else{
    result.innerHTML=""
  }
})











