import { get, post } from "./api.js";

const endpoints = {
    going: '/data/going',
    getGoings: eventId => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    getGoingsById: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}


export async function going(eventId){
    return post(endpoints.going, {eventId})
}

export async function getGoings(eventId){
    return get(endpoints.getGoings(eventId));
}

export async function getUserGoings(eventId, userId){
    return get(endpoints.getGoingsById(eventId, userId));
}