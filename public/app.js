$(document).ready(() => {
  $.getJSON('/api/todos')
  .then(addTodos)

  $('#todoInput').keypress(event => {
    if (event.which == 13) {
      //create todo
      createTodo();
    }
  })

  $('.list').on('click', 'li', function() {
    updateTodo($(this));
  })

  $('.list').on('click', 'span', function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  })
});

const addTodos = todos => {
  //add todos to the page
  todos.forEach(todo => {
    addTodo(todo)
  });
}

const addTodo = todo => {
  var newTodo = $(`<li data-attr class='task'>${todo.name} <span>x</span></li>`);
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed)
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
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(err => {
    console.log(err);
  })
}

const removeTodo = todo => {
  const clickedId = todo.data('id');
  const deleteUrl = `/api/todos/${clickedId}`;
  $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(data => {
      todo.remove();
    })
    .catch(err => {
      console.log(err);
    })
}

const updateTodo = todo => {
  const updateUrl = `/api/todos/${todo.data('id')}`;
  const isDone = !todo.data('completed');
  const updateData = {completed: isDone};
  $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: updateData
    })
    .then(updatedTodo => {
      todo.toggleClass('done');
      todo.data('completed', isDone);
    })
    .catch(err => {
      console.log(err);
  })
}