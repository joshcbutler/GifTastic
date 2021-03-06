var gifs = ["Hamburgers", "Cupcakes", "Steak", "Ice Cream", "Hot Wings", "Cookies", "Bacon"];

function addEvents() {
    $("button").on(
        "click",
        function buttonOnClickAjaxQuery() {
            var x = $(this).data("search");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(
                function ajaxGifCB(response) {
                    console.log(JSON.stringify(response.data[0]));
                    $("#gif-container").empty();
                    for (var i = 0; i < response.data.length; i++) {
                        $("#gif-container").prepend("<p>Rating: " + response.data[i].rating + "</p>");
                        var img = $("<img>");
                        img.attr("src", response.data[i].images.downsized_still.url);
                        img.attr("data-still", response.data[i].images.downsized_still.url);
                        img.attr("data-animate", response.data[i].images.downsized.url);
                        img.attr("data-state", "still");
                        img.on("click", function() {
                            console.log($(this));
                            var state = $(this).attr("data-state");
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                        });
                        $("#gif-container").prepend(img);
                    }
                }
            );
        }
    );
}

function renderButtons() {
    $("#button-view").empty();
    for (var i = 0; i < gifs.length; i++) {
        var button = $("<button>");
        button.addClass("gif");
        button.attr("data-search", gifs[i].toLowerCase());
        button.text(gifs[i]);
        $("#button-view").append(button);
    }
}

$("#add-gifs").on(
    "click",
    function onClickAddGifs(event) {
        event.preventDefault();
        $("#gifs-input").text("");
        var gif = $("#gifs-input").val().trim();
        gifs.push(gif);
        renderButtons();
        addEvents();

    }
);

renderButtons();
addEvents();

