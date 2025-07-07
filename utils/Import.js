import { addRiddle, DeleteRiddleById, updateRiddle, readAll, } from "../managers/RiddleManager.js";
import { read } from "./fileHelper.js";
import { findOrCreatePlayer, UpdateTimeOfPlayer } from "../managers/PlayerManager.js";



export {
    addRiddle,
    read,
    DeleteRiddleById,
    updateRiddle,
    readAll,
    findOrCreatePlayer,
    UpdateTimeOfPlayer
};
