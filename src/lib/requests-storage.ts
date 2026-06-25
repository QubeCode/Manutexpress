import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import type { ServiceRequest } from "@/types/request";

const REDIS_KEY = "manutexpress:requests";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "requests.json");

function getRedisClient(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;
  return new Redis({ url, token });
}

export type RequestsStorageBackend = "redis" | "file";

export function getRequestsStorageBackend(): RequestsStorageBackend {
  return getRedisClient() ? "redis" : "file";
}

async function ensureFileStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readFromFile(): Promise<ServiceRequest[]> {
  await ensureFileStore();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as ServiceRequest[];
}

async function writeToFile(requests: ServiceRequest[]) {
  await ensureFileStore();
  await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2), "utf-8");
}

async function readFromRedis(redis: Redis): Promise<ServiceRequest[]> {
  const data = await redis.get<ServiceRequest[]>(REDIS_KEY);
  if (data && data.length > 0) return data;

  // One-time migration from local file when Redis is empty (e.g. first deploy).
  try {
    const fileData = await readFromFile();
    if (fileData.length > 0) {
      await redis.set(REDIS_KEY, fileData);
      return fileData;
    }
  } catch {
    // File may be absent on Vercel — expected.
  }

  return data ?? [];
}

export async function readAllRequests(): Promise<ServiceRequest[]> {
  const redis = getRedisClient();
  if (redis) {
    return readFromRedis(redis);
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Stockage persistant non configuré. Ajoutez Vercel KV ou Upstash Redis (KV_REST_API_URL + KV_REST_API_TOKEN)."
    );
  }

  return readFromFile();
}

export async function writeAllRequests(requests: ServiceRequest[]) {
  const redis = getRedisClient();
  if (redis) {
    await redis.set(REDIS_KEY, requests);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Impossible d'écrire sur le disque en production. Configurez Vercel KV ou Upstash Redis."
    );
  }

  await writeToFile(requests);
}
