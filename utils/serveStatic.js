import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendRespones.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(req, res, baseDir) {
  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }
  const publicDir = path.join(baseDir, "public");
  const pathToPromises = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url,
  );
  
  const ext = path.extname(pathToPromises);
  const contentType = getContentType(ext);

  try {
    const content = await fs.readFile(pathToPromises);
    sendResponse(res, 200, contentType, content);
  } catch (err) {
    if(err.code==='ENOENT'){
      const content =await fs.readFile(path.join(publicDir,'404.html'))
      sendResponse(res,404,contentType,content)
    }else{
      sendResponse(res,500,'text/html','<html><h1>Server Error: ${err.code}</h1></html>')
    }
  }
}
