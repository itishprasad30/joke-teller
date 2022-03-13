const audiioElement = document.getElementById("audio");

const button = document.getElementById("button");

// VoiceRSS Javascript SDK

const jokeApi =
  "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist";

function toggleButton() {
  button.disable = !button.disable;
}

async function getVoice(joke) {
  const res = await fetch(
    `https://theodorus-clarence-proxy.herokuapp.com/vrss/${joke}`
  );

  const data = await res.json();
  // console.log(data);
  audiioElement.src = data.content;
  audiioElement.play();
}

async function getJoke() {
  toggleButton();
  let joke = "";
  try {
    const res = await fetch(jokeApi);
    const data = await res.json();
    // console.log(data);
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else joke = data.joke;

    getVoice(joke);
  } catch (err) {
    console.log("whoops there is a ", e);
    window.alert("There seems to be a problem. Please try again");
    toggleButton();
  }
}

button.addEventListener("click", getJoke);
audiioElement.addEventListener("ended", toggleButton);
