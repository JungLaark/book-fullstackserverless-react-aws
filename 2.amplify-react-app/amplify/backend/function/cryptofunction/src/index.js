const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  /*이벤트, context, 경로가 express server 로 전달됨 */
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
