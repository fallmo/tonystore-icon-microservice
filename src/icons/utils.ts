import fetch from "node-fetch";
import AbortController from "abort-controller";

export const getIcon = async (
  url: string,
  fallback_url: string
): Promise<Buffer> => {
  const controller = new AbortController();
  const timeout: number = 5000;
  setTimeout(() => {
    controller.abort();
  }, timeout);
  const endpoint: string = `https://i.olsh.me/icon?url=${url}&size=32..120..200&fallback_icon_url=${fallback_url}`;
  const response = await fetch(endpoint, {
    signal: controller.signal,
  });
  const data = await response.buffer();
  return data;
};
