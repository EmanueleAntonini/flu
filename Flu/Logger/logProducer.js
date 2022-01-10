var amqp = require('amqplib/callback_api');

function log(msg,cat){
    amqp.connect('amqp://rabbitmq', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'flu_logs';
        var args = process.argv.slice(2);
        var message = "["+cat+"]"+"-- "+msg+"\n";
        var severity = (args.length > 0) ? args[0] : 'info';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });
        channel.publish(exchange, 'logs', Buffer.from(message));
        console.log(" [x] Sent %s: '%s'", severity, message);
    });

    setTimeout(function() {
        connection.close();
    }, 500);
});
}

module.exports = {log};