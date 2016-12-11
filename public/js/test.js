$(function() {
    var hostName = window.location.host;
    var socket = io.connect(hostName);

    var socket = io.connect(hostName);
    socket.on('control', function(data) {
        //get message from server
        console.log('socket message: [' + getTimeStamp() + ']' + JSON.stringify(data));
    });
    socket.on('data', function(data) {
        //get data from server
        console.log('socket data: [' + getTimeStamp() + ']' + JSON.stringify(data));

        switch (data.source) {
            case 'light':
            case 'camera':
            case 'motor':
            case 'sensor':
                showData(data);
                break;
            default:
                console.log('error socket data: [' + getTimeStamp() + ']' + JSON.stringify(data));
                break;
        }
    });

    var getTimeStamp = function() {
        var date = new Date();
        var dateStamp = [date.getFullYear(), date.getMonth(), date.getDate()];
        var timeStamp = [date.getHours(), date.getMinutes(), date.getSeconds()];

        return dateStamp.join('/') + ' ' + timeStamp.join(':') + ' ' + date.getMilliseconds();
    };
    var recordAction = function(data) {
        var messages = ['[', getTimeStamp(), '] ', JSON.stringify(data), '<br>', $('.information .ctl_action').html()];

        $('.information .ctl_action').html(messages.join(''));
    };

    var showData = function(data) {
        $('.information .ctl_status').html(JSON.stringify(data));
    };

    $('.send').click(function() {
        //light
        var $this = $(this);
        var source = $('.source').val();
        var status = $('.content').val();
        var data = { type: 'status', source: source, status: status };
        recordAction(data);

        socket.emit('status', data);
    });

});