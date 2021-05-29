import sha256 from 'crypto-js/sha256';
// import Discord from 'discord.js';
import moment from 'moment';
import { COMMAND_PREFIX } from '../../../config';
import UserService from '../../../publicKeyStorage/UserService';
import User from '../../../../models/User.js';



        
        

export default {
  name: 'verify',
  description: 'Verifying user by linking external wallet with discord wallet',
  usage: [`${COMMAND_PREFIX}verify`],
  async execute(message, args) {
    // const client = new Discord.Client();
    const getTokenLink = (token) => `https://verify.grapes.network/?token=${token}`;
    const hashVerifyToken = sha256(`GRAPE${moment().format('x')}`);
   	let isVerified = Boolean(false);
   	
   	let userId = 'c4425d86-6790-4a17-a854-1afcd2f4214b';
  let user = await User.getById(userId);
        dbDiscordId = user.discordId;
        console.log(user);



//const sql = "SELECT a.discord_id  as discord_id FROM users a, user_wallets b WHERE  a.user_id=b.user_id and a.discord_id like '$1' group by discord_id";
   	

    try {
	    
	




 //     await UserService.saveVerifiedUser({ discordId: message.author.id, discordServerId: '837189238289203201', generatedUserToken: hashVerifyToken.toString() });
    } catch (e) {
      // Object.keys(client.guilds).forEach((row) => {
      //   console.log(row);
      // });
      // const ids = client.guilds.cache.map((dids) => dids.id);
      // console.log('IDs list', ids);
      // console.log('THIS IS THE SERVER ID: ', client.guilds);
      message.channel.send(`User Error Message: ${e}`);
    }



    //   if (args.length === 1) {
    //   message.channel.send('Public key is missing');
    //   } else {
	    
	       // console.log('test');
	  let mydiscordid=message.author.id.toString().trim();

	    let dbDiscordId='';


	

      

console.log(discordId);


console.log(mydiscordid);
console.log(dbDiscordId);

console.log(mydiscordid.localeCompare(dbDiscordId));



	    if (mydiscordid.localeCompare(dbDiscordId)===1)
	    {
			message.channel.send(getTokenLink(hashVerifyToken));
    	}
    	
	    if (mydiscordid.localeCompare(dbDiscordId)===0)
    	{
       		 message.channel.send('You are verified bro, chill for now.');
        }

    
  //   }
  },
};
