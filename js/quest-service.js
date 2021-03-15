'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    if (loadFromStorage('questionDB')) {
        gQuestsTree = loadFromStorage('questionDB')
    } else {
        gQuestsTree = createQuest('Is it Male?');
        gQuestsTree.yes = createQuest('Is it Donald Trump?');
        gQuestsTree.no = createQuest('Is it Rihanna?');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    gPrevQuest[lastRes].no = getCurrQuest()
    saveToStorage('questionDB', gQuestsTree)
}

function getCurrQuest() {
    return gCurrQuest
}