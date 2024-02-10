const cron = require('node-cron');
const { sendNotification } = require('./notificationService');
const axios = require('axios');
// Define your cron job schedule (for example, every day at 9 AM)
const cronJob = cron.schedule('*/5 * * * * *', () => {
    var x;
    const endpointUrl = 'http://localhost:3002/api/panchayats';
    axios.get(endpointUrl)
        .then((response) => {
            x = response;
            console.log('Notification sent successfully:', response.data);
        })
        .catch((error) => {
            console.error('Error sending notification:', error.message);
        });
    // Your task to be executed at the scheduled interval
    // Call the sendNotification function with appropriate user and message details
    const userId = 'user123'; // Replace with the user ID to whom you want to send the notification
    const message = 'This is a notification message.'; // Replace with the notification message
    sendNotification(userId, message, x);
});

module.exports = cronJob;