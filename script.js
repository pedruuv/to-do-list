const inNewTask = document.querySelector("#inNewTask");
const btnNewTask = document.querySelector("#btnNewTask");
const toDoList = document.querySelector("#toDoList");
const localStorageKey = "to-do-list";

let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

function validateIfExistsNewTask(newTask) {
  let exists = values.find((x) => x.name == newTask);
  return !exists ? false : true;
}

function addNewTask() {
  let newTask = inNewTask.value;
  inNewTask.style.border = "";

  if (!inNewTask.value) {
    inNewTask.style.border = "2px solid red";
    alert("Digite algo para inserir em sua lista");
    inNewTask.focus();
    return;
  } else if (validateIfExistsNewTask(newTask)) {
    alert("Já existe uma task com essa descrição!");
    inNewTask.focus();
    return;
  } else {
    values.push({ name: newTask });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    inNewTask.value = "";
    inNewTask.focus();
    showValues();
  }
}
btnNewTask.addEventListener("click", addNewTask);

function showValues() {
  toDoList.innerHTML = "";
  for (let i = 0; i < values.length; i++) {
    toDoList.innerHTML += `<li>${values[i]["name"]}<button id='btnOk' onclick ='removeItem("${values[i]["name"]}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg></button></li>`;
  }
}

function removeItem(data) {
  let index = values.findIndex((x) => x.name == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}

showValues();
