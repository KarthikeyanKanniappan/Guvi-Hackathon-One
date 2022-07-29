let main = document.getElementById("main");

// Creating Header Tag
let Header = document.createElement("header");
Header.classList.add("container-fluid", "head");
Header.innerHTML = `<img
src="https://i.pinimg.com/564x/c9/fc/da/c9fcdaa6dd0cbf02b64d5dfae08a8f45.jpg"
alt="pokemon Logo"
class="img-thumbnail header mt-3 mb-3 "
/>
<h1 class="headTitle mx-auto">Welcome to Pokemon World</h1>`;
main.append(Header);

// Card - Creation;
let row = document.querySelector(".row");

// Fetching Api by using Async await
async function poke(offset) {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}/`
    );
    let data = await response.json();
    let result = data.results;
    let x = 1;
    result.forEach(async (el) => {
      let url = el.url;
      let image = await pokemon(url);
      let id = await pokemonId(url);
      let des = await pokemonDescription(id);
      let description = des === "undefined" ? "Pokemon Go" : des;
      let div = document.createElement("div");
      div.classList.add("col-lg-4", "col-md-6", "mx-auto");
      // div.style = "width: 18rem";
      div.innerHTML = `
      <div class="card mx-auto mt-5 " style="width: 18rem">
      <img
      src="${image}"
      class="card-img-top mx-auto mt-3"
      alt="${el.name}"
    />
    <div class="card-body">
      <h5 class="card-title">${el.name.toUpperCase()}</h5>
      <p class="card-text">
      ${description}
      </p>
      <a href="" id =${id} class="btn btn-light btn-lg common">Ability & Moves</a>
    </div>
  </div>`;
      x++;
      row.append(div);
      // let button = document.querySelector(".common");
      // butt.push(button);
    });
    // for (const el of butt) {
    //   console.log(el);
    //   el.addEventListener("click", buttonClicked);
    // }
    // console.log(butt);
  } catch (err) {
    console.log(err);
  }
}

// fetching image for the pokemon
async function pokemon(url) {
  try {
    let response1 = await fetch(`${url}`);
    let data1 = await response1.json();
    // console.log(data1);
    return data1.sprites.other.dream_world.front_default;
  } catch (err) {
    console.log(err);
  }
}

// fetching id of pokemon
async function pokemonId(url) {
  try {
    let response1 = await fetch(`${url}`);
    let data1 = await response1.json();
    return data1.id;
  } catch (err) {
    console.log(err);
  }
}

// Fetching discription of pokemon
async function pokemonDescription(url) {
  try {
    let response1 = await fetch(
      `https://pokeapi.co/api/v2/characteristic/${url}/`
    );
    let data1 = await response1.json();
    return data1.descriptions[7].description;
  } catch (err) {
    return "undefined";
  }
}

// pagination elements
let div1 = document.createElement("div");
div1.classList.add("pagination", "mt-5", "mb-5");
div1.innerHTML = `<a class="previous" href="#">&laquo;</a>
<a href="#">1</a>
<a href="#">2</a>
<a href="#">3</a>
<a href="#">4</a>
<a href="#">5</a>
<a class="previous" href="#">&raquo;</a>
`;
poke(0);
document.body.append(div1);

let pre = document.querySelector(".previous");
let paginate = document.querySelector(".pagination");
paginate.addEventListener("click", (e) => {
  let currentPage = e.target.textContent;
  console.log(currentPage);
  if (currentPage === "«") {
    let fiveMultiple = 0 * 10;
    Display(row, fiveMultiple);
  } else if (currentPage === "»") {
    let fiveMultiple = 5 * 10;
    Display(row, fiveMultiple);
  } else {
    let fiveMultiple = currentPage * 10;
    Display(row, fiveMultiple);
  }
});

function Display(wrapper, multi) {
  wrapper.innerHTML = "";
  poke(multi);
}

// About Ability and moves
function buttonClicked(e) {
  e.preventDefault();
  let clas = e.target.classList[3];
  if (clas === "common") {
    let id = e.target.id;
    divCreation(id);
    let slide = document.querySelector(".slide");
    abili.innerHTML = "";
    slide.classList.remove("hidden");
  }
}

let PokeCard = document.getElementById("pokeCard");
PokeCard.addEventListener("click", buttonClicked);

async function divCreation(id) {
  try {
    let response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data1 = await response1.json();
    let name = data1.species.name;
    let weight = data1.weight;
    let moves = data1.moves;
    let ab1 = data1.abilities[0].ability.name;
    let ab2 = data1.abilities[1].ability.name;
    let image = await pokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let div = document.createElement("div");
    div.classList.add("slide");

    div.innerHTML = `
    
    <div class="card mb-3 overflow-auto Hori " style="max-height:50rem max-width: 50rem">
    <div class="row no-gutters ">
    <button type="button" class="btn btn-light recipeClose mx-3">
      <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="col-md-4">
        <img src="${image}" class="card-img" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body card-big">
          <h5 class="card-title">${name}</h5>
          <p class="card-text"><b>Weight</b> = ${weight}</p>
          <p class="card-text"><b>Abilities</b>
          <ul><li>${ab1}</li>
          <li>${ab2}</li></ul></p>
          <p class="card-text"><b> Moves</b>
          <div class ="ul"></div></p>
        </div>
      </div>
    </div>
  </div>`;
    let abili = document.getElementById("abili");
    abili.append(div);

    let ul = document.querySelector(".ul");
    let x = 1;

    for (let i = 0; i < 5; i++) {
      let li = document.createElement("li");
      li.textContent = `${moves[i].move.name}`;
      ul.append(li);
    }

    let recipeClose = document.querySelector(".recipeClose");
    recipeClose.addEventListener("click", () => {
      let slide = document.querySelector(".slide");
      slide.classList.add("hidden");
    });
  } catch (err) {
    console.log(err);
  }
}
