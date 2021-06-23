let butAdd = document.querySelector(".butAdd");
let inp = document.querySelector(".inp");
let filter = document.querySelector(".filter");
let wrapper = document.querySelector(".wrapper");
let ss, ssVal, valArr, filt;

if (sessionStorage.length != 0) {
    createList();
    document.querySelector(".list").innerHTML = sessionStorage.getItem("list");
    if (sessionStorage.getItem("values") != null) {
        let val = sessionStorage.getItem("values").split(",");
        let ulList = document.querySelector(".list").children;
        for (
            let i = 0;
            i < document.querySelector(".list").childElementCount;
            i++
        ) {
            ulList[i].firstChild.value = val[i];
        }
    }
    document.querySelector(".filter").value = sessionStorage.getItem("filt");
    document.querySelector("ul").addEventListener("click", deleteElement);
    document.querySelector("ul").addEventListener("click", completedTask);
}

function createList() {
    let l = document.createElement("ul");
    l.classList.add("list");
    wrapper.append(l);
}

function createElement() {
    let item = document.createElement("li");
    item.classList.add("item");
    document.querySelector("ul").append(item);

    let input = document.createElement("input");
    input.classList.add("input");
    input.value = inp.value;
    inp.value = "";
    input.disabled = true;
    item.append(input);

    let butDo = document.createElement("div");
    butDo.classList.add("butDo");
    item.append(butDo);

    let butDel = document.createElement("div");
    butDel.classList.add("butDel");
    item.append(butDel);
}

function deleteElement(event) {
    if (event.target.classList[0] == "butDel") {
        event.target.parentElement.remove();
        if (document.querySelector("ul").childElementCount == 0) {
            sessionStorage.clear();
            document.querySelector("ul").remove();
        }
        sessionData();
    }
}
function completedTask(event) {
    if (event.target.classList[0] == "butDo") {
        event.target.previousElementSibling.classList.toggle("completed");
    }
    sessionData();
}

function sessionData() {
    ss = document.querySelector(".list");
    if (document.querySelector(".list") != null) {
        sessionStorage.setItem("list", ss.innerHTML);
        ssVal = Array.from(document.querySelectorAll(".input"));
        valArr = [];
        for (let i = 0; i < ssVal.length; i++) {
            valArr.push(ssVal[i].value);
        }
        sessionStorage.setItem("values", valArr);
    }
    filt = document.querySelector(".filter").value;
    sessionStorage.setItem("filt", filt);
}

butAdd.addEventListener("click", () => {
    if (document.querySelector("ul") == null) {
        createList();
        document.querySelector("ul").addEventListener("click", deleteElement);
        document.querySelector("ul").addEventListener("click", completedTask);
    }
    createElement();
    sessionData();
});

function filterList() {
    if (document.querySelector("ul") != null) {
        let list = document.querySelector("ul").children;
        list = Array.from(list);
        switch (this.value) {
            case "Выполненные":
                for (let i = 0; i < list.length; i++) {
                    if (!list[i].firstChild.classList.contains("completed")) {
                        list[i].classList.add("hide");
                    } else {
                        list[i].classList.remove("hide");
                    }
                }
                break;
            case "Не выполненные":
                for (let i = 0; i < list.length; i++) {
                    if (list[i].firstChild.classList.contains("completed")) {
                        list[i].classList.add("hide");
                    } else {
                        list[i].classList.remove("hide");
                    }
                }
                break;
            case "Все":
                for (let i = 0; i < list.length; i++) {
                    list[i].classList.remove("hide");
                }
                break;
            default:
                for (let i = 0; i < list.length; i++) {
                    list[i].classList.remove("hide");
                }
                break;
        }
        sessionData();
    }
}

filter.addEventListener("change", filterList);