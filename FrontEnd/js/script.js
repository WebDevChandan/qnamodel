const subBtn = document.querySelector(".submit-btn"),
  loader_container = document.querySelector(".loader-container"),
  loader = document.querySelector(".loader"),
  fields = document.querySelectorAll(['textarea', 'input']),
  textField = document.querySelector("textarea"),
  qstField = document.querySelector('input[type*="text"]'),
  mic = document.querySelectorAll(".mic"),
  mic1 = document.querySelector(".mic1"),
  mic2 = document.querySelector(".mic2"),
  spkr = document.querySelector(".fa-volume-high"),
  ans = document.querySelector(".answer"),
  radBtn = document.querySelectorAll(".radio_Btn"),
  engBtn = document.querySelector(".eng_Btn"),
  hiBtn = document.querySelector(".hi_Btn"),
  maithliBtn = document.querySelector(".maithili_Btn");



let chosenLanguage;

//Loader after submiting btn
subBtn.addEventListener('click', (e) => {
  if (
    !textField.value ||
    !qstField.value ||
    (textField.value.charCodeAt() && qstField.value.charCodeAt() === 32)
  ) {
    e.preventDefault();
    return;
  }
  e.preventDefault();
  ans.innerText="";
  if (ans.innerHTML == "") {
    e.preventDefault();
    loader.classList.add("showLoader");
    loader.classList.remove("hideLdr");
    loader_container.classList.remove("hideLdr");
  }
})

const disabledLangBtn = () => {
  if (chosenLanguage === "hi-IN") engBtn.setAttribute("disabled", "");
  else if(chosenLanguage === "en-GB") hiBtn.setAttribute("disabled", "");
  else maithliBtn.setAttribute("disabled", "");
}
const enableLangBtn = () => {
  if (chosenLanguage === "hi-IN") engBtn.removeAttribute("disabled", "");
  else if(chosenLanguage === "en-GB") hiBtn.removeAttribute("disabled", "");
  else maithliBtn.removeAttribute("disabled", "");
};

// As Fileds get any character, langBtn & DemoBtn get disabled and enabled if Fields get empty 
fields.forEach((field) => {
  if (field === textField || field === qstField) {
    field.addEventListener("keyup", () => {
      if (!textField.value && !qstField.value) {
        enableLangBtn();
        enableDemoBtn();
      } else {
        disabledLangBtn();
        pauseDemoBtn();
      }
    });
  }

})

mic.forEach((getMic) => {
  getMic.addEventListener('click', () => {
    disabledLangBtn();
  })
})

// Microphone Access
mic1.addEventListener('click', () => { record1(chosenLanguage) });
// For Mic1
function record1(lang) {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = lang;
  recognition.onresult = function (event) {
    let getVoice = event.results[0][0].transcript;
    textField.value = getVoice;
  };
  recognition.start();
}

mic2.addEventListener('click', () => { record2(chosenLanguage) });
//For Mic2
function record2(lang) {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = lang;
  recognition.onresult = function (event) {
    let getVoice = event.results[0][0].transcript;
    qstField.value = getVoice;
  };
  recognition.start();
}



// Text to Speech
let synth = speechSynthesis;

window.onload = () => {
  if (ans.innerHTML !== "" && ans.innerHTML !== "{{Answer}}") {
    textToSpeech(ans.innerHTML);
  }
}
spkr.addEventListener("click", () => {
  if (ans.innerHTML !== "" && ans.innerHTML !== "{{Answer}}") {
    textToSpeech(ans.innerHTML);
  }
});

const textToSpeech = (text) => {

  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.lang === chosenLanguage)
      utterance.voice = voice;
  }
  synth.speak(utterance);
};

