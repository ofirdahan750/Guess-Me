'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-reset-winner-game').click(startNewGame);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    var currQuest = getCurrQuest()
    $('.quest h2').html(currQuest.txt)

}

function onUserResponse(ev) {
    var res = ev.data.ans;
    if (isChildless(getCurrQuest())) {
        $('.quest').hide(this, 1500);
        if (res === 'yes') {
            $('.new-quest-win').show(this, 1500);
        } else {
            $('.new-quest-lose').show(this, 1500);
        }
    } else {
        gLastRes = res
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function startNewGame() {
    onRestartGame()
    renderQuest()
}

function onAddGuess(ev) {
    ev.preventDefault();
    if ($('#newQuest').val().length && $('#newQuest').val().length) {
        var newGuess = 'Is it ' + $('#newGuess').val() + '?';
        var newQuest = $('#newQuest').val();
        addGuess(newQuest, newGuess, gLastRes)
        onRestartGame();
        renderQuest()
    }
    else {
        revealErrorPopUp()
    }
}

function onRestartGame() {
    createQuestsTree();
    renderQuest();
    $('#newGuess').val('')
    $('#newQuest').val('')
    $('.new-quest-lose').hide();
    $('.new-quest-win').hide();
    $('.game-start').show();
}

function revealErrorPopUp() {
    $('.pop-up').fadeIn(600)
    setTimeout(() => $('.pop-up').fadeOut(300), 3200)
}