//clear field
function clearField(selector) {
    selector.find('input').val('')
    selector.find('option:selected').prop('selected', false)
}

function clearValidation(selector) {
    selector.find('input').removeClass('is-invalid')
    selector.find('select').removeClass('is-invalid')
}
//date format
function formatDate(date) {
    if (date === null) {
        return date
    } else {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
}

function listItem(data) {
    $container.empty()
    if (data.message) {
        $container.append(`<tr>
            <td colspan="6" class="text-center p-nodata"><h6>Todo is empty!</h6></td>
        </tr>`)
    } else {
        for (let i = 0; i < data.length; i++) {
            let $item = $($template)
            $item.find('.title').text(data[i].title)
            $item.find('.description').text(data[i].description)[i]
            $item.find('.status').html(data[i].status === 2 ? '<span class="text-success"><b>Completed</b></span>' : '<span class="text-danger"><b>Incompleted</b></span>')
            $item.find('.due_date').text(formatDate(data[i].due_date))
            $item.find('.action .edit').prop('href', `${base_url}/todos/${data[i].id}`)
            $item.find('.action .delete').prop('href', `${base_url}/todos/${data[i].id}`)
            $container.append($item)
        }
    }
}