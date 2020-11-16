// ==UserScript==
// @name         Y.bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       elen-shu
// @match        https://yandex.ru/*
// @match        https://www.i-climate.ru/*
// @match        https://rusintelcom.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "i-climate.ru":["Ай-Климат","Драйкулер","Чиллер","Сертификат специалиста","Прецизионное оборудование","Строительство ЦОД"],
    "rusintelcom.ru":["Чистые помощения","Дата-центр","Постгарантийный сервис","Монтажные работы","Инжиниринговые услуги",""]
}

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keyword.length)];
let yandexInput = document.getElementById("text")[0];
let suggest_reqid = document.getElementsByName("suggest_reqid")[0];
let links = document.links;
if (suggest_reqid != undefined){ //На главной поисковика
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i == keyword.length){
            clearInterval(timerId);
            suggest_reqid.click();
        }
    },500);
}else if(location.hostname == "www.yandex.ru"){ //Страница поисковой выдачи
    let flag = true;
    let numPage = document.getElementsByClassName("")[0].innerText;
    site = getCookie("site");
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            flag = false;
            link.removeAttribute('target');
            setTimeout(()=>link.click(),2000);
            break;
        }
    }
    if (numPage == "10") location.href = "https://yandex.ru/";
    if(flag) setTimeout(()=>pnnext.click(),2000);
}else{
    if(getRandom(0,100)>=80) location.href = "https://yandex.ru/";
    else
        setInterval(()=>{
            let link = links[getRandom(0,links.length)];
            if(link.href.indexOf(location.hostname) != -1)
                link.click();
        },5000);
}
