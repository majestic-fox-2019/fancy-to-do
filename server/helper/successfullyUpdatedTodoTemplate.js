module.exports = function (name, object) {
    return template = `
    <h3>Congratulations</h3>
    <p>Hello, ${name}, you're succesfully update todo <b>${object.title}</b></p>
    <ol>
        <li>Title : <b>${object.title}</b></li>
        <li>Description : <b>${object.description}</b></li>
        <li>Status : <b>${object.status === 1 ? 'Incompleted Task' : 'Completed Tas'}</b></li>
        <li>Due Date : <b>${object.due_date}</b></li>
    </ol>
    <br>
    <p>Best Regards </p>
    <p>Arona Nur Tetulis (Fancy Todo CEO)</p>
    `
}