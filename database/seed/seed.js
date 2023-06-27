
const models = require('../models');

const data = {
    uniqueId: 123213,
    message: ['hello', 'hello1'],
    mode: 'normal',
    balance: 10
}

module.exports = async () => {
    try {
      await models.Ttl.create(data);
      
      const ttlData = await models.Ttl.findOne();
      
      console.log('TTL DATA FROM DB:: ', ttlData);
      
    } catch (error) {
      console.log('Error while seeding: ', error)
    }
  }
  