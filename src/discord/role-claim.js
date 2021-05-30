/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import User from '../../models/User.js';

const firstMessage = require('./first-message');

module.exports = (client) => {
  const channelId = '848506777049235476';

  const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const emojis = {
    medianetwork: 'MEDIA Holder',
    walletv2: 'Verified Wallet',
  };

  const reactions = [];

  let emojiText = 'Gated SPL token community access!\n\n';
  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${role}\n`;
  }

  firstMessage(client, channelId, emojiText, reactions);

  const handleReaction = async(reaction, user, add) => {
    if (user.id === '842808213161508934') {
      return;
    }

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;

    const roleName = emojis[emoji];
    if (!roleName) {
      return;
    }

    const role = guild.roles.cache.find((role) => role.name === roleName);
    const member = guild.members.cache.find((member) => member.id === user.id);

    if (add) {
        const discordId=member.id;
	    const dbDiscordId = await User.getByDiscordId(discordId);        
         member.roles.add(role);
    }
    // else {
    //   member.roles.remove(role);
    // }
  };

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true);
    }
  });

  // client.on('messageReactionRemove', (reaction, user) => {
  //   if (reaction.message.channel.id === channelId) {
  //     handleReaction(reaction, user, false);
  //   }
  // });
};
