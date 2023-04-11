import { get, post, put, del } from "./api.js"

//TODO
const endpoints = {
    events: '/data/events?sortBy=_createdOn%20desc',
    byId: '/data/events/',

}

export async function getAllEvents(){
    return get(endpoints.events);
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function createEvent(data){
    return post('/data/events', data);
}

export async function updateEvent(id, data){
    return put(endpoints.byId + id, data);
}

export async function deleteEvent(id){
    return del(endpoints.byId + id);
}