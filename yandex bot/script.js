// ==UserScript==
// @name         Y.bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       elen-shu
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

document.getElementById("text").value = "Ай-Климат";
let suggest_reqid = document.getElementsByName("suggest_reqid")[0];
if (suggest_reqid != undefined){
    suggest_reqid.click();
}else{
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("i-climate.ru") != -1){
            link.removeAttribute('target');
            link.click();
            break;
        }
    }
}
