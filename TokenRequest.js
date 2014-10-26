var translateSentence = function (sentence, source, dest) {
    var buildRequest = "";
    buildRequest += "https://translate.yandex.net/api/v1.5/tr.json/translate";
    buildRequest += "?key=trnsl.1.1.20141026T003745Z.3b01ac6cadd358c7.8673091ca870c4dcaac8c50521524a9589c62fff";
    buildRequest += "&lang=" + source + "-" + dest;
    buildRequest += "&text=" + encodeURI(sentence);

    var result = new Object();

    var call = function (res) {
        result = res;
        return result.text[0];
    };

    $.get(buildRequest, call);

}