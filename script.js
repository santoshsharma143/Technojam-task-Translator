const selectTag = document.querySelectorAll("select");
const translation = document.querySelector("#translation");
const text = document.querySelector("#text");
const translated_text = document.querySelector("#translated_text");
const icons = document.querySelectorAll("img");
   



selectTag.forEach((tag , id)=>{
    

    for (const countriesCode in countries) {
        let selected ;
        if( id == 0 && countriesCode == "en-GB"){
            selected =" selected";
        }else if(id == 1 && countriesCode == "hi-IN"){
            selected =" selected";
        }
        let option = ` <option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
        }
});

translation.addEventListener("click" , ()=> {
  let Text = text.value,
  translateFrom = selectTag[0].value,
  translateTo = selectTag[1].value;

  let apiURL= `https://api.mymemory.translated.net/get?q=${Text}!&langpair=${ translateFrom}|${translateTo}`;
  
  fetch(apiURL).then(res => res.json()).then(data =>{

 
    translated_text.value = data.responseData.translatedText;
});
 

});

icons.forEach(icon =>{
icon.addEventListener( "click" , ({target}) => {
    if(target.classList.contains("copyed") ){
        if(target.id == "from"){
           navigator.clipboard.writeText(text.value)
        }
        else{
            navigator.clipboard.writeText(translated_text.value)
        }

    }
    else{
        let speaks;
        if(target.id == "from"){
            speaks = new SpeechSynthesisUtterance(text.value)
            speaks.lang = selectTag[0].value;
            speechSynthesis.speak(speaks);
        }else{
            speaks = new SpeechSynthesisUtterance(translated_text.value)
            speaks.lang = selectTag[1].value;
            speechSynthesis.speak(speaks);
        }
        // speechSynthesis.speak(speaks);
    }
});
});
