import Queue from "bull";
import dotenv from 'dotenv'
import authService from "../auth/auth.service";
dotenv.config()

const mailerQueue = new Queue('mailer', {
  redis: {
    host: process.env.REDIS_HOST_DEV,
    port: Number(process.env.REDIS_PORT_DEV),
  },
});

mailerQueue.process(async function (job, done) {
  const jobData = job.data;
  console.log("job: ", jobData);
  await authService.sendMail(jobData.email, jobData.link)
  done(null, true);
});


mailerQueue.on('completed', function (job, result) {
  const jobData = job.data;
  console.log(`job SEND EMAIL completed with result: ${JSON.stringify(result)}`)
})

export default mailerQueue;