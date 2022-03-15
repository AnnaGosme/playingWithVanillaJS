// // add elements to the page

//const body = document.body;
// // body.append("Hello world", " I love Arvo");
// const div = document.createElement("div");
// // div.innerText = "I love Arvo";
// const strong = document.createElement("strong");
// strong.innerText = "Hello world";
// div.append(strong); // most secure
// div.innerHTML = "<strong>Hello world </strong>"; // huge security concern if user can inject code but is only way to add HTMl from a string into an element
// body.append(div);

// // const div = document.querySelector("div");
// // console.log(div.textContent); // prints exact content including spaces etc
// // console.log(div.innerText); // prints only visible text per CSS rules

const body = document.body;
const div = document.querySelector("div");
const spanHi = document.querySelector("#hi");
const spanBye = document.querySelector("#bye");

spanBye.remove();
div.append(spanBye);

div.removeChild(spanBye);

// console.log(spanHi.getAttribute("id"));
// console.log(spanHi.title);

console.log(spanHi.setAttribute("id", "ArvoDoIt"));
spanHi.id = "ANewTitle";

spanHi.removeAttribute("id");

console.log(spanHi.dataset);
console.log(spanHi.dataset.longerName);
spanHi.dataset.newName = "Anothernewname";
console.log(spanHi.dataset.newName);

spanHi.classList.add("class3");
console.log(spanHi.classList);
spanHi.classList.remove("class1");
console.log(spanHi.classList);

spanHi.classList.toggle("class1", true);

spanHi.style.color = "red";
spanHi.style.backgroundColor = "purple";
