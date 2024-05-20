import type { Response } from "express";

export async function handleRequrest(res: Response, callBack: Promise<any>) {
  try {
    const data = await callBack;
    if (data == undefined) {
      res.status(204).send();
      return;
    }
    res.json(data);
  } catch (e) {
    let code = 500;
    if (e.message == "NOT_FOUND") code = 404;
    // if()
    res.status(code).json({
      message: e.message,
      timestamp: new Date(),
    });
  }
}
export function checkIfDefined(data: any) {
  if (data == undefined) throw new Error("NOT_FOUND");
  return data;
}
