const crypto = require("crypto");

const generateVerificationToken = async () => {
  try {
    const token = await crypto.randomBytes(32).toString("hex");
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  generateVerificationToken,
};
