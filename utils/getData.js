import path from "node:path";
import fs from "node:fs/promises";


export async function getData() {
  try {
    const filePath = path.join("data", "data.json");
    const data = await fs.readFile(filePath);
    const parseData = JSON.parse(data);
    return parseData;
  } catch (err) {
    console.log(err.code);
    return [];
  }
  
}
