// config is a hash (key|value): you can access to values like config.oauth2 or config['oauth2']
var config = {
  oauth2: {
    client_id:     process.env.CLIENT_ID     || "",
    client_secret: process.env.CLIENT_SECRET || "",
    refresh_token: process.env.REFRESH_TOKEN || ""
  },
  pages: {
    test: {
      token: '12345'
    }
  }
};

if (!config.oauth2.client_id) {
  throw Error('No config found!');
}

module.exports = config;

// process.env.CLIENT_ID = environtment variable

// define environment variables
// export CLIENT_ID=1212121212121212121212121212
// export CLIENT_SECRET=1212121212121212121212121212
// export REFRESH_TOKEN=1212121212121212121212121212
