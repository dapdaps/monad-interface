export const removeEmptyKeys = (
  obj: Record<string, any>
): Record<string, any> => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  });
  return obj;
};

export const objectToQueryString = (obj: Record<string, any>): string => {
  const keyValuePairs = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        for (const val of value) {
          keyValuePairs.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
          );
        }
      } else {
        keyValuePairs.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }
  }
  return keyValuePairs.join("&");
};

const AUTH_TOKENS = `_user`;

// FIXME
const BASE_URL = "https://dev-api-monad.dapdap.net";

const getUrl = (url: string) => {
  return url.startsWith("http") ? url : `${BASE_URL}/api${url}`;
};

const handleUpgrade = (result: any) => {
  if (window.location.pathname === "/upgrade") {
    return;
  }
  if (result && result.code === 9000) {
    window.location.replace("/upgrade");
  }
};

const get = async (
  url: string,
  query?: Record<string, any>,
  opts?: { isSkipFormatUrl?: boolean }
) => {
  const isSkipFormatUrl = opts?.isSkipFormatUrl;
  const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.state?.accessToken?.access_token || ""}`,
      "Content-Type": "application/json"
    }
  };
  if (!query) {
    const res = await fetch(isSkipFormatUrl ? url : getUrl(url), options);
    const result = (await res.json()) as any;
    handleUpgrade(result);
    return result;
  }

  query = removeEmptyKeys(query);
  const queryStr = objectToQueryString(query);
  const res = await fetch(
    `${isSkipFormatUrl ? url : getUrl(url)}?${queryStr}`,
    options
  );
  const result = (await res.json()) as any;
  handleUpgrade(result);
  return result;
};

const getWithToken = async (
  url: string,
  query?: Record<string, any>,
  token?: string
) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };
  if (!query) {
    const res = await fetch(getUrl(url), options);
    const result = (await res.json()) as any;
    handleUpgrade(result);
    return result;
  }

  query = removeEmptyKeys(query);
  const queryStr = objectToQueryString(query);
  const res = await fetch(`${getUrl(url)}?${queryStr}`, options);
  const result = (await res.json()) as any;
  handleUpgrade(result);
  return result;
};

const getWithoutActive = async (
  url: string,
  activity:
    | "coin68"
    | "bitget"
    | "namlongdao"
    | "kol"
    | "dapdapinvite"
    | "okx"
    | "coin98",
  query?: Record<string, any>
) => {
  const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.state?.accessToken?.access_token || ""}`,
      "Content-Type": "application/json",
      activity
    }
  };
  if (!query) {
    const res = await fetch(getUrl(url), options);
    return res.json() as any;
  }

  query = removeEmptyKeys(query);
  const queryStr = objectToQueryString(query);
  const res = await fetch(`${getUrl(url)}?${queryStr}`, options);
  return res.json() as any;
};

const post = async (url: string, data?: object, headers?: object) => {
  const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");
  const res = await fetch(getUrl(url), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokens.state?.accessToken?.access_token || ""}`,
      "Content-Type": "application/json",
      ...(headers || {})
    },
    body: data ? JSON.stringify(data) : undefined
  });
  const result = (await res.json()) as any;
  handleUpgrade(result);
  return result;
};

const postFile = async (url: string, data?: any, headers?: object) => {
  const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");
  const res = await fetch(getUrl(url), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokens.state?.accessToken?.access_token || ""}`,
      ...(headers || {})
    },
    body: data
  });
  const result = (await res.json()) as any;
  handleUpgrade(result);
  return result;
};

const deleteRequest = async (url: string, data: object) => {
  const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");
  const res = await fetch(getUrl(url), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokens.state?.accessToken?.access_token || ""}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return (await res.json()) as any;
};

const asyncFetch = async (url: string, options?: object) => {
  const response = await fetch(url, options);
  return await response.json();
};

const postUpload = async (url: string, data: any) => {
  const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");
  const res = await fetch(getUrl(url), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokens.state?.accessToken?.access_token || ""}`
      // 'Content-Type': 'multipart/form-data'
    },
    body: data
  });
  const result = (await res.json()) as any;

  handleUpgrade(result);
  return result;
};

export {
  get,
  getWithToken,
  post,
  postFile,
  getWithoutActive,
  deleteRequest,
  AUTH_TOKENS,
  asyncFetch,
  postUpload
};
