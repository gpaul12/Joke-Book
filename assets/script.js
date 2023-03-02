console.log("hello");

var  $jokeList = $("#joke-list");

var jokes = [];

var saveJokes = function() {
    console.log("save jokes");
    localStorage.setItem("jokes", JSON.stringify(jokes));
}

var loadJokes = function(){
    jokes = JSON.parse(localStorage.getItem("jokes"));
    if (!jokes){
        jokes = [];
    }
    console.log("load jokes", jokes);
    updateJokesList();
}

var addJoke = function(newJoke){
    jokes.unshift(newJoke);
    console.log("add joke", newJoke);
    updateJokesList();
    saveJokes();
}

var removeJoke = function(index){
    console.log("remove joke", index);
    jokes.splice(index, 1);
    updateJokesList();
    saveJokes();
}

var getRandomJoke = function(){
    console.log("get Random Joke");
        var jokeUrl = "https://official-joke-api.appspot.com/jokes/random";
    fetch(jokeUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("fetched joke", data);
        updateForm(data.setup, data.punchline);
    });
};

var updateForm = function(setup, punchline){
    console.log("update form:"+setup+" ..."+punchline);
    $("#new-setup").val(setup);
    $("#new-punchline").val(punchline);
}

var updateJokesList = function(){
    console.log("update jokes list");
    var jokeHtml = "";
    for (var i=0; i<jokes.length; i++){
        jokeHtml += '<article class="joke" data-index="'+i+'">';
        jokeHtml += '<p class="setup">' +jokes[i].setup+'</p>';
        jokeHtml += '<p class="punchline">' +jokes[i].punchline+'</p>';
        jokeHtml += '<p class="remove">X</p>';
        jokeHtml += '<article>';
    }
    $jokeList.html(jokeHtml);
}

var initListeners = function(){
    console.log("init listeners");

    $("#new-joke").submit(function(event){
        event.preventDefault();
        console.log("submitted form");

        var newSetup = $("#new-setup").val();
        var newPunchline = $("#new-punchline").val();

        var newJoke = {
            setup: newSetup,
            punchline: newPunchline
        };

        addJoke(newJoke);
    });
    $("#joke-list").click(function(event){
        $target = $(event.target);

        if (!$target.hasClass("remove")){
            return;
        }
        var index =$target.closest("article").data("index");
       
        console.log("clicked"+index);

        removeJoke(index)
    });
    $("#get-button").click(getRandomJoke);
}

$(function() {
    console.log("init");
    initListeners();
    loadJokes();
});

