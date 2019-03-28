$(document).ready(() => {
  $.getJSON('/api/todos')
  .then(addTodos)

  $('#todoInput').keypress(event => {
    if (event.which == 13) {
      //create todo
      createTodo();
    }
  })
});

const addTodos = todos => {
  //add todos to the page
  todos.forEach(todo => {
    addTodo(todo)
  });
}

const addTodo = todo => {
  const newTodo = $(`<li class='task'>${todo.name}</li>`);
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}

const createTodo = todo => {
  //send request to create todo
  const usrInput = $('#todoInput').val();
  $.post('/api/todos', {name: usrInput})
  .then(newTodo => {
    console.log(newTodo);
  })
  .catch(err => {
    console.log(err);
  })
}