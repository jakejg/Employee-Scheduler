const axios = require('axios');
const qs = require('qs');
require("dotenv").config({path: '../.env'});
const ExpressError = require('../helpers/expressError');

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
            console.log(e.response.data)
        }
    }

  
    static async createCalendar(comp_id){
        try{
            let access_token = await this.getAccessToken();
            let res = await axios.post(`${BASE_URL}/${SERVICE_USER_ID}/calendars`,
            {
                name: comp_id
            },
            {
                headers: {authorization: access_token}
            })
            return res.data.id
        }
        catch(e){
            console.log(e.response.data)
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

    static async createEvent(calendarID, jobObj){
        try{
            const event = this.createEventBody(jobObj);
            let access_token = await this.getAccessToken();
            let res = await axios.post(`${BASE_URL}/${SERVICE_USER_ID}/calendars/${calendarID}/events`,
            event,
            {
                headers: {authorization: access_token}
            })
            return res.data.id
        }
        catch(e){
            console.log(e.response.data)
        }
    }
    static async updateEvent(calendarID, eventID, updatedEvent){

        try{
            let access_token = await this.getAccessToken();
            let res = await axios.patch(`${BASE_URL}/${SERVICE_USER_ID}/calendars/${calendarID}/events/${eventID}`,
            updatedEvent,
            {
                headers: {authorization: access_token}
            })
        }
        catch(e){
            console.log(e.response.data)
        }
    }
}


module.exports = CalendarAPI

