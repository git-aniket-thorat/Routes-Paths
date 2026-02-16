import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendRespones.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvents.js";
import { stories } from "../data/story.js";

export async function handleGet(res) {
  try {
    const data = await getData();
    const content = JSON.stringify(data);
    sendResponse(res, 200, "application/json", content);
  } catch (err) {
    console.log(err.code);
  }
}

export async function handlePost(req, res) {
  try {
    const parseBody = await parseJSONBody(req);
    const sanitizedBody = sanitizeInput(parseBody);
    await addNewSighting(sanitizedBody);
    const content = JSON.stringify(sanitizedBody);
    sightingEvents.emit('sighting-added',sanitizedBody)
    sendResponse(res, 201, "application/json", content);
  } catch (err) {
    const content = JSON.stringify({ error: err });
    console.log({ error: err });
    sendResponse(res, 400, "application/json", content);
  }

}

export async function handleNews(req,res){
    res.statusCode = 200
    res.setHeader('Content-Type','text/event-stream')
    res.setHeader('Cache','on-cache')
    res.setHeader('Connection','keep-alive')

    setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length)

    res.write(
      `data: ${JSON.stringify({
        event: 'news-update',
        story: stories[randomIndex]
      })}\n\n`
    )
    }, 3000)
  }
