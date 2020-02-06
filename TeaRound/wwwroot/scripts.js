const uri = "api/round/";
//$.ajaxSetup({ cache: false });
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
                const player = $("<div class='player'></div>")
                    .append($("<div>"+item.name+"</div>"))
                    .append(
                        $("<img src='img/delete.svg' id='delete-player'/>").on("click", function () {
                            deletePlayer(item.id);
                        })
                    );
                player.appendTo(playerList);
            });
        }
    });
}

function newPlayer() {
    const player = {
        Name: $('#player-name').val()
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
            $("#player-name").val("");
            $("#player-name").focus();
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

function getRandomPlayer(){
    $.ajax({
        type: 'GET',
        url: uri + "GetRandomPlayer",
        success: function (data) {
            $(".chosen-player").text(data.name);
            $(".chosen-container").show();
        }
    });
}