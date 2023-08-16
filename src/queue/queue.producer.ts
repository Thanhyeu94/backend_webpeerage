import mailerQueue from "./queue.consumer";

const sendEmail = async (job: {email: string, link: string}) => {
  await mailerQueue.add(job);
}
export default {
  sendEmail
}