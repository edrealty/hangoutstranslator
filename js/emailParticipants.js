/**
 * Created by Matt on 10/25/14.
 */

var sendEmail = function(recipient, subject, text) {
    var data = {
        from: "Hangouts Transcriptor <mlong547@yahoo.com>",
        to: recipient,
        subject: subject,
        text: text
    };

    $.ajax({
        user: "9d143e73ddd88c33192131d73ae9f179",
        password: "fb116719c4561db534038ca6d1d58c07",
        url: "https://api.mailjet.com/v3/send/message",
        data: data
    });

}