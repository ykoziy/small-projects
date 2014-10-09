// On page load focus on cardNum input
$(document).ready(function() {
    $("#cardNum").focus();
});

// On key release execute
$("#cardNum").keyup(function() {
    var cardNumber = $("#cardNum").val();
    if (cardNumber.charAt(0) == "4") {
        visaCard();
    //} else if (cardNumber.charAt(0) == "5") {
    // MasterCard problem definition prefix 5, in reality prefix 51-55
	} else if (between(parseInt(cardNumber.substr(0, 2)), 51, 55)) {
        masterCard();
    } else if ((cardNumber.substr(0, 2) == "34") || (cardNumber.substr(0, 2) == "37")) {
        amexCard();
    } else {
        $("#cardType").text("? ");
    }
});


function visaCard() {
    $("#cardType").text("Visa ");
    var length = $('#cardNum').val().length;
    if ((length == 13) || (length == 16)) {
        validateCard($("#cardNum").val());
    }
}


function masterCard() {
    $("#cardType").text("MasterCard ");
    var length = $('#cardNum').val().length;
    if ((length == 16)) {
        validateCard($("#cardNum").val());
    }
}

function amexCard() {
    $("#cardType").text("American Express ");
    var length = $('#cardNum').val().length;
    if ((length == 15)) {
        validateCard($("#cardNum").val());
    }
}

function between(x, min, max) {
	if(x >= min && x <= max) {
		return true;
	}
	return false;
}

/*
	Validate card number using Luhn algorithm.
*/
function validateCard(cardNumber) {
    var checkDigit = parseInt(cardNumber.substring(cardNumber.length - 1, cardNumber.length));
    var partialNum = cardNumber.substring(0, cardNumber.length - 1);
    if (calculateChecksum(partialNum) == parseInt(checkDigit)) {
        $("#cardType").append('<span class="glyphicon glyphicon-ok"></span>');
    } else {
        $("#cardType").append('<span class="glyphicon glyphicon-remove"></span>');
    }
}

/*
	Calculate checksum of a number excluding the last check digit.
*/
function calculateChecksum(partialNum) {
    var sum = 0;
    // use look up table to simplify math
    var lookUpTable = new Array(0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
    for (i = 0; i < partialNum.length; i++) {
        sum += parseInt(partialNum.charAt(i));
    }

    for (i = partialNum.length - 1; i >= 0; i -= 2) {
        var index = parseInt(partialNum.charAt(i));
        var tableValue = lookUpTable[index];
        sum += tableValue;
    }

    var mod = sum % 10;
    mod = 10 - mod;
    if (mod == 10) {
        mod = 0;
    }
    return mod;
}