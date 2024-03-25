const result=document.querySelector(".result");
const inputval=document.querySelector(".flex-raw input");
const Mice=document.querySelector(".flex-raw i");
const  MicBox=document.querySelector(".mic-box");
const  MicBoxText=document.querySelector(".mic-box h4");
const closeBox=document.querySelector(".mic-box i");
const dictApp=async(value)=>{
    const request= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
    const response=await request.json();
    console.log(response);
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
  speechSynthesis.speak(utterance)
}

let spch=window.webkitSpeechRecognition || window.SpeechRecognition;
let VoiceRec=new spch();
VoiceRec.continuous=true;
VoiceRec.interimResults=true
Mice.addEventListener("click",()=>{
  VoiceRec.start();
  MicBox.style.opacity="1";
  MicBoxText.innerText="Listening..."
  setTimeout(()=>{
    VoiceRec.stop();
    MicBox.style.opacity="0";
  },5000)
  setTimeout(()=>{
   MicBoxText.innerText="Got It..."
  },4000)
  
})
closeBox.addEventListener("click",()=>{
  MicBox.style.opacity="0";
})
VoiceRec.onresult=res=>{
  let text=Array.from(res.results)
  .map(r=>r[0])
  .map(txt=>txt.transcript)
  .join("")
  dictApp(inputval.value=text);
}
inputval.addEventListener("keyup",()=>{
  let SecrchValue=inputval.value;
  if(SecrchValue!=""){
    dictApp(SecrchValue)
  }else{
    result.innerHTML=""
  }
})











