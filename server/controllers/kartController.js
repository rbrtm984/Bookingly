const db = require('../models/kartModel');
const kartController = {};

// kartController.getLeaderBoard = async(req, res, next) => {
//   try {

//   } catch (error) {
//     return next({ message: { err: 'error getting Leader Board' } });
//   }
// };

kartController.getRaceSchedule = async (req, res, next) => {
  try {
    const date = '2023-11-08';
    const scheduleQuery = `SELECT r.id as race_id, r.date, r.slot, r.winner, r.reporter, p.user_id
    FROM races r
    JOIN participants p ON r.id = p.race_id
    WHERE r.date = '2023-11-09'`;

    const scData = await db.query(scheduleQuery);
    console.log('Data ', scData.rows);
    let scheduleObj = {};

    scData.rows.forEach((el) => {
      if (el.slot[0] === "L" && !scheduleObj.lunch) scheduleObj.lunch = {};
      if (el.slot[0] === "D" && !scheduleObj.dinner) scheduleObj.dinner = {};
      if (el.slot[0] === "E" && !scheduleObj.evening) scheduleObj.evening = {};
      
      switch (el.slot) {
        case 'L1' :
          if (!scheduleObj.lunch.slot1) scheduleObj.lunch.slot1 = []; 
          scheduleObj.lunch.slot1.push(el.user_id);
          break;
        case 'L2' :
            if (!scheduleObj.lunch.slot2) scheduleObj.lunch.slot2 = []; 
            scheduleObj.lunch.slot2.push(el.user_id);
            break; 
        case 'L3' :
          if (!scheduleObj.lunch.slot3) scheduleObj.lunch.slot3 = []; 
          scheduleObj.lunch.slot3.push(el.user_id);
          break;
        case 'L4' :
          if (!scheduleObj.lunch.slot4) scheduleObj.lunch.slot4 = []; 
          scheduleObj.lunch.slot4.push(el.user_id);
          break;

        case 'D1' :
          if (!scheduleObj.dinner.slot1) scheduleObj.dinner.slot1 = []; 
          scheduleObj.dinner.slot1.push(el.user_id);
          break;
        case 'D2' :
            if (!scheduleObj.dinner.slot2) scheduleObj.dinner.slot2 = []; 
            scheduleObj.dinner.slot2.push(el.user_id);
            break; 
        case 'D3' :
          if (!scheduleObj.dinner.slot3) scheduleObj.dinner.slot3 = []; 
          scheduleObj.dinner.slot3.push(el.user_id);
          break;
        case 'D4' :
          if (!scheduleObj.dinner.slot4) scheduleObj.dinner.slot4 = []; 
          scheduleObj.dinner.slot4.push(el.user_id);
          break;

        case 'E1' :
          if (!scheduleObj.evening.slot1) scheduleObj.evening.slot1 = []; 
          scheduleObj.evening.slot1.push(el.user_id);
          break;
        case 'E2' :
            if (!scheduleObj.evening.slot2) scheduleObj.evening.slot2 = []; 
            scheduleObj.evening.slot2.push(el.user_id);
            break; 
        case 'E3' :
          if (!scheduleObj.evening.slot3) scheduleObj.evening.slot3 = []; 
          scheduleObj.evening.slot3.push(el.user_id);
          break;
        case 'E4' :
          if (!scheduleObj.evening.slot4) scheduleObj.evening.slot4 = []; 
          scheduleObj.evening.slot4.push(el.user_id);
          break;
      }
    })

    console.log('Object ', scheduleObj);
    res.locals.schedule = scheduleObj;
    return next();

  } catch (error) {
    return next({ message: { err: 'error getting Leader Board' } });
  }
};

module.exports = kartController;