//Chose Language
radBtn.forEach((btn) => {
  if (btn.checked) {
    chosenLanguage = btn.value;
  }
  btn.addEventListener("click", () => {
    chosenLanguage = btn.value;
    if (btn.value === "hi-IN") {
      localStorage.setItem("hiLng", "checked");
      hiBtn.setAttribute(localStorage.getItem('hiLng'), '');
      localStorage.setItem('engLng', 'null');
      engBtn.removeAttribute('checked', "");
      localStorage.setItem("mathiliLng", "null");
      maithliBtn.removeAttribute('checked', "");
    } else if(btn.value==="en-GB") {
      localStorage.setItem("engLng", "checked");
      engBtn.setAttribute(localStorage.getItem("engLng"), "");
      localStorage.setItem("hiLng", "null");
      hiBtn.removeAttribute('checked', "");
      localStorage.setItem("mathiliLng", "null");
      maithliBtn.removeAttribute('checked', "");
    }else{
      localStorage.setItem("mathiliLng", "checked");
      maithliBtn.setAttribute(localStorage.getItem("mathiliLng"), "");
      localStorage.setItem("hiLng", "null");
      hiBtn.removeAttribute('checked', "");
      localStorage.setItem('engLng', 'null');
      engBtn.removeAttribute('checked', '');
    }
  });
});


// Demo Content Display
const pstTxtBtn = document.querySelector(".pst_txt"),
  pstQstBtn = document.querySelector(".pst_qst"),
  demoPstBtn = document.querySelectorAll([".pst_txt", ".pst_qst"]);

const pauseDemoBtn = (demoBtn) => {
  if (demoBtn === 'demoTxtBtn') {
    pstTxtBtn.setAttribute("disabled", "");
    pstTxtBtn.style.color = "var(--disabled)";
    pstTxtBtn.style.cursor = "not-allowed";
  } else if (demoBtn === 'demoQstBtn') {
    pstQstBtn.setAttribute("disabled", "");
    pstQstBtn.style.color = "var(--disabled)";
    pstQstBtn.style.cursor = "not-allowed";
  } else {
    demoPstBtn.forEach((demBtn) => {
      demBtn.setAttribute("disabled", "");
      demBtn.style.color = "var(--disabled)";
      demBtn.style.cursor = "not-allowed";
    })
  }
}
const enableDemoBtn = () => {
  demoPstBtn.forEach((demBtn) => {
    demBtn.removeAttribute("disabled", "");
    demBtn.style.backgroundColor = "transparent";
    demBtn.style.cursor = "pointer";
  });
}


const demoContents = [
  {
    engTxt:
      "New York (CNN) -- More than 80 Michael Jackson collectibles -- including the late pop star's famous rhinestone-studded glove from a 1983 performance -- were auctioned off Saturday, reaping a total $2 million. Profits from the auction at the Hard Rock Cafe in New York's Times Square crushed pre-sale expectations of only $120,000 in sales. The highly prized memorabilia, which included items spanning the many stages of Jackson's career, came from more than 30 fans, associates and family members, who contacted Julien's Auctions to sell their gifts and mementos of the singer. Jackson's flashy glove was the big-ticket item of the night, fetching $420,000 from a buyer in Hong Kong, China. Jackson wore the glove at a 1983 performance during \"Motown 25,\" an NBC special where he debuted his revolutionary moonwalk. Fellow Motown star Walter \"Clyde\" Orange of the Commodores, who also performed in the special 26 years ago, said he asked for Jackson's autograph at the time, but Jackson gave him the glove instead. 'The legacy that [Jackson] left behind is bigger than life for me,' Orange said. \"I hope that through that glove people can see what he was trying to say in his music and what he said in his music.\" Orange said he plans to give a portion of the proceeds to charity. Hoffman Ma, who bought the glove on behalf of Ponte 16 Resort in Macau, paid a 25 percent buyer's premium, which was tacked onto all final sales over $50,000. Winners of items less than $50,000 paid a 20 percent premium.",
    engQst: "Where was the Auction held?",
  },
  {
    hiTxt:
      "एक लड़का है जिसका नाम निशांत है। वह हाजीपुर में रहता है। उसे क्रिकेट खेलना पसंद है। उसके तीन दोस्त हैं। उसके दोस्तों के नाम पुष्पराज, चंदन और राजकुमार हैं। वे सभी cvrgu में पढ़ते हैं। पुष्पराज सबसे शरारती लड़का है।",
    hiQst: "उसके कितने दोस्त हैं ?",
  },
  {
    maithTxt:
      "निशांत नामक एकटा लड़का अछि। ओ हाजीपुर मे रहैत छथि। हुनका क्रिकेट खेलनाय नीक लगैत छनि। तीन टा संगी छन्हि। हिनकर मित्रक नाम पुष्पराज, चंदन आ राजकुमार अछि । सब cvrgu मे पढ़ैत छथि। पुष्पराज सबसँ शरारती लड़का अछि।",
    maithQst: "लड़का के नाम की छै?",
  },
];

