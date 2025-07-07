import { addRiddle, DeleteRiddleById, updateRiddle, readAll } from "../DAL/RiddleDAL.js";
import { read } from "./fileHelper.js";
import { findOrCreatePlayer, UpdateTimeOfPlayer } from "../DAL/PlayerDAL.js";

export {
    addRiddle,
    read,
    DeleteRiddleById,
    updateRiddle,
    readAll,
    findOrCreatePlayer,
    UpdateTimeOfPlayer
};
