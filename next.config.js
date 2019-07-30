require('dotenv').config();

module.exports = {
  exportPathMap: async function() {
    return {
      '/': {
        page: '/',
        query: { id: process.env.DYNAMIC_CONTENT_REFERNCE_ID, account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME }
      }
    };
  }
};
