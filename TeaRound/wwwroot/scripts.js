const uri = "api/round/";
$(document).ready(function () {
    getPlayers();
});
function getPlayers() {
    $.ajax({
        type: 'GET',
        url: uri,
        success: function (data) {
            const playerList = $("#player-list");
            $(playerList).empty();
            $.each(data, function (key, item) {
                const player = $("<div></div>")
                    .text(item.name)
                    .append(
                        $("<button>Delete</button>").on("click", function () {
                            deletePlayer(item.id);
                        })
                    );
                player.appendTo(playerList);
            });
        }
    });
}

function addaPlayer() {
    const player = {
        Name: $('#addPlayer').val()
    };
    $.ajax({
        type: 'POST',
        url: uri,
        data: JSON.stringify(player),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            //getData();
            $("#addPlayer").val("");
            $("#addPlayer").focus();
            getPlayers();
        }
    });
}

function deletePlayer(id){
    $.ajax({
        type: 'DELETE',
        url: uri + id,
        success: function () {
            getPlayers();
        }
    });
}