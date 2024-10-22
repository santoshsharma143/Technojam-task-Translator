const langtag = document.querySelectorAll("select");
const fromtext = document.querySelector("#fromtext");
const translated_text = document.querySelector("#translated_text");
const icons = document.querySelectorAll("img");
const exchangelang=document.querySelector(".bx-transfer")

langtag.forEach((tag, id) => {
  for (const countriesCode in countries) {
    let selected;
    if (id == 0 && countriesCode == "en-GB") {
      selected = " selected";
    } else if (id == 1 && countriesCode == "hi-IN") {
      selected = " selected";
    }
    let option = ` <option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

fromtext.addEventListener("input", () => {
  let Text = fromtext.value, 
    translateFrom = langtag[0].value,
    translateTo = langtag[1].value;

  let apiURL = `https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}|${translateTo}`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      translated_text.value = data.responseData.translatedText;
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("copyed")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromtext.value);
      } else {
        navigator.clipboard.writeText(translated_text.value);
      }
    } else {
      let speaks;
      if (target.id == "from") {
        speaks = new SpeechSynthesisUtterance(fromtext.value);
        speaks.lang = langtag[0].value;
        
      } else {
        speaks = new SpeechSynthesisUtterance(translated_text.value);
        speaks.lang = langtag[1].value;  
      }
      speechSynthesis.speak(speaks);
    }
  });
});

exchangelang.addEventListener("click", function(){
    let tempText = fromtext.value;
    fromtext.value = translated_text.value;
    translated_text.value = tempText;

    let tempLang = langtag[0].value;
    langtag[0].value =langtag[1].value;
    langtag[1].value = tempLang;

})

