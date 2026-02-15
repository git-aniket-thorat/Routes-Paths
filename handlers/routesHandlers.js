import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendRespones.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";


export async function handleGet(res) {
  try {
    const data =await getData();
     const content = JSON.stringify(data)
    sendResponse(res, 200, "application/json", content);
  } catch (err) {
    console.log(err.code);
  }
}

export async function handlePost(req, res) {
  try {
    const parseBody = await parseJSONBody(req);
    console.log("parseBody")
    const sanitizedBody= sanitizeInput(parseBody)
    console.log("sanitizedBody")
    await addNewSighting(sanitizedBody);
    console.log("addNewSighting")
     const content = JSON.stringify(sanitizedBody)
    sendResponse(res,201,"application/json",content)
  } catch (err) {
    const content =JSON.stringify({error : err})
    console.log({error : err})
    sendResponse(res,400,"application/json",content)
  }
}
