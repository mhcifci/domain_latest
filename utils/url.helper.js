async function validateURL(url) {
  try {
    console.log(url);
    if (!url) {
      throw new Error("URL boş olamaz.");
    }

    if (!url.match(/^www(\.)/)) {
      throw new Error("URL formatı yanlıştır.");
    }
    return url;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  validateURL,
};
