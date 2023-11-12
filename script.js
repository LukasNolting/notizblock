let headline = [];
let contentText = [];
let headlineDel = [];
let contentTextDel = [];
load();
loadDel();

function render() {
  let contentHead = document.getElementById("contentHead");

  contentHead.innerHTML = `
    <div class="new-card">
      <div class="card-input">
        <textarea type="text" placeholder="Überschrift eingeben..." class="card-head" id="input-head"></textarea>
        <textarea placeholder="Notiz eingeben..." class="card-content" id="input-content"></textarea>
      </div>
      <button class="card-button-add" onclick="addNote()"></button>
    </div>
  `;

  let contentCards = document.getElementById("contentCards");
  contentCards.innerHTML = "";

  let inputHead = document.getElementById("input-head").value;
  let inputContent = document.getElementById("input-content").value;

  //   if (inputHead == "" || inputContent == "") {
  //     alert("Bitte alle Felder ausfüllen!");
  //   } else {
  for (let i = 0; i < headline.length; i++) {
    const head = headline[i];
    const contentNote = contentText[i];
    contentCards.innerHTML += `
        <div class="card">
          <div class="card-input">
            <div class="card-head">${head}</div>
            <textarea class="card-content">${contentNote}</textarea>
          </div>
          <button class="card-button-remove" onclick="delNotes(${i})"></button>
        </div>
      `;
  }
}
// }

function addNote() {
  let headInput = document.getElementById("input-head");
  let contentInput = document.getElementById("input-content");
  headline.push(headInput.value);
  contentText.push(contentInput.value);
  render();
  save();
}

function save() {
  let headAsText = JSON.stringify(headline);
  let contentAsText = JSON.stringify(contentText);
  localStorage.setItem("headline", headAsText);
  localStorage.setItem("contentText", contentAsText);
}

function load() {
  let headAsText = localStorage.getItem("headline");
  let contentAsText = localStorage.getItem("contentText");
  if (headAsText && contentAsText) {
    headline = JSON.parse(headAsText);
    contentText = JSON.parse(contentAsText);
  }
}

function delNotes(i) {
  headlineDel.push(headline[i]);
  contentTextDel.push(contentText[i]);
  saveDel(i);
  deleteNote(i);
}

function saveDel() {
  let headAsTextDel = JSON.stringify(headlineDel);
  let contentAsTextDel = JSON.stringify(contentTextDel);
  localStorage.setItem("headlineDel", headAsTextDel);
  localStorage.setItem("contentTextDel", contentAsTextDel);
}

function loadDel() {
  let headAsTextDel = localStorage.getItem("headlineDel");
  let contentAsTextDel = localStorage.getItem("contentTextDel");
  if (headAsTextDel && contentAsTextDel) {
    headlineDel = JSON.parse(headAsTextDel);
    contentTextDel = JSON.parse(contentAsTextDel);
  }
}

function deleteNote(i) {
  headline.splice(i, 1);
  contentText.splice(i, 1);
  render();
  save();
}

function renderDel() {
  let contentCardsDel = document.getElementById("contentCardsDel");
  contentCardsDel.innerHTML = "";

  for (let i = 0; i < headlineDel.length; i++) {
    const headDel = headlineDel[i];
    const contentNoteDel = contentTextDel[i];
    contentCardsDel.innerHTML += `
      <div class="card">
        <div class="card-input">
          <div class="card-head">${headDel}</div>
          <textarea class="card-content">${contentNoteDel}</textarea>
        </div>
        <button class="card-button-remove" onclick="deleteNoteFinal(${i})"></button>
      <button class="card-button-restoration" onclick="restorateNote(${i})"></button>
        </div>
    `;
  }
}

function restorateNote(i) {
  headline.push(headlineDel[i]);
  contentText.push(contentTextDel[i]);
  save();
  deleteNoteFinal(i);
}

function deleteNoteFinal(i) {
  headlineDel.splice(i, 1);
  contentTextDel.splice(i, 1);
  renderDel();
  saveDel();
}
