const userRepository = require("../repositories/users.repository");
const bcryptjs = require("bcryptjs");

const user = {
  userRegister: async (data) => {
    const userRegistered = await userRepository.create(data);
    const { password, ...userCreated } = userRegistered.rows[0];

    return userCreated;
  },

  detailUser: async (decoded) => {
    const { rows: user } = await userRepository.findOne("id", decoded.id);
    const { password, ...userLogged } = user[0];

    return userLogged;
  },

  editUser: async (userData, decoded) => {
    const { name, email, password } = userData;
    const cryptPassword = await bcryptjs.hash(password, 10);

    return await userRepository.update(
      { name, email, password: cryptPassword },
      decoded.id
    );
  },
};

module.exports = user;