pstTxtBtn.addEventListener('click', () => {
  console.log(chosenLanguage);
  if (localStorage.getItem('engLng') == "checked" || engBtn.checked) {
    textField.innerHTML = demoContents[0].engTxt;
    hiBtn.setAttribute("disabled", "");
    maithliBtn.setAttribute("disabled", "");
  }
  else if(localStorage.getItem('hiLng') == "checked" || hiBtn.checked)  {
    textField.innerHTML = demoContents[1].hiTxt;
    engBtn.setAttribute("disabled", "");
    maithliBtn.setAttribute("disabled", "");
  }else{
    textField.innerHTML = demoContents[2].maithTxt;
    hiBtn.setAttribute("disabled", "");
    engBtn.setAttribute("disabled", "");
  }
  pauseDemoBtn("demoTxtBtn");
})
pstQstBtn.addEventListener("click", () => {
  if (localStorage.getItem('engLng') == "checked" || engBtn.checked) {
    qstField.value = demoContents[0].engQst;
    hiBtn.setAttribute("disabled", "");
    maithliBtn.setAttribute("disabled", "");
  }
  else if(localStorage.getItem('hiLng') == "checked" || hiBtn.checked)  {
    qstField.value = demoContents[1].hiQst;
    engBtn.setAttribute("disabled", "");
    maithliBtn.setAttribute("disabled", "");
  }else{
    qstField.value = demoContents[2].maithQst;
    hiBtn.setAttribute("disabled", "");
    engBtn.setAttribute("disabled", "");
  }
  pauseDemoBtn("demoQstBtn");
});


// Start Tutorial
const tour = document.querySelector(".tutorial"),
  next = tour.querySelector(".next"),
  prev = tour.querySelector(".prev"),
  message = tour.querySelector(".message");


let steps = ["step-1", "step-2", "step-3", "step-4"],
  step_count = 0,
  carrot_direct = ["carr_left", "carr_right"],
  carrot_toggle = true;

const tutor_mess = [
  {
    mess: "Start by Choosing your <b>Language</b>",
  },
  {
    mess: "Enter your <b>Text</b>",
  },
  {
    mess: "Enter your <b>Question</b>",
  },
  {
    mess: 'Click here to "<b>GET ANSWER</b>"',
  },
];

document.querySelector('.skip').addEventListener('click', () => {
  tour.style.display = "none";
  tour.classList.add("hide_tutorial");
})

next.addEventListener('click', () => {
  if (step_count <= 3) {

    tour.classList.remove(steps[step_count - 1]);
    letsTour(steps, carrot_direct);

    if (carrot_toggle)
      document.querySelector(".carrot").classList.remove(carrot_direct[0]);
    else
      document.querySelector(".carrot").classList.remove(carrot_direct[1]);
  } else {
    next.classList.remove("tut_btn_grad");
    prev.classList.add("tut_btn_grad");
  }
})

prev.addEventListener('click', () => {
  if (step_count > 1) {
    tour.classList.remove(steps[step_count - 1]);
    tour.classList.add(steps[step_count - 2]);
    document.querySelector(".step_label").innerHTML =
      steps[step_count - 2] + `:`;
    message.innerHTML = tutor_mess[step_count - 2].mess;
    step_count--;

    if (carrot_toggle) {
      document.querySelector(".carrot").classList.add(carrot_direct[0]);
      document.querySelector(".carrot").classList.remove(carrot_direct[1]);
      carrot_toggle = false;
    } else {
      document.querySelector(".carrot").classList.add(carrot_direct[1]);
      document.querySelector(".carrot").classList.remove(carrot_direct[0]);
      carrot_toggle = true;
    }
  } else {
    next.classList.add("tut_btn_grad");
    prev.classList.remove("tut_btn_grad");
  }
})

