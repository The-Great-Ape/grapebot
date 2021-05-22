import sha256 from 'crypto-js/sha256';
// import Discord from 'discord.js';
import moment from 'moment';
import { COMMAND_PREFIX } from '../../../config';
import UserService from '../../../publicKeyStorage/UserService';

export default {
  name: 'verify',
  description: 'Verifying user by linking external wallet with discord wallet',
  usage: [`${COMMAND_PREFIX}verify`],
  async execute(message, args) {
    // const client = new Discord.Client();
    const getTokenLink = (token) => `https://verify.grapes.network/?token=${token}`;
    const hashVerifyToken = sha256(`GRAPE${moment().format('x')}`);
    try {
      await UserService.saveVerifiedUser({
        discordId: message.author.id,
        discordServerId: '--discord server id--',
        generatedUserToken: hashVerifyToken,
      });
    } catch (e) {
      // Object.keys(client.guilds).forEach((row) => {
      //   console.log(row);
      // });
      // const ids = client.guilds.cache.map((dids) => dids.id);
      // console.log('IDs list', ids);
      // console.log('THIS IS THE SERVER ID: ', client.guilds);
      message.channel.send(`User Error Message: ${e}`);
    }

    if (args.length === 1) {
      message.channel.send('Public key is missing');
    } else {
      message.channel.send(getTokenLink(hashVerifyToken));
    }
  },
};
