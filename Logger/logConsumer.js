#!/usr/bin/env node
var amqp = require('amqplib/callback_api');
const fs = require('fs')

amqp.connect('amqp://rabbitmq', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'flu_logs';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(' [*] Waiting for logs');


            channel.bindQueue(q.queue, exchange, 'logs');


            channel.consume(q.queue, function (msg) {
                fs.appendFile('/usr/src/app/log/logs.log', msg.content.toString(), err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }, {
                noAck: true
            });
        });
    });
});