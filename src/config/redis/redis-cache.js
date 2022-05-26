import redis from "redis";
import _config from "../configurations.js";
const REDIS_URL = `redis://${_config.REDIS_HOST}:${_config.REDIS_PORT}`;
console.log(REDIS_URL + "\n");
const CLIENT = redis.createClient({ url: REDIS_URL });
CLIENT.connect();

export default CLIENT;
