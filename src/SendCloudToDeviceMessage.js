var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

module.exports = function(context, req) {
  //context.log("Client ", Client);
  context.log('JavaScript HTTP trigger function processed a request.');

  var connectionString = 'HostName=asr-hub.azure-devices.net;DeviceId=sp1;SharedAccessKey=/s43ow7LoZQh9XcOxDY1rGtJlpbw82JBCTdS51XlqSs=';
  var targetDevice = 'sp1';

  var serviceClient = Client.fromConnectionString(connectionString);

  function printResultFor(op) {
    return function printResult(err, res) {
      if (err) console.log(op + ' error: ' + err.toString());
      if (res) console.log(op + ' status: ' + res.constructor.name);
    };
  }

  function receiveFeedback(err, receiver) {
    receiver.on('message', function(msg) {
      console.log('Feedback message:')
      console.log(msg.getData().toString('utf-8'));
    });
  }

  serviceClient.open(function(err) {
    if (err) {
      console.error('Could not connect: ' + err.message);
    } else {
      console.log('Service client connected');
      serviceClient.getFeedbackReceiver(receiveFeedback);
      var message = new Message('Cloud to device message.');
      message.ack = 'full';
      message.messageId = "My Message ID";
      console.log('Sending message: ' + message.getData());
      serviceClient.send(targetDevice, message, printResultFor('send'));
    }
  });

  /*if (req.query.name || (req.body && req.body.name)) {
      context.res = {
          // status: 200, /* Defaults to 200
          body: "Hello " + (req.query.name || req.body.name)
      };
  }
  else {
      context.res = {
          status: 400,
          body: "Please pass a name on the query string or in the request body"
      };
  }*/

  context.res = {
      // status: 200, /* Defaults to 200
      body: {
        output:"sent"
      }
  };
  context.done();
};
