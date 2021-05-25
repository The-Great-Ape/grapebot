const DB = require('./db/models');

const { User, Verified } = DB;

const saveUser = async (user) => {
  if (!user) {
    throw new Error('User must not be null');
  }

  if (!user.discordId) {
    throw new Error('No discordId set. Cannot create user');
  }

  try {
    const result = await DB.sequelize.transaction(async (t) => {
      await User.destroy({
        where: {
          discordId: user.discordId,
        },
        transaction: t,
      });

      const newlyCreatedUser = await User.create(user, {
        transaction: t,
      });

      return newlyCreatedUser;
    });
    return result;
  } catch (e) {
    throw new Error(`Could not save user: ${user.discordId}`);
  }
};

const saveVerifiedUser = async (verify) => {
  try {
    const result = await DB.sequelize.transaction(async (t) => {
      await Verified.destroy({
        where: {
          discordId: verify.discordId,
        },
        transaction: t,
      });

      const newlyCreatedVerification = await Verified.create(verify, {
        transaction: t,
      });

      return newlyCreatedVerification;
    });
    return result;
  } catch (e) {
    throw new Error(`Could not save user: ${verify.discordId}`);
  }
};

const getUser = (discordId) => User.findOne({ where: { discordId } });

const deleteUser = async (discordId) => {
  try {
    await DB.sequelize.transaction(async (t) => {
      await User.destroy({
        where: {
          discordId,
        },
        transaction: t,
      });
    });
  } catch (e) {
    throw new Error(`Could not delete user with discordId: ${discordId}`);
  }
};

export default {
  saveUser,
  getUser,
  deleteUser,
  saveVerifiedUser,
};
