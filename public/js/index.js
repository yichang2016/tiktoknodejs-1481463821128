$(function() {
    var hostName = window.location.host;
    var socket = io.connect(hostName);

    var socket = io.connect(hostName);

    socket.on("message", function(data) {
        console.log("socket data: " + JSON.stringify(data));

    });

    $('.ctl_light').click(function() {
        var $this = $(this);
        var oldStatus = $this.attr('data-status');
        var newStatus = oldStatus == 'off' ? 'on' : 'off';
        $this.attr('data-status', newStatus);
        $('.information .ctl_status').html(newStatus);

        socket.emit('control', { type: 'control', target: 'light', action: newStatus });
    });
});