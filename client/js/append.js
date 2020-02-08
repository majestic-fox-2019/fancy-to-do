function appendTodos(data) {
  $('#todo-item').html('')
  expired = []
  var cardColor
  let today = new Date()
  if (data.length == 0) {
    $('#todo-item').append(
      '<h4 class="animated fadeIn">Sorry you dont have any todos in this project</h4>'
    )
  }
  data.forEach(el => {
    let date = new Date(el.due_date)
    if (el.status == 'done') {
      cardColor =
        '<div class="card green lighten-1 white-text fadeIn delay-1s animated hoverable">'
    } else if (today > date) {
      cardColor =
        '<div class="card red lighten-1 white-text fadeIn delay-1s animated hoverable">'
      expired.push(el)
    } else {
      cardColor =
        '<div class="card white blue-text darken-3-text fadeIn delay-1s animated hoverable">'
    }
    if (today < date) {
      $('#todo-item').append(
        `<div class="col s12 m12" id="${el.id}">
                  ${cardColor}
                      <div class="card-content">
                          <div class="row">
                              <div class="col m8">
                                  <span class="card-title">${el.title}</span>
                                  <p>Due date : ${new Date(
                                    el.due_date
                                  ).toDateString()}</p>
                                  <br>
                                  <p>${el.description}</p>
                              </div>
                              <div class="col m4">
                                  <a href="#" class="delete-todo btn red" data-id="${
                                    el.id
                                  }""><i class="material-icons prefix">delete</i></a>
                                  <a href="#modal-task" class="edit-todo btn yellow modal-trigger" data-title="${
                                    el.title
                                  }" data-desc="${el.description}" data-date=${
          el.due_date
        } data-id="${el.id}""><i class="material-icons prefix">edit</i></a>
                                  <a href="#" class="patch-todo btn green" data-status="${
                                    el.status
                                  }" data-id="${
          el.id
        }""><i class="material-icons prefix">check</i></a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`
      )
    }
  })
}

function expiredTodos(data) {
  $('#todo-item').html('')
  if (data.length == 0) {
    $('#todo-item').append(
      '<h4 class="animated fadeIn">Sorry you dont have any todos in this project</h4>'
    )
  }
  data.forEach(el => {
    $('#todo-item').append(
      `<div class="col s12 m12" id="${el.id}">
              <div class="card red lighten-1 white-text fadeIn delay-1s animated hoverable">
                    <div class="card-content">
                        <div class="row">
                            <div class="col m8">
                                <span class="card-title">${el.title}</span>
                                <p>Due date : ${new Date(
                                  el.due_date
                                ).toDateString()}</p>
                                <br>
                                <p>${el.description}</p>
                            </div>
                            <div class="col m4">
                                <a href="#" class="delete-todo btn red" data-id="${
                                  el.id
                                }""><i class="material-icons prefix">delete</i></a>
                                <a href="#modal-task" class="edit-todo btn yellow modal-trigger" data-title="${
                                  el.title
                                }" data-desc="${el.description}" data-date=${
        el.due_date
      } data-id="${el.id}""><i class="material-icons prefix">edit</i></a>
                                <a href="#" class="patch-todo btn green" data-status="${
                                  el.status
                                }" data-id="${
        el.id
      }""><i class="material-icons prefix">check</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    )
  })
}

function appendProjects(data) {
  $('#myProjects').empty()
  if (data.length == 0) {
    $('#myProjects').append(` 
            <h5>Sorry you dont have any active project create one? 
            <a href="#projectModal" class="collection-item modal-trigger" id="create-project">click here</a></h5>
            `)
  }
  data.forEach(el => {
    $('#myProjects').append(` 
            <li>
                  <div class="collapsible-header see-detail" data-id=${el.ProjectId}><i class="material-icons">folder_shared</i>${el.Project.name}</div>
                  <div class="collapsible-body project-detail"></div>
            </li>
            `)
  })
}
