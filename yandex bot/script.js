// ==UserScript==
// @name         Y.bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       elen-shu
// @match        https://yandex.ru/*
// @match        https://www.i-climate.ru/*
// @match        https://www.rusintelcom.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){ //Обращаемся к элементу массива для запроса
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) { //Получить значение куки
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "i-climate.ru":["Ай-Климат","Драйкулер","Серверные","Stulz","Климатическое оборудование","Прецизионное оборудование","Строительство ЦОД"],
    "rusintelcom.ru":["Чистые помощения","Дата-центр","Постгарантийный сервис","Монтажные работы","Инжиниринговые услуги","Построить ЦОД"]
}

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site]; //Набор ключевых слов по выбранному сайту
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementById("text");
let search_button = document.getElementsByClassName("button mini-suggest__button")[0];
let links = document.links; //Все ссылки на странице
if (search_button != undefined){ //Проверяем, находимся ли на главной странице
    let i = 0;
    document.cookie = "site="+site; //Запись в куки
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i == keyword.length){
            clearInterval(timerId);
            search_button.click();
        }
    },500)
}else if(location.hostname == "yandex.ru"){ //Страница поисковой выдачи
    let flag = true;
    let numPage = document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0].textContent;
    site = getCookie("site"); //Достать содержимое куки
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("i-climate.ru") != -1){ //Клик по нужному сайту
            flag = false; //На странице поисковика найден нужный сайт
            link.removeAttribute('target'); //Открыть сайт в той же вкладке
            setTimeout(()=>link.click(), 2000);
            break;
        }
    }
    let next_button = document.getElementsByClassName("pager__item_kind_next")[0];
    if (numPage == "10") location.href = "https://yandex.ru/"; //Завершить поиск на 10 страницеб вернуться на главную поисковика
    if(flag) setTimeout(()=>next_button.click(), 2000); //На странице поисковика не найден нужный сайт, переходим на следующую страницу
}else{
    if(getRandom(0,100)>=80) location.href = "https://yandex.ru/"; //С вероятностью 20% мы возвращаемся на стартовую страницу Яндекс
    else
        setInterval(()=>{
            let link = links[getRandom(0, links.length)]; //Выбираем случайную ссылку на сайте
            if(link.href.indexOf(location.hostname) != -1); //Проверяем, несёт ли выбранная ссылка текущий домен
                link.click();
        }, 5000);
}
