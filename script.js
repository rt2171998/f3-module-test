const api_key = " RvUauES8ANwnRZaVbODWZqxAMeAo4IcQKy6a0alf ";

/////////////////////////////
//dom elements
const form_el = document.querySelector("#search-form");
const date_input = document.querySelector("#search-input");
console.log(form_el, date_input);
const image_container = document.querySelector("#current-image-container");
console.log(image_container);
const search_list_el = document.querySelector("#search-history");
console.log(search_list_el);

const search_history = JSON.parse(localStorage.getItem("history")) || [];
window.addEventListener("load", async () => {
  image_container.innerHTML = "";
  const currentDate = new Date().toISOString().split("T")[0];
  await getcurrentImageoftheDay(currentDate);
});

form_el.addEventListener("submit", async (e) => {
  e.preventDefault();
  const date = form_el.elements.search.value;

  console.log("hello", date);
  await getImageoftheDay(date);

  form_el.reset();
});

async function getcurrentImageoftheDay(date) {
  const api_url = `https://api.nasa.gov/planetary/apod?api_key=RvUauES8ANwnRZaVbODWZqxAMeAo4IcQKy6a0alf&date=${date}`;
  let response = await fetch(api_url);
  let data = await response.json();
  console.log(data);
  if (data.url) {
    image_container.innerHTML = "";
    const html = `<h1>NASA Picture of the day</h1>
      <img
        src="${data.hdurl}"
        alt="image"
      />
      <h2>"${data.title}"</h2>
      <p>
        ${data.explanation}
      </p>`;
    image_container.insertAdjacentHTML("afterbegin", html);
  } else {
    image_container.innerHTML = "";

    const html = `<h2>Error:${data.msg}</h2>`;
    image_container.innerHTML = html;
  }
}
async function getImageoftheDay2(date) {
  try {
    const api_url = `https://api.nasa.gov/planetary/apod?api_key=RvUauES8ANwnRZaVbODWZqxAMeAo4IcQKy6a0alf&date=${date}`;
    let response = await fetch(api_url);
    let data = await response.json();
    console.log(data);
    if (data.url) {
      image_container.innerHTML = "";
      const html = `<h1>Picture of date :${data.date}</h1>
      <img
        src="${data.hdurl}"
        alt="image"
      />
      <h2>"${data.title}"</h2>
      <p>
        ${data.explanation}
      </p>`;
      image_container.insertAdjacentHTML("afterbegin", html);

      addSearchtoHistory();
    } else {
      image_container.innerHTML = "";

      const html = `<h2>Error:${data.msg}</h2>`;
      image_container.innerHTML = html;
    }
  } catch (error) {
    console.log(error);
  }
}
async function getImageoftheDay(date) {
  const api_url = `https://api.nasa.gov/planetary/apod?api_key=RvUauES8ANwnRZaVbODWZqxAMeAo4IcQKy6a0alf&date=${date}`;
  let response = await fetch(api_url);
  let data = await response.json();
  console.log(data);
  if (data.url) {
    image_container.innerHTML = "";
    const html = `<h1>Picture of date :${data.date}</h1>
      <img
        src="${data.hdurl}"
        alt="image"
      />
      <h2>"${data.title}"</h2>
      <p>
        ${data.explanation}
      </p>`;
    image_container.insertAdjacentHTML("afterbegin", html);
    saveSearch(data.date);
    addSearchtoHistory();
  } else {
    image_container.innerHTML = "";

    const html = `<h2>Error:${data.msg}</h2>`;
    image_container.innerHTML = html;
  }
}
function saveSearch(date) {
  search_history.push({
    date: date,
  });
  localStorage.setItem("history", JSON.stringify(search_history));
}
function addSearchtoHistory() {
  search_list_el.innerHTML = "";
  let history_list = JSON.parse(localStorage.getItem("history"));
  const list_el = document.createElement("ul");
  history_list.forEach((date) => {
    const li_el = document.createElement("li");
    li_el.textContent = date.date;
    let objdate = date.date;
    list_el.appendChild(li_el);
    li_el.setAttribute("id", `${date.date}`);
    li_el.addEventListener("click", () => {
      getImageoftheDay2(objdate);
    });
  });
  search_list_el.appendChild(list_el);
}
