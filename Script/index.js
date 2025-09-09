const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};
const menageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const removeActive = () => {
  const btnClass = document.querySelectorAll(".lesson-btn");
  btnClass.forEach((btn) => btn.classList.remove("btn-active"));
};

const loadLevelWord = (id) => {
  menageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayLevelWord(data.data);
      removeActive();
      const lessonClickBtn = document.getElementById(`lesson-btn-${id}`);
      lessonClickBtn.classList.add("btn-active");
    });
};
const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((details) => wordDisplay(details.data));
};

const wordDisplay = (word) => {
  const loadWordDetail = document.getElementById("details-container");
  loadWordDetail.innerHTML = `
  
    <div>
      <h2 class="text-4xl font-semibold">${
        word.word
      }(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
    </div>
    <div class="space-y-3">
      <h3 class="text-2xl font-semibold">Meaning</h3>
      <p class="text-2xl font-medium">${word.meaning}</p>
    </div>
    <div class="space-y-3">
      <h3 class="text-2xl font-semibold">Example</h3>
      <p class="text-2xl font-normal">${word.sentence}</p>
    </div>
    <div class="gap-2">
      <h3 class="font-bangla text-2xl font-medium">সমার্থক শব্দ গুলো</h3>
      <div class="">${createElements(word.synonyms)}</div>
    </div>
      
      `;
  document.getElementById("my_modal_5").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="font-bangla col-span-full  text-center space-y-3 py-10">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-sm font-normal text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-medium text-[#292524]">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    menageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
      <div class="bg-white p-14 gap-6 rounded-xl shadow-sm text-center space-y-6 ">
        <h2 class="text-[32px] font-bold">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="text-[20px] font-medium">Meaning /Pronounciation</p>
        <div class="font-bangla text-[32px] text-[#18181B] text-opacity-80 font-semibold">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"
    }"</div>
        <div class="flex justify-between items-center pt-6">

          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff8a]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff8a]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(wordDiv);
  });
  menageSpinner(false);
};

const displayLesson = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  for (let lesson of lessons) {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-brands fa-leanpub"></i> Lesson -${lesson.level_no}</button>
    `;
    lessonContainer.append(lessonDiv);
  }
};
loadLesson();
