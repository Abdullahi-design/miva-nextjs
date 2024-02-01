const makeTransfers = require ('../../utils/transfers.js');
const SucessfulTransfers = require ('../../models/sucessfulTransfers.js');
const CronJob = require('cron').CronJob;

// Create a new cron job with 'Africa/Lagos' timezone
const job = new CronJob(
  '0 0 * * *', // cronTime (every day at 12 AM)
  async () => {
    console.log('Running scheduled task...');
    try {
      const paystackResult = await makeTransfers();
      
      console.log('Task completed successfully:', paystackResult);

      const newTransaction = new SucessfulTransfers({ paystackResult });
      await newTransaction.save();

    } catch (error) {
      console.error('Error executing scheduled task:', error);
    }
    console.log('Scheduled task completed.');
  },
  null,
  true, // Start the job immediately
  'Africa/Lagos' // Timezone set to Lagos, Nigeria (GMT+1)
);

job.start();