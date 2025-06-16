


let currentJoke = '';



function getJokes() {


    const jokeBox = document.getElementById("jokeBox");
    const saveMsg = document.getElementById("saveMsg");
    saveMsg.textContent = "";
    jokeBox.textContent = "Loading..."
    jokeBox.classList.remove("error")
    fetch('https://v2.jokeapi.dev/joke/Programming')
        .then(res => res.json())
        .then(data => {
            if (data && data.joke) {
                currentJoke = data.joke;

                jokeBox.textContent = data.joke;

            }
            else {
                throw new Error("Unexpected joke format");
            }


        }).catch(err => {
            jokeBox.textContent = "failed to fetch jokes.Try again!";
            jokeBox.classList.add("error");
        })
}

function copyJoke() {
    if (currentJoke) {
        navigator.clipboard.writeText(currentJoke)
            .then(() => alert("Joke copied to clipboard!"))
            .catch(() => alert("failed to copy"))

    }
    else {
        alert("No jokes to copy")
    }

}

function saveJoke() {
    if (currentJoke) {
        let saved = JSON.parse(localStorage.getItem("savedJokes") || "[]");
        saved.push(currentJoke);
        localStorage.setItem("savedJokes", JSON.stringify(saved));
        document.getElementById("saveMsg").textContent = "Joke saved locally!";
    } else {
        alert("Generate a joke first!");
    }
}