const axios = require('axios');
const qs = require('qs');
require("dotenv").config({path: '../.env'});

const { 
    TENANT:tenant, 
    CLIENT_ID:client_id, 
    SCOPE:scope, 
    GRANT_TYPE:grant_type, 
    CLIENT_SECRET:client_secret,
    SERVICE_USER_ID
} = process.env

const TOKEN_ENDPOINT = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
const BASE_URL = 'https://graph.microsoft.com/v1.0/users'

const postData = {
    grant_type, 
    client_secret,
    scope,
    client_id
}


class CalendarAPI{
    /*
    This method will get called before every request to the msgraph server.
    This method will contain the implementation for getting and refreshing accessTokens
     */
    static async getAccessToken(){
        try{
            
            let res = await axios.post(TOKEN_ENDPOINT, qs.stringify(postData),
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            return res.data.access_token
        }
        catch (e){
            console.log("Error Retrieving Token")
            if (e.response){
                console.log(e.response.data)
            }
            else console.log(e)
        }
    }

    static async createCalendar(company_name){
        try{
            let access_token = await this.getAccessToken();
            if (!access_token) throw new Error("No Token")
            let res = await axios.post(`${BASE_URL}/${SERVICE_USER_ID}/calendars`,
            {
                name: company_name
            },
            {
                headers: {authorization: access_token}
            })
            console.log('created calendar id')
            return res.data.id
        }
        catch(e){
            if (e.response){
                console.log(e.response.data)
            }
            else console.log(e)
        }
    }

    static createEventBody(jobObj){
        return {
            "subject": jobObj.title,
            "body": {
              "contentType": "HTML",
              "content": jobObj.title
            },
            "start": {
                "dateTime": jobObj.start_date,
                "timeZone": "Pacific Standard Time"
            },
            "end": {
                "dateTime": jobObj.end_date,
                "timeZone": "Pacific Standard Time"
            }
        }
    }

    static createEventStaff(staffList){
        const attendees = staffList.map(staff =>  ({
              "emailAddress": {
                "address": staff.email,
                "name": staff.first_name + " " + staff.last_name
              },
              "type": "required"
            }))
        return attendees
    }

    static async createEvent(calendarID, jobObj){
        try{
            const event = this.createEventBody(jobObj);
            let access_token = await this.getAccessToken();
            if (!access_token) throw new Error("No Token")
            let res = await axios.post(`${BASE_URL}/${SERVICE_USER_ID}/calendars/${calendarID}/events`,
            event,
            {
                headers: {authorization: access_token}
            })
            return res.data.id
        }
        catch(e){
            if (e.response){
                console.log(e.response.data)
            }
            else console.log(e)
            
        }
    }
    static async updateEventDetails(calendarID, eventID, jobObj){
        try{
            const updates = this.createEventBody(jobObj);
            let access_token = await this.getAccessToken();
            if (!access_token) throw new Error("No Token")
            await axios.patch(`${BASE_URL}/${SERVICE_USER_ID}/calendars/${calendarID}/events/${eventID}`,
            updates,
            {
                headers: {authorization: access_token}
            })
        }
        catch(e){
            if (e.response){
                console.log(e.response.data)
            }
            else console.log(e)
        }
    }
    static async updateEventAttendees(calendarID, eventID, staffList){
        try{
            const attendees = this.createEventStaff(staffList);
            let access_token = await this.getAccessToken();
            if (!access_token) throw new Error("No Token")
            await axios.patch(`${BASE_URL}/${SERVICE_USER_ID}/calendars/${calendarID}/events/${eventID}`,
            {attendees},
            {
                headers: {authorization: access_token}
            })
        }
        catch(e){
            if (e.response){
                console.log(e.response.data)
            }
            else console.log(e)
        }
    }

    // delete all calendars except the primary and demo calendar
    static async deleteAllCalendars(){
        try{
            let access_token = await this.getAccessToken();
            let res = await axios.get(`${BASE_URL}/${SERVICE_USER_ID}/calendars/`,

            {
                headers: {authorization: access_token}
            })
            for (let calendar of res.data.value){
                if (calendar.name !== 'Calendar' && calendar.name !== 'Demo Company'){
                    let res = await axios.delete(`${BASE_URL}/${SERVICE_USER_ID}/calendars/${calendar.id}`,
                    {
                        headers: {authorization: access_token}
                    })
                    console.log(res.status)
                }
            
            }
        }
        catch(e){
            console.log(e.response.data)
        }
    }

    static async getAllCalendars(){

        try{
            let access_token = await this.getAccessToken();
            let res = await axios.get(`${BASE_URL}/${SERVICE_USER_ID}/calendars`,
            {
                headers: {authorization: access_token}
            })
            console.log(res.data)
        }
        catch(e){
            console.log(e.response.data)
        }
    }
   
}

module.exports = CalendarAPI
// CalendarAPI.deleteAllCalendars()
// calls to create events for jobs in demo data
// CalendarAPI.createEvent('AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAAAAEGAADOkpB1ICt6TpndDjvJOZEqAAAB5zU0AAA=', {title: '20 Day River', start_date: '2020-08-10', end_date: '2020-08-30'})

// CalendarAPI.createEvent('AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAAAAEGAADOkpB1ICt6TpndDjvJOZEqAAAB5zU0AAA=', {title: '15 Day Mountain', start_date: '2020-07-04', end_date: '2020-07-19'})

// CalendarAPI.createEvent('AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAAAAEGAADOkpB1ICt6TpndDjvJOZEqAAAB5zU0AAA=', {title: '30 Day Mountain', start_date: '2020-07-15', end_date: '2020-08-15'})

