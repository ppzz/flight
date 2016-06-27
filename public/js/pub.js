$(function () {
    var socket = null;

    $.ajax({
        type: 'get',
        url: "/captcha",
        dataType: 'text',
        processData: false,
        contentType: 'application/json',
        success: function (base64Buff) {
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
        clipboard.on('success', function (e) {
            self.text('复制成功');
            setTimeout(function () {
                self.text('clip');
            }, 200);
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
            data: {data: JSON.stringify(data)},
            dataType: 'json',
            success: function () {

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
        if (socket === null) {
            return alert('null socket');
        }
        socket.emit('EVENT1', "hello world");
    });

    $("#socket-disconnect").click(function () {
        socket.disconnect(function () {
            alert('234');
        });
    });

    // $.delegate("#uploadForm", )

    // $("#uploadForm").delegate("submit", function () {
    //     alert('123');
    // });

    // $("#uploadInput").change(function () {
    //     alert('123');
    //
    //     if (this.files && this.files[0]) {
    //         alert('456');
    //
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             $("uploadImg").attr("src", e.target.result);
    //         };
    //         reader.readAsDataURL(this.files[0]);
    //     }
    // });

    $("#uploadFrom").submit(function (e) {

        // 方法一:
        // e.preventDefault();
        // // 这驹是什么意思?
        //
        // var self = $(this);
        // var serializeData = self.serialize();
        //
        // 需要 JQ插件支持才行.否则没有ajaxSubmit方法
        // self.ajaxSubmit({
        //     type: "POST",
        //     url: "demo/upload",
        //     dataType: 'json',
        //     data: serializeData,
        //     //data: formData
        //     contentType: false,
        //     cache: false,
        //     processData: false,
        //     deforeSubmit: function () {
        //         alert("对图片的预处理");
        //     },
        //     uploadProgress: function (event, position, total, percentcomplete) {
        //         // 在这里控制进度条
        //         console.log('控制进度条', total, position, percentcomplete);
        //     },
        //     success: function () {
        //         alert("上传成功");
        //     },
        //     error: function (data) {
        //         alert('上传图片出错');
        //     }
        // });

        // 方法二:

        // 检查是否支持FormData
        if (window.FormData) {

            var formData = new FormData();

            formData.append('upload', $("#uploadInput")[0].files[0]);
            var xhr = new XMLHttpRequest();

            xhr.open("post", $(this).attr('action'));

            xhr.onload = function () {
                if (xhr.status === 200) {
                    alert("upload success");
                } else {
                    alert("upload failed");
                }
            };
            xhr.send(formData);
        }
    });

    $("div").delegate("#uploadBtn", "click", function () {
        if (window.FormData) {
            var formData = new FormData();
            formData.append('upload', $("#uploadInput2")[0].files[0]);
            $.ajax({
                url: "/demo/upload",
                type: "post",
                data: formData,
                processData: false, //告诉jQuery不要去处理发送的数据
                contentType: false,  //告诉jQuery不要去设置Content-Type请求头
                success:function (feedback) {
                    alert(JSON.stringify(feedback));
                },
                error:function (data) {
                    alert(JSON.stringify(data));
                }
            });

            // var xhr = new XMLHttpRequest();
            //
            // xhr.open("post", $(this).attr('action'));
            //
            // xhr.onload = function () {
            //     if (xhr.status === 200) {
            //         alert("upload success");
            //     } else {
            //         alert("upload failed");
            //     }
            // };
            // xhr.send(formData);
        }
    });
});