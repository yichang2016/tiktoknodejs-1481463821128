$(function() {
    var hostName = window.location.host;
    var socket = io.connect(hostName);

    socket.on('message', function(data) {
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
    var recordAction = function(target, action) {
        var messages = ['[', getTimeStamp(), '] ', target, ':',
            action, '<br>', $('.information .ctl_action').html()
        ];

        $('.information .ctl_action').html(messages.join(''));
    };

    var showData = function(data) {
        switch (data.source) {
            case 'camera':
                $('.information .ctl_status').html(JSON.stringify(data));
                if (data.code == 'ng') {
                    $('.camera_photo').hide();
                } else {
                    $('.camera_photo').show();
                    $('.camera_photo').attr('src', 'data:image/jpeg;' + data.img);
                }

                break;
            default:
                $('.information .ctl_status').html(JSON.stringify(data));
                break;
        }
    };

    $('.ctl_light').click(function() {
        //light
        var $this = $(this);
        var action = 'switch';

        recordAction('light', action);

        socket.emit('control', { type: 'control', target: 'light', action: action });
    });

    $('.ctl_camera_take_photo').click(function() {
        //camera
        var $this = $(this);
        var action = 'take_photo';

        recordAction('camera', action);
        socket.emit('control', { type: 'control', target: 'camera', action: action });
    });

    $('.ctl_motor_on').click(function() {
        //motor
        var $this = $(this);
        var action = 'on';

        recordAction('motor', action);
        socket.emit('control', { type: 'control', target: 'motor', action: action });
    });

    $('.ctl_motor_off').click(function() {
        //motor
        var $this = $(this);
        var action = 'off';

        recordAction('motor', action);
        socket.emit('control', { type: 'control', target: 'motor', action: action });
    });

    $('.ctl_sensor').click(function() {
        //sensor
        var $this = $(this);
        var action = 'get_status';

        recordAction('sensor', action);
        socket.emit('control', { type: 'control', target: 'sensor', action: action });
    });
});