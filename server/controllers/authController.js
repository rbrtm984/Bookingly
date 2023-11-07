const db = require('../models/kartModel');
const loginController = {};

loginController.getUser = async (req, res, next) => {
    try {
      const testQuery = `SELECT * FROM public.users`;
      const data = await db.query(testQuery);
      console.log(data);
      res.locals.data = data; 
      return next(); 
    }
    catch (error) {
        return next({ message: { err: 'error getting users' } });
    }
};

module.exports = loginController; 