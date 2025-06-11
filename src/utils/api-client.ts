import axios, { AxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_URL;
// const baseURL = "https://sandbox.api.tactix.olivegroup.io/";

interface ClientProps {
  method: string;
  endpoint: string;
  optional?: {
    data?: unknown;
    params?: object;
    headers?: object;
    token?: string;
    baseUrl?: string;
    isFormData?: boolean;
    dontStringify?: boolean;
  };
}

async function client({
  method,
  endpoint,
  optional: {
    data,
    token,
    params,
    headers: customHeaders,
    dontStringify,
    ...customConfig
  } = {},
}: ClientProps) {
  const config: AxiosRequestConfig<object> = {
    method: method.toUpperCase(),
    data: data ? (dontStringify ? data : JSON.stringify(data)) : undefined,
    baseURL: baseURL,
    url: `/${endpoint}`,

    headers: {
      "access-control--allow-origin": "*",
      token: token ? token : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    params: {
      ...params,
    },
    ...customConfig,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    console.log("catch", error);
    return Promise.reject(error);
  }
}

export { client };
