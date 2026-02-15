import { getData } from "./getData.js"
import path from 'node:path'
import fs from 'node:fs/promises'

export async function addNewSighting(newSighting){

    try{
        const sighting =await getData()
        sighting.push(newSighting)
        const pathJSON=path.join('data','data.json')
        await fs.writeFile(
            pathJSON,
            JSON.stringify(sighting),
            'utf8'
        )



    }catch(err){
        throw new Error(err)
    }
}