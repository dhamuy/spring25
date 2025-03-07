function addOneToCounter(){
    let counter = document.getElementById("counter");
    let limit = document.getElementById("limit");

    if (parseInt(counter.innerText) < parseInt(limit.innerText)) {
        counter.innerText = parseInt(counter.innerText) + 1;
    }
}

function increaseLimit(){
    let counter = document.getElementById("counter");
    let limit = document.getElementById("limit");
    if (parseInt(counter.innerText) >= 5) {
        limit.innerText = parseInt(limit.innerText) + 5;
        counter.innerText = parseInt(counter.innerText) - 5;
    } else {
        alert("Not enough cookies to increase limit!");
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("limit").innerText = 10;
    document.getElementById("counter").innerText = 0;
});

