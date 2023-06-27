const models = require('../models');
const seed = require('./seed');
(async () => {
    
    await models.sequelize.sync({ force: false })
    console.log('/------- DATABASE HAS BEEN CREATED -------/');
    await seed();
    console.log('/------- DATABASE HAS BEEN BOOTSTRAPPED -------/');
    process.exit(0)
    
})()