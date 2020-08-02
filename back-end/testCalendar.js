let {google} = require('googleapis');
let privatekey = require("./serviceAccount.json");


let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
       ['https://www.googleapis.com/auth/calendar']);

jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err.response.data.error_description);
      return;
    } else {
      console.log("Successfully connected!");
    }
   });

   const calendar = google.calendar({version: 'v3', auth: jwtClient});

let event = {
  'summary': 'Test',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2020-08-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2020-08-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'attendees': [
    {'email': 'jakefrisbee@gmail.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};



calendar.events.insert({
    auth: jwtClient,
    calendarId: 'primary',
    resource: event 

}, function(err) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created');
  })

//    calendar.calendarList.list({auth: jwtClient}, (err, resp) => {
    
//     if (err) {
//         console.log("The API returned an error: " + err);
//          return
//      }
//     else {
//         console.log(resp.data.items)
//     }
// })


// calendar.events.list({
//     calendarId: 'primary',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const events = res.data.items;
//     if (events.length) {
//       events.map((event, i) => {
//         const start = event.start.dateTime || event.start.date;
//         console.log(event.summary);
//       });
//     } else {
//       console.log('No upcoming events found.');
//     }
//   });


   