var dbConnection = require('../GlobalConfig/firebaseConfig');
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(dbConnection),
  databaseURL: "https://ji-serviceprovider-default-rtdb.firebaseio.com/"
});

module.exports = admin;