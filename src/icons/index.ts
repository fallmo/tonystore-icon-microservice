import { Request, Response } from "express";
import { getIcon } from "./utils";
import { redisSet } from "../redis";
import { join } from "path";

export default async (req: Request, res: Response) => {
  let url = req.params.url;
  const fallback_url =
    "https://res.cloudinary.com/smf19api4cloud/image/upload/v1598201932/misc/bag_o0gsm7.png";
  try {
    const icon = await getIcon(url, fallback_url);
    redisSet(url, icon.toString("binary"));
    res.end(icon);
  } catch (error) {
    res.sendFile(join(__dirname, "../", "file", "bag.png"));
  }
};
