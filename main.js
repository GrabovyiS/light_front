const buttonContainer = document.querySelector(".container");
const orb = document.querySelector(".orb");
const texts = document.querySelectorAll(".text");
const light = document.querySelector(".light");

// light.innerHTML = "32";

function getCount() {
    fetch("http://127.0.0.1:8000/light/")
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            light.innerHTML = Object.keys(data).length;
        });
}

function postLight() {
    fetch("http://127.0.0.1:8000/light/", {
        method: "POST",
        body: JSON.stringify({ count: 1 }),
        headers: new Headers({ "content-type": "application/json" }),
    });
}

getCount();

buttonContainer.addEventListener("mouseenter", () => {
    orb.classList.add("orb-hover");
    texts.forEach((text) => {
        text.classList.add("white");
    });
});

buttonContainer.addEventListener("mouseleave", () => {
    orb.classList.remove("orb-hover");
    texts.forEach((text) => {
        text.classList.remove("white");
    });
});

buttonContainer.addEventListener("click", () => {
    postLight();
    orb.classList.add("glow");
    getCount();
    setTimeout(() => {
        orb.classList.remove("glow");
    }, 3000);
    getCount();
});

setInterval(function () {
    getCount();
}, 10000); //run this thang every 10 seconds
