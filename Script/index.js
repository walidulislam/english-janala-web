const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const displayLesson = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  for (let lesson of lessons) {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
    <button class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i> Lesson -${lesson.level_no}</button>
    `;
    lessonContainer.append(lessonDiv);
  }
};
loadLesson();
