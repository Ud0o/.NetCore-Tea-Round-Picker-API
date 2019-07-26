function addPlayer() {
    const player = {
        Name: $('#addPlayer').val()
    };
    $.ajax({
        type: 'POST',
        url: '/api/Todo/',
        data: JSON.stringify(player),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            //getData();
            $("#addPlayer").val("");
        }
    });
}