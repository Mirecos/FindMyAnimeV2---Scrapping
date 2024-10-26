import axios from "axios"
import * as fs from 'fs';

const getAnimeById_URL = "https://api.jikan.moe/v4/anime/{id}"
let new_id = 1

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function main() {
    fs.writeFile('data/data.json', "[", ()=>{})
    for( let i = 1; i < 15000; i++ ){
        console.log("Fetching anime n°"+i)
        await fetchAndSave(i)
        await delay(20000)
    }
    fs.writeFile('data/data.json', "]", ()=>{})
}

async function fetchAndSave(id: number){
    const url = getAnimeById_URL.replace("{id}", id.toString())
    console.log(url)
    const res = await axios.get(url, {timeout: 10000})
    .then(
        (res)=>{
            return res.data.data
        }
    )
    .catch(
        ()=>{
            console.log("Anime n°"+id+" couldn't be retrieved")
        }
    )
    
    if(res){
        res.id = new_id
        new_id++
        await fs.appendFile('data/data.json', JSON.stringify(res)+",", ()=>{})
    }
}

main()