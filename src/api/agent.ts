import type z from "zod";

export function fetchAPI(
  validator: z.ZodType,
  method: "post" | "get" | "put" | "delete" | "patch",
  endpoint: string,
  body?: object,
  params?: Record<string, any>,
): Promise<any> {
  let query = "";
  if (params !== undefined) {
    query += "?";
    Object.keys(params).forEach((key) =>
      params[key] === undefined || params[key] === null
        ? delete params[key]
        : {},
    );
    query += new URLSearchParams(params);
  }
  return new Promise((res, rej) => {
    fetch(`https://api-pim.bake-roll.lan${endpoint}${query}`, {
      method: method.toUpperCase(),
      headers: { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
      .then(async (response) => ({
        status: response.status,
        result: await response.json(),
      }))
      .then(({ status, result }) =>
        status === 200 ? res(validator.parse(result)) : rej(result),
      )
      .catch((e) => rej(e));
  });
}

export type APIError = {
  location: string;
  detail: string;
};
