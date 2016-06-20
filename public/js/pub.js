$(function () {
    var socket  = null;

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

    $('#test-post').click(function () {
        var data = {
            name: 'zhaopeng',
            age: 23,
            address: "meinian",
            score: {
                english: 123,
                math: 100
            }
        };
        $.ajax({
            type: 'post',
            url: '/test/post',
            data: {data:JSON.stringify(data)},
            dataType: 'json',
            success:function() {

            },
            error: function () {

            }
        });

    });

    $("#socket-connect").click(function () {
        socket = io("http://127.0.0.1:8888");
        socket.on("connect", function () {
            alert('456')
        });
    });

    $("#socket-add-connect").click(function () {
        socket.on('testEvent2', function (data) {
            alert(data);
        });
    });

    $("#socket-testEvent").click(function () {
        if ( socket === null) {
            return alert('null socket');
        }
        socket.emit('EVENT1', "hello world");
    });

    $("#socket-disconnect").click(function () {
        socket.disconnect(function () {
            alert('234');
        });
    });
});