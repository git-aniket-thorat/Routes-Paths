import path from "node:path";
import fs from "node:fs/promises";
import { sendRespone } from "./sendRespones.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(req, res, baseDir) {
  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const publicDir = path.join(baseDir, "public");

    const pathToPromises = path.join(
      publicDir,
      req.url === "/" ? "index.html" : req.url,
    );

    const ext = path.extname(pathToPromises);
    const contentType = getContentType(ext);
    const content = await fs.readFile(pathToPromises);
    sendRespone(res, 200, contentType, content);
  } catch (err) {
    console.log(err);
  }
}
