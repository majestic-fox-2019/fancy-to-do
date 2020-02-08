class Component {
  static showRegister() {
    $('.ui.basic.modal')
      .modal({
        closable: false,
        allowMultiple: true
      })
      .modal('show')
  }

  static error(message) {
    let errmsg = `
             <div class="ui error message" style="display: none;">
              <p class="text-xl">${message}</p>
            </div>
             `
    return errmsg
  }

  static showSidebar(event) {
    event.preventDefault()
    $('.ui.labeled.icon.sidebar').sidebar('toggle')
  }

  static todocards(todo) {
    let date = this.dateFormatter(todo.due_date)
    let status = this.statusToUpdate(todo.status)
    let content = `
        <div class="card">
                <div class="content">
                  <div class="header text-center">
                    ${todo.title}
                  </div>
                  <div class="meta text-center my-3">
                    ${date}
                  </div>
                  <div class="description">
                    ${todo.description}
                  </div>
                </div>
                <div class="extra content">
                  <div class="ui two buttons">
                    <button class="ui basic green button ${
                      status.downgradeDisable
                    }" 
                    onclick="Homepage.updateStatus(${todo.id}, '${
      status.downgrade
    }')">
                    ${status.downgrade.toUpperCase()}
                    </button>
                    
                    <button class="ui basic red button ${
                      status.upgradeDisable
                    }" 
                    onclick="Homepage.updateStatus(${todo.id}, '${
      status.upgrade
    }')">
                    ${status.upgrade.toUpperCase()}
                    </button>
                  </div>
                  <div class="ui center aligned mt-4">
                    <button class="ui basic primary button" onclick="Component.showTodoDetail('${
                      todo.id
                    }','${todo.title}','${todo.description}','${
      todo.due_date
    }')">DETAILS</button>
                  </div>
                </div>
              </div>
      `
    return content
  }

  static dateFormatter(ISOdate) {
    return new Date(ISOdate).toDateString()
  }

  static statusToUpdate(status) {
    const statusList = ['undone', 'doing', 'done']
    const index = statusList.indexOf(status)
    let result = {}
    if (index == 0) {
      result.downgradeDisable = 'disabled'
      result.upgrade = statusList[index + 1]
      result.downgrade = 'undone'
    } else if (index == 2) {
      result.upgradeDisable = 'disabled'
      result.upgrade = 'done'
      result.downgrade = statusList[index - 1]
    } else {
      result.upgrade = statusList[index + 1]
      result.downgrade = statusList[index - 1]
    }
    return result
  }

  static showTodoDetail(id, title, description, due_date) {
    let modal = Component.detailModal({ id, title, description, due_date })
    $('#detail-modal').empty()
    $('#detail-modal').append(modal)
    $('#detail-modal')
      .modal({ closable: false })
      .modal('show')
  }

  static detailModal(todo) {
    // console.log(todo)
    const content = `
        <div class="header">
          ${todo.title}
        </div>
        <div class="content">
          <form class="ui form" id="update" onsubmit=(Homepage.update(event)) data-id="${
            todo.id
          }">
            <div class="field">
              <label class="text-xl">Todo Title</label>
              <input
                type="text"
                name="title-update-todo"
                placeholder="Todo title"
                value="${todo.title}"
              />
            </div>
            <div class="field">
              <label class="text-xl">Todo Description</label>
              <textarea
                name="description-update-todo"
                cols="30"
                rows="10"
                placeholder="Description"
                value="${todo.description}"
              >${todo.description}</textarea>
            </div>
            <div class="field">
              <label class="text-xl">Due Date</label>
              <input type="date" name="due_date-update-todo" value="${new Date(
                todo.due_date
              )
                .toISOString()
                .substring(0, 10)}"/>
            </div>
            <div class="ui field center aligned middle aligned grid">
              <button
                type="submit"
                class="ui positive right labeled icon button"
              >
                <i class="checkmark icon"></i>
                Update
              </button>
              <button
                type="button"
                class="ui negative right labeled icon button ml-10"
                id="delete-personal-todo"
                onclick="Homepage.deleteTodo(event)"
                data-id="${todo.id}"
              >
                <i class="trash alternate icon"></i>
                Delete
              </button>
              <div class="actions">
                <button type="button" class="ui black deny button">
                  <i class="remove icon"></i>
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <div id="err-update-personal-todo" class="my-5"></div>
        </div>
      `
    return content
  }

  static projectcards(project) {
    const content = `
        <div class="ui item segment">
                <div class="content text-xl">
                  <a class="header" onclick="Navigation.toProjectDetail(${
                    project.id
                  })">${project.name}</a>
                  <div class="description my-5">Created At: ${new Date(
                    project.createdAt
                  ).toDateString()}</div>
                  <div class="description">Author: ${project.author}</div>
                </div>
              </div>
      `

    return content
  }

  static showAddProjectModal(event) {
    event.preventDefault()
    $('#add-project-modal')
      .modal({
        closable: false
      })
      .modal('show')
  }

  static showAddTodoProjectModal() {
    $('#add-todo-project-modal').modal('show')
  }

  static projectDetailSegment(projectDetails) {
    const username = localStorage.getItem('username')
    const isMember = projectDetails.some(
      (project) => project.User.username == username
    )

    let accessContent = `
       <div class="ui center aligned segment">
            <h3>Add Member</h3>
            <div class="ui divider"></div>
            <button class="ui primary button w-full" onclick="Component.showAddMemberModal()">
                <i class="user plus icon"></i>
                ADD
            </button>
        </div>
    `
    if (!isMember) {
      $('#create-project-todo-button').hide()
      accessContent = `
        <div class="ui center aligned segment">
            <h3>Join this project?</h3>
            <div class="ui divider"></div>
            <button class="ui primary button w-full" onclick="Project.join()">
                <i class="user plus icon"></i>
                JOIN PROJECT
            </button>
        </div>
      `
    } else {
      $('#create-project-todo-button').show()
    }
    const content = `
    <div class="ui center aligned one column grid">
        <div class="ui segment" style="background-color: rgb(197, 204, 204);">
            <h2>Todo List</h2>
            <div class="ui top attached tabular menu text-2xl font-bold" id="todo-project-tab">
                <a class="item active" data-tab="undone">Undone</a>
                <a class="item" data-tab="doing">Doing</a>
                <a class="item" data-tab="done">Done</a>
            </div>
            <div class="ui bottom attached tab segment active" data-tab="undone" id="project-todo-undone"></div>
            <div class="ui bottom attached tab segment" data-tab="doing" id="project-todo-doing"></div>
            <div class="ui bottom attached tab segment" data-tab="done" id="project-todo-done"></div>
        </div>
    </div>
    <div class="ui center aligned column">
        <div class="ui center aligned segment" id="project-id" data-id="${
          projectDetails[0].ProjectId
        }">
            <div class="ui two column grid">
                <div class="column">
                    <h3>Project Name</h3>
                    <div class="ui divider"></div>
                    <h3>${projectDetails[0].Project.name}</h3>
                </div>
                <div class="column">
                    <h3>Author</h3>
                    <div class="ui divider"></div>
                    <h3>${projectDetails[0].Project.author}</h3>
                </div>
            </div>
            <div class="ui vertical divider"></div>
        </div>
        <div class="ui center aligned segment">
            <h3>
                Created At
            </h3>
            <div class="ui divider"></div>
            <h3>${new Date(
              projectDetails[0].Project.createdAt
            ).toDateString()}</h3>
        </div>
        ${accessContent}
        <div class="ui center aligned segment">
            <h3>Member List</h3>
            <div class="ui divider"></div>
            <h3>${this.projectDetailMembersSegment(projectDetails)}</h3>
            <div class="ui divider"></div>
            <h3>Member Total : ${projectDetails.length}</h3>
        </div>
    </div>
    `

    this.projectDetailTodosSegment(projectDetails, isMember)
    return content
  }

  static projectDetailTodosSegment(projectDetails, isMember) {
    let content = ''
    $.ajax({
      type: 'GET',
      url: `${localhost}/todos/projects/${projectDetails[0].ProjectId}`,
      headers: {
        token: token
      },
      success: function(todos) {
        // console.log(todos)
        $('#todo-list-project').empty()
        todos.forEach((todo) => {
          let date = Component.dateFormatter(todo.due_date)
          let status = Component.statusToUpdate(todo.status)

          let accessContent = ``
          if (isMember) {
            accessContent = `
            <div class="extra content">
                  <div class="ui two buttons">
                    <button class="ui basic green button ${
                      status.downgradeDisable
                    }" 
                    onclick="Homepage.updateStatus(${todo.id}, '${
              status.downgrade
            }')">
                    ${status.downgrade.toUpperCase()}
                    </button>
                    
                    <button class="ui basic red button ${
                      status.upgradeDisable
                    }" 
                    onclick="Homepage.updateStatus(${todo.id}, '${
              status.upgrade
            }')">
                    ${status.upgrade.toUpperCase()}
                    </button>
                  </div>
                  <div class="ui center aligned mt-4">
                    <button class="ui basic primary button" onclick="Component.showTodoDetail('${
                      todo.id
                    }','${todo.title}','${todo.description}','${
              todo.due_date
            }')">DETAILS</button>
                  </div>
                </div>
          `
          }
          let appendTarget = '#project-todo-undone'
          if (todo.status == 'doing') {
            appendTarget = '#project-todo-doing'
          } else if (todo.status == 'done') {
            appendTarget = '#project-todo-done'
          }
          // console.log(appendTarget)
          let tag = `
              <div class="ui center aligned segment">
                <div class="card">
                <div class="content text-xl">
                  <div class="header text-center">
                    ${todo.title}
                  </div>
                  <div class="meta text-center my-3">
                    ${date}
                  </div>
                  <div class="description">
                    ${todo.description}
                  </div>
                </div>
                ${accessContent}
              </div>
            </div>
                `
          content += tag
          $(appendTarget).append(content)
        })
      },
      error: function(err) {
        console.log(err.responseJSON)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    })
  }

  static projectDetailMembersSegment(projectDetails) {
    let content = ``
    projectDetails.forEach((project) => {
      let tag = `
            <div class="ui relaxed divided list">
                <div class="item">
                    <div class="content">
                    <p class="header">${project.User.username}</p>
                    </div>
                </div>
            </div>
          `
      content += tag
    })
    return content
  }

  static showAddMemberModal() {
    const projectId = window.location.hash.substring(9)
    Project.getAllNonMemberUsers(projectId)
    $('#add-project-member-modal')
      .modal({
        closable: false,
        allowMultiple: true
      })
      .modal('show')
  }
}

function search() {
  $('#input-search-user').search({
    source: nonMemberUsers,
    searchFields: ['title'],
    fullTextSearch: true
  })
}

$(document).on('click', '#todo-project-tab .item', function() {
  $('#todo-project-tab .item').tab()
})
