import sha256 from 'crypto-js/sha256';
import moment from 'moment';
import { COMMAND_PREFIX } from '../../../config';

export default {
  name: 'verify',
  description: 'Verifying user by linking external wallet with discord wallet',
  usage: [`${COMMAND_PREFIX}verify`],
  async execute(message) {
    const getTokenLink = (token) => `https://verify.grapes.network/?token=${token}`;
    const hashVerifyToken = sha256(`GRAPE${moment().format('x')}`);
    message.channel.send(getTokenLink(hashVerifyToken));
  },
};
// export const tokenURL = getTokenLink(hashVerifyToken);
