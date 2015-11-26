$(function () {
    $.ajax({
        type: 'get',
        url: "/captcha",
        dataType: 'text',
        processData: false,
        contentType: 'application/json',
        success: function (base64Buff){
            var src = "data:image/jpeg;base64," + base64Buff;
            $("#chptcha").attr("src", src);
        },
        error: function (req, status, ex) {
        },
        timeout: 60000
    });
});