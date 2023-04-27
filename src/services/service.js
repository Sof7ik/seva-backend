import {ObjectId} from "mongodb"
import Config from "../../config/config.js"

let db

const config = new Config().getMongo()
config.ConnDB().then(
    result => { db = result }
).catch(err => console.log(err))

export async function Create(collections, data)  {
    try {
        if (collections === "models"){
            data.time_create = new Date()
            data.last_update = new Date()
        }
        return await db.collection(collections).insertOne(data)
    }catch (err) {
        return err
    }
}

export async function FindToId(collections, filters = {}, projection = {}, allFind = true, id = 0){
    try {
        const collect = db.collection(collections)
        if (allFind){
            return await collect.find(filters).project(projection).toArray()
        }else{
            return await collect.findOne({_id: new ObjectId(id)})
        }
    }catch (err) {
        err.message = 'not found in database'
        return err
    }
}

export async function Update(collections, id, data) {
    try {
        const object = await db.collection(collections).findOne({_id: new ObjectId(id)})
        if (object) {
            if (collections === "models") {
                data.last_update = new Date()
            }
            return await db.collection(collections).updateOne({_id: new ObjectId(id)}, {$set: data})
        }
    }catch (err){
        return err
    }
}

export async function Delete(collections, id) {
    try {
        const object = await db.collection(collections).findOne({_id: new ObjectId(id)})
        if (object){
            return await db.collection(collections).deleteOne({_id: new ObjectId(id)})
        }else{
            return null
        }
    }catch (err) {
        return err
    }
}

export async function GetApiKeys() {
    try {
        const keys = []
        let objectKeys = await FindToId('users')
        objectKeys.forEach(element => keys.push(element.api_key))
        if (keys){
            return keys
        }else{
            return null
        }
    }catch (err) {
        return err
    }
}

export async function DeleteApiKey(apikey){
    try {
        const object = await db.collection('users').findOne({ 'api_key': apikey })
        if (object){
            return await db.collection('users').deleteOne({ 'api_key': apikey })
        }else{
            return null
        }
    }catch (err) {
        return err
    }
}

