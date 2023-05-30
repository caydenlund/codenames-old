import {Streamer} from "../../api/streamer/streamer";

export const Startup = () => {
    Streamer.allowRead("all");
    Streamer.allowWrite("all");
    console.log("Started up!");
};