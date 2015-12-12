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

    $("#clip_btn").click(function () {
        var self = $(this);
        var clipboard = new Clipboard('#clip_btn');
        clipboard.on('success', function(e) {
            self.text('复制成功');
            setTimeout(function () {
                self.text('clip');
            },200);
        });

    });
});