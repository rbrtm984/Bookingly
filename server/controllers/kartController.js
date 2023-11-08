const db = require('../models/kartModel');

//Helper function to create user id:username object from db query
const userNameToIdFunc = (arr) => {
  let idToUsername = {};
  for (let i = 0; i < arr.length; i++) {
    idToUsername[arr[i]['id']] = arr[i]['username']
  };
  return idToUsername;
};


const kartController = {};

kartController.addRaceParticipant = async(req, res, next) => {
  try {
    const { race, username } = req.body;

    //Get race ID for selected race
    const raceIdQuery = `SELECT * FROM races WHERE date = '2023-11-08' AND slot = $1`
    const raceIdObj = await db.query(raceIdQuery, [race]);
    const raceID = raceIdObj.rows[0]['id'];

    //Get user ID that corresponds to username
    const userQuery = `SELECT id, username FROM users WHERE username = $1`
    const userData = await db.query(userQuery, [username]);
    const userID = userData.rows[0]['id'];

    //Insert new participant into selected race
    const addParticipantQuery = `INSERT INTO participants(race_id, user_id) VALUES ($1, $2);`
    const addparticipant = await db.query(addParticipantQuery, [raceID, userID])
    console.log(addparticipant);
    res.locals.result = userID;
    return next();

  } catch (error) {
    return next({ message: { err: 'error adding new participant' } });
  }
};

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
    //Helper function to convert db output to id:user object
    let currIdToUserName = userNameToIdFunc(userData.rows);

    //Populate scheduleObj with races
    let scheduleObj = {};
    scData.rows.forEach((el) => {
      if (el.slot[0] === "L" && !scheduleObj.lunch) scheduleObj.lunch = {};
      if (el.slot[0] === "D" && !scheduleObj.dinner) scheduleObj.dinner = {};
      if (el.slot[0] === "E" && !scheduleObj.evening) scheduleObj.evening = {};
      
      switch (el.slot) {
        case 'L1' :
          if (!scheduleObj.lunch.race1) scheduleObj.lunch.race1 = []; 
          scheduleObj.lunch.race1.push(currIdToUserName[el.user_id.toString()]);
          break;
        case 'L2' :
            if (!scheduleObj.lunch.race2) scheduleObj.lunch.race2 = []; 
            scheduleObj.lunch.race2.push(currIdToUserName[el.user_id.toString()]);
            break; 
        case 'L3' :
          if (!scheduleObj.lunch.race3) scheduleObj.lunch.race3 = []; 
          scheduleObj.lunch.race3.push(currIdToUserName[el.user_id.toString()]);
          break;
        case 'L4' :
          if (!scheduleObj.lunch.race4) scheduleObj.lunch.race4 = []; 
          scheduleObj.lunch.race4.push(currIdToUserName[el.user_id.toString()]);
          break;

        case 'D1' :
          if (!scheduleObj.dinner.race1) scheduleObj.dinner.race1 = []; 
          scheduleObj.dinner.race1.push(currIdToUserName[el.user_id.toString()]);
          break;
        case 'D2' :
            if (!scheduleObj.dinner.race2) scheduleObj.dinner.race2 = []; 
            scheduleObj.dinner.race2.push(currIdToUserName[el.user_id.toString()]);
            break; 
        case 'D3' :
          if (!scheduleObj.dinner.race3) scheduleObj.dinner.race3 = []; 
          scheduleObj.dinner.race3.push(currIdToUserName[el.user_id.toString()]);
          break;
        case 'D4' :
          if (!scheduleObj.dinner.race4) scheduleObj.dinner.race4 = []; 
          scheduleObj.dinner.race4.push(currIdToUserName[el.user_id.toString()]);
          break;

        case 'E1' :
          if (!scheduleObj.evening.race1) scheduleObj.evening.race1 = []; 
          scheduleObj.evening.race1.push(currIdToUserName[el.user_id.toString()]);
          break;
        case 'E2' :
            if (!scheduleObj.evening.race2) scheduleObj.evening.race2 = []; 
            scheduleObj.evening.race2.push(currIdToUserName[el.user_id.toString()]);
            break; 
        case 'E3' :
          if (!scheduleObj.evening.race3) scheduleObj.evening.race3 = []; 
          scheduleObj.evening.race3.push(currIdToUserName[el.user_id.toString()]);
          break;
        case 'E4' :
          if (!scheduleObj.evening.race4) scheduleObj.evening.race4 = []; 
          scheduleObj.evening.race4.push(currIdToUserName[el.user_id.toString()]);
          break;
      }
    })

    // console.log('Object ', scheduleObj);
    res.locals.schedule = scheduleObj;
    return next();

  } catch (error) {
    return next({ message: { err: 'error getting Race Schedule' } });
  }
};

module.exports = kartController;