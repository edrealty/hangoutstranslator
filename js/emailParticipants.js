/**
 * Created by Matt on 10/25/14.
 */

var sendEmail = function(recipient, subject, text) {
    var data = {
        from: "Hangouts Transcriptor <" + encodeURI("mlong547@yahoo.com") + ">",
        to: encodeURI(recipient),
        subject: subject,
        text: text,
        cc: "mlong547@umd.edu",
        bcc: "mlong547@umd.edu",
        html: "<h1>hello</h1>"
    };

    var user = "9d143e73ddd88c33192131d73ae9f179";
    var password = "fb116719c4561db534038ca6d1d58c07";

    var obj = $.ajax({
        type: "GET",
        url: "https://" + user + ":" + password + "@in-v3.mailjet.com?callback=?",
        data: data,
        dataType: "jsonp"
    }).success(function(data) {
        console.log(data);
    });

    console.log(obj);

}