import z from "zod";
import { fetchAPI } from "./agent";

const StoreShort = z.object({
  store_id: z.string(),
  name: z.string(),
  channel: z.string(),
  platform: z.string(),
  language: z.string(),
  updated_at: z.coerce.date(),
});

export type StoreShort = z.infer<typeof StoreShort>;

export type StoreColumn =
  | "store_id"
  | "name"
  | "channel"
  | "platform"
  | "language"
  | "updated_at";

export function fetchStores(query: Record<string, any>): Promise<StoreShort[]> {
  return fetchAPI(z.array(StoreShort), "get", "/store", undefined, query);
}

const Store = z.object({
  store_id: z.string(),
  name: z.string(),
  channel: z.string(),
  platform: z.string(),
  language: z.string(),
  updated_at: z.coerce.date(),
  created_at: z.coerce.date(),
});

export type Store = z.infer<typeof Store>;

export function fetchStore(storeId: string): Promise<Store> {
  return fetchAPI(Store, "get", `/store/${storeId}`);
}

export function deleteStore(storeId: string): Promise<Store> {
  return fetchAPI(Store, "delete", `/store/${storeId}`);
}

const StoreFilter = z.object({
  languages: z.array(z.string()),
  platforms: z.array(z.string()),
});

type StoreFilter = z.infer<typeof StoreFilter>;

export function fetchFilters(): Promise<StoreFilter> {
  return fetchAPI(StoreFilter, "get", "/store/filters");
}

export type StoreCreateRequest = {
  name: string;
  platform: string;
  language: string;
};

export function createStore(store: StoreCreateRequest): Promise<Store> {
  return fetchAPI(Store, "post", "/store", store);
}

type StoreUpdateRequest = {
  name: string;
};

export function updateStore(
  storeId: string,
  store: StoreUpdateRequest,
): Promise<Store> {
  return fetchAPI(Store, "patch", `/store/${storeId}`, store);
}
