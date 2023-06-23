import { Request, Response } from "express";
import httpStatus from "http-status";
import { fetchData } from "../services/criptoService";

export async function getCriptoData(req: Request, res: Response) {
    console.log("Cheguei no Controller")
    try {
        const criptoData = await fetchData(1, 10);
        return res.status(httpStatus.OK).send(criptoData)
    }
    catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}