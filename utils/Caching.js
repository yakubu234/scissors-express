'use strict';
const Redis = require("ioredis");

const { REDIS_HOST, REDIS_PORT, REDIS_TTL, REDIS_TIMEOUT, REDIS_PASSWORD } = process.env;

let redis;

///*****************************************************************************/
///*****************************************************************************/
///******************** base 64 encode and decode       ************************/
///*****************************************************************************/
///*****************************************************************************/

const base64_encode = (data) => {
    return Buffer.from(data).toString('base64');
}

const base64_decode = (data) => {
    return Buffer.from(data, 'base64').toString('ascii');
}

///*****************************************************************************/
///*****************************************************************************/
///******************** Create a Redis instance ********************************/
///*****************************************************************************/
///*****************************************************************************/

(async () => {
    redis = new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
        commandTimeout: REDIS_TIMEOUT,
        password: REDIS_PASSWORD
    });
    redis.on("error", (err) => {
        console.log(err);
    });
})();

async function getCache(key) {
    try {
        const cacheData = await redis.get(key);
        if (cacheData) {
            return cacheData
        }

    } catch (err) {
        throw new Error(err);
    }
}

// Set Redis cache Key with a given expiry
function setCache(key, data, ttl = REDIS_TTL) {
    try {
        redis.set(key, JSON.stringify(data), "EX", ttl);
    } catch (err) {
        throw new Error(err);
    }
}

// Remove given Redis cache key
async function removeCache(key) {
    try {

        const cacheData = await redis.get(key);
        await redis.del(key);
        if (cacheData) {
            return cacheData
        }
    } catch (err) {
        throw new Error(err);
    }
}

const parseJson = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str
    }
}

module.exports = { getCache, setCache, removeCache, base64_encode, parseJson };