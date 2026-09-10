import { authService } from "@/services/auth/auth.service";
import { ApiError, UnauthorizedError, ForbiddenError, NotFoundError } from "./errors";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

const BASE_URL = "/api";

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers: customHeaders, ...restOptions } = options;
  
  let url = `${BASE_URL}${path}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers = new Headers(customHeaders);
  headers.set("Content-Type", "application/json");

  // Dynamically attach authorization token when secure backend lands
  const session = authService.getSession();
  if (session) {
    headers.set("Authorization", `Bearer ${session.memberId}`);
  }

  const response = await fetch(url, {
    ...restOptions,
    headers,
  });

  if (!response.ok) {
    let message = "An error occurred";
    let code: string | undefined;
    let details: Record<string, string[]> | undefined;

    try {
      const errorData = await response.json();
      message = errorData.message || message;
      code = errorData.code;
      details = errorData.errors;
    } catch {
      // Ignore if response is not json
    }

    if (response.status === 401) {
      throw new UnauthorizedError(message);
    }
    if (response.status === 403) {
      throw new ForbiddenError(message);
    }
    if (response.status === 404) {
      throw new NotFoundError(message);
    }

    throw new ApiError(message, response.status, code, details);
  }

  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

export const apiClient = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : null,
    });
  },
  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>(path, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : null,
    });
  },
  delete<T>(path: string, options?: RequestOptions) {
    return request<T>(path, { ...options, method: "DELETE" });
  },
};
