const db = require('../models/kartModel');
const kartController = {};

kartController.getLeaderBoard = async(req, res, next) => {
  try {
    const leaderQuery = `SELECT id, username, avatar, current_rank FROM users ORDER BY current_rank DESC;`;
    const leaderData = await db.query(leaderQuery);
    res.locals.leaderBoard = leaderData.rows.slice(0, 4);
    return next();

  } catch (error) {
    return next({ message: { err: 'error getting Leader Board' } });
  }
};

kartController.getRaceSchedule = async (req, res, next) => {
  try {

    //Fetch race information, participants id, on given date

    const date = '2023-11-08';
    const scheduleQuery = `SELECT r.id as race_id, r.date, r.slot, r.winner, r.reporter, p.user_id
    FROM races r
    JOIN participants p ON r.id = p.race_id
    WHERE r.date = '2023-11-08'`;
    const scData = await db.query(scheduleQuery);

    //Fetch user id and username
    const userQuery = `SELECT id, username FROM users`
    const userData = await db.query(userQuery);
    
    let idToUsername = {};
    for (let i = 0; i < userData.rows.length; i++) {
      idToUsername[userData.rows[i]['id']] = userData.rows[i]['username']
    };

    let scheduleObj = {};

    //Populate scheduleObj with races slots
    scData.rows.forEach((el) => {
      if (el.slot[0] === "L" && !scheduleObj.lunch) scheduleObj.lunch = {};
      if (el.slot[0] === "D" && !scheduleObj.dinner) scheduleObj.dinner = {};
      if (el.slot[0] === "E" && !scheduleObj.evening) scheduleObj.evening = {};
      
      switch (el.slot) {
        case 'L1' :
          if (!scheduleObj.lunch.slot1) scheduleObj.lunch.slot1 = []; 
          scheduleObj.lunch.slot1.push(idToUsername[el.user_id.toString()]);
          break;
        case 'L2' :
            if (!scheduleObj.lunch.slot2) scheduleObj.lunch.slot2 = []; 
            scheduleObj.lunch.slot2.push(idToUsername[el.user_id.toString()]);
            break; 
        case 'L3' :
          if (!scheduleObj.lunch.slot3) scheduleObj.lunch.slot3 = []; 
          scheduleObj.lunch.slot3.push(idToUsername[el.user_id.toString()]);
          break;
        case 'L4' :
          if (!scheduleObj.lunch.slot4) scheduleObj.lunch.slot4 = []; 
          scheduleObj.lunch.slot4.push(idToUsername[el.user_id.toString()]);
          break;

        case 'D1' :
          if (!scheduleObj.dinner.slot1) scheduleObj.dinner.slot1 = []; 
          scheduleObj.dinner.slot1.push(idToUsername[el.user_id.toString()]);
          break;
        case 'D2' :
            if (!scheduleObj.dinner.slot2) scheduleObj.dinner.slot2 = []; 
            scheduleObj.dinner.slot2.push(idToUsername[el.user_id.toString()]);
            break; 
        case 'D3' :
          if (!scheduleObj.dinner.slot3) scheduleObj.dinner.slot3 = []; 
          scheduleObj.dinner.slot3.push(idToUsername[el.user_id.toString()]);
          break;
        case 'D4' :
          if (!scheduleObj.dinner.slot4) scheduleObj.dinner.slot4 = []; 
          scheduleObj.dinner.slot4.push(idToUsername[el.user_id.toString()]);
          break;

        case 'E1' :
          if (!scheduleObj.evening.slot1) scheduleObj.evening.slot1 = []; 
          scheduleObj.evening.slot1.push(idToUsername[el.user_id.toString()]);
          break;
        case 'E2' :
            if (!scheduleObj.evening.slot2) scheduleObj.evening.slot2 = []; 
            scheduleObj.evening.slot2.push(idToUsername[el.user_id.toString()]);
            break; 
        case 'E3' :
          if (!scheduleObj.evening.slot3) scheduleObj.evening.slot3 = []; 
          scheduleObj.evening.slot3.push(idToUsername[el.user_id.toString()]);
          break;
        case 'E4' :
          if (!scheduleObj.evening.slot4) scheduleObj.evening.slot4 = []; 
          scheduleObj.evening.slot4.push(idToUsername[el.user_id.toString()]);
          break;
      }
    })

    console.log('Object ', scheduleObj);
    res.locals.schedule = scheduleObj;
    return next();

  } catch (error) {
    return next({ message: { err: 'error getting Race Schedule' } });
  }
};

module.exports = kartController;