function letsTour(stpsArr, carrt_drct) {
  message.innerHTML = tutor_mess[step_count].mess;
  document.querySelector(".step_label").innerHTML = stpsArr[step_count] + `:`;
  tour.classList.add(stpsArr[step_count]);
  step_count++;
  if (carrot_toggle) {
    document.querySelector(".carrot").classList.add(carrt_drct[0]);
    carrot_toggle = false;
  } else {
    document.querySelector(".carrot").classList.add(carrt_drct[1]);
    carrot_toggle = true;
  }
}
letsTour(steps, carrot_direct);


//Reading File as TExt
const fileInput = document.getElementById("dockfile"),
  fileData = document.querySelector('.fileData'),
  progressContainer = document.querySelector('.progressbar-container');

document.querySelector('.file_upload_btn').addEventListener('click', (e) => {
  e.preventDefault();
  return false;
});

fileInput.addEventListener('change', (e) => {
  let files = fileInput.files;

  if (files.length == 0 || textField.value.length !== 0) return;

  let file = files[0],
    fileName = file.name,
    fileSize = Math.round(file.size * 0.001),
    fileFormat = fileName.split('.')[1];
  fileData.style.color = "var(--text-color)";

  switch (fileFormat) {
    case "txt":
      convertDocFileToTxt(file, fileName, fileSize);
      fileData.style.display = "block";
      progressContainer.style.display = "none";
      disabledLangBtn();
      pauseDemoBtn();
      break;

    case "png":
      convertImgFileToText(file, fileName, fileSize);
      fileData.style.display = "none";
      progressContainer.style.display = "flex";
      disabledLangBtn();
      pauseDemoBtn();
      break;

    default:
      console.log(fileFormat);
      fileData.innerText = "Invalid File Format";
      fileData.style.color = "red";
      fileData.style.display = "block";
      progressContainer.style.display = "none";
      break;
  }
}
);

//CONVERTING TEXTFILE(DOC) TO TEXT 
function convertDocFileToTxt(file, fileName, fileSize) {

  //Fetching Text File
  const reader = new FileReader();
  reader.readAsText(file);

  reader.addEventListener('load', (e) => {
    const fileText = reader.result;
    const fileTextLines = fileText.split(/\r\n|\n/);
    textField.value = fileTextLines.join("\n");
  });

  //If any error encounter
  reader.onerror = (e) => alert(e.target.error.name);

  //File Details Fetch
  fileData.innerText = `${fileName}, ${fileSize}KB`;

}

//CONVERTING AN IMAGE TO TEXT
function convertImgFileToText(file, fileName, fileSize) {
  //Image Details Fetch
  var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }));

  const rec = new Tesseract.TesseractWorker();
  rec.recognize(file)
    .progress(function (response) {
      if (response.status == 'recognizing text') {
        document.querySelector('.progressbar').style.width = `${Math.floor(response.progress * 100)}%`;
        document.querySelector('.img_upld_status').innerText = `Uploading... ${Math.floor(response.progress * 100)}%`;
      }

      document.querySelector('.imageData').innerText = `${fileName}, ${fileSize}KB `;
    })
    .then(function (data) {
      textField.value = data.text;
      document.querySelector('.img_upld_status').innerText = `Uploaded 100%`;
    })
}

// LocalStorage
const storedLang = () => {
  //Checking which previous Language was Selected & set the default selected langauge
  if (localStorage.getItem("hiLng") && localStorage.getItem("engLng") && localStorage.getItem("mathiliLng")) {
    if (localStorage.getItem("hiLng") !== "null")
      hiBtn.setAttribute(localStorage.getItem("hiLng"), "");
    else if(localStorage.getItem("engLng") !== "null")
       engBtn.setAttribute(localStorage.getItem("engLng"), "");
    else
       maithliBtn.setAttribute(localStorage.getItem("mathiliLng"), "");

  } else maithliBtn.setAttribute("checked", "");

  //Checking Tutorial has done or Not
  if (!localStorage.getItem("tutorial")){
    localStorage.setItem("tutorial", "done");
    tour.style.display="block";
  }
  else
    tour.classList.add("hide_tutorial");
};
storedLang();