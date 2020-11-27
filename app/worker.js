// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const { Storage } = require('@google-cloud/storage')
const moment = require('moment');
const request = require('request');
const ZipStream = require('zip-stream');
const photoModel = require('./photo_model');
const env = require('../project-id-9307823999230114798-b3157dde6a00');

async function quickstart(
  projectId = 'project-id-9307823999230114798', // Your Google Cloud Platform project ID
  topicName = 'guillaume', // Name for the new topic to create
  subscriptionName = 'guillaume' // Name for the new subscription to create
) {
  const credentials = {
    projectId: env.project_id,
    credentials: env
  };
  const pubsub = new PubSub(credentials);
  // Instantiates a client
  const topic = await pubsub.topic(topicName);
  console.log(`Topic ${topic.name}.`);


  function listenForMessages() {
    const timeout = 60;
    // References an existing subscription
    const subscription = pubsub.subscription(topicName);

    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = async message => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;

      const zip = new ZipStream();
      let storage = new Storage(credentials);

      const filename = `guillaume_${Date.now().toString()}.zip`;

      const file = await storage
        .bucket("dmii2bucket")
        .file(filename)
      ;

      const stream = file.createWriteStream({
        metadata : {
          contentType: zip.mimeType,
          cacheControle: 'private'
        },
        resumable: false
      });
      zip.pipe(stream);
      const photos = await photoModel.getFlickrPhotos(JSON.parse(message.data).tags, message.data.tagmode);
      photos.splice(0, 10);
      const datas = photos.map((p, i) => ({name: `index-${i}.jpg`, image: p.media.m}))

      function addNextFile() {

        const {image, name} = datas.shift();
        const stream = request(image);
        zip.entry(stream, { name }, err => {
          if (err)
            throw err;
          if (datas.length > 0)
            addNextFile();
          else {
            zip.finalize();
            getSignedUrl();
          }
        });
      }

      async function getSignedUrl() {
        const options = {
          action: 'read',
          expires: '03-09-2021'//moment().add(2, 'days').unix() * 1000
        };
        try {
          const signedUrls = await storage
            .bucket("dmii2bucket")
            .file(filename)
            .getSignedUrl(options);

          console.log(`URL: ${signedUrls}`)
        } catch(e) {
          console.log(e)
        }
      }

      addNextFile();


      // "Ack" (acknowledge receipt of) the message
      message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);

    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);
  }

  listenForMessages();
}

quickstart();
