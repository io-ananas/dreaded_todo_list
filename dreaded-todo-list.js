"use strict";

// Api: 5c81461acac6621685acbc88
// https://todolist-7697.restdb.io/rest/todo

function post(newTodo) {
  fetch("https://todolist-7697.restdb.io/rest/todo", {
    method: "post",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c81461acac6621685acbc88",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      form.elements.submit.disabled = false;
      showTasks(data);
    });
}

function get() {
  fetch("https://todolist-7697.restdb.io/rest/todo", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c81461acac6621685acbc88",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    //.then(e => console.log(e));
    .then(data => {
      data.forEach(showTasks);
    });
}

function showTasks(todolist) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = todolist.description;
  clone.querySelector("h2").textContent = todolist.category;
  clone.querySelector(".importance").textContent = todolist.importance;
  clone.querySelector(".forwhen").textContent = todolist.date;

  clone.querySelector(".done").addEventListener("click", e => {
    ///console.log(e.target);
    e.target.parentElement.remove();
    taskDone(todolist._id);
  });
  document.querySelector("main").appendChild(clone);
}

function taskDone(id) {
  fetch("https://todolist-7697.restdb.io/rest/todo" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c81461acac6621685acbc88",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

get();

const form = document.querySelector("form");
form.addEventListener("submit", e => {
  form.elements.submit.disabled = true;
  e.preventDefault();
  console.log("submitted");
  const payload = {
    description: form.elements.description.value,
    category: form.elements.category.value,
    importance: form.elements.importance.value,
    date: form.elements.date.value
  };
  post(payload); // called payload because of airplane dropping stuff
});
