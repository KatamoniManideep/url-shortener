import { Redis } from "@upstash/redis";
import { Url } from "./db";

const redis=Redis.fromEnv()

interface CachedUrl{
    originalUrl: string;
    ttl: number
}

export async function getUrl(shortId:string): Promise<string|null>{

    const cached = await redis.get<CachedUrl>(`ur:${shortId}`);

    if(cached){
        await redis.expire(`url:${shortId}`,cached.ttl);
        return cached.originalUrl;
    }

    const url = await Url.findOne({shortId});
    if(url){
        await redis.setex(`url:${shortId}`,3600,{
            originalUrl: url.originalUrl,
            ttl:3600,
        });

        return url.originalUrl;
    }
    return null;
}

export async function incrementClicks(shortId:string):Promise<number>{

    const clicks= await redis.incr(`url:${shortId}:clicks`)

    Url.findOneAndUpdate({shortId},{$inc:{ clicks:1}})
    .catch(console.error);

    return clicks;
}