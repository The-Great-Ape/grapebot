import DiscordHandler from './discord';
import ConfigUtil from './config';

import db from '../lib/db.js';

ConfigUtil.init();

const main = async () => {
  await DiscordHandler.initHandler();
  
};

main();
