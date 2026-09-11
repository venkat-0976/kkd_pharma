import { authService } from "@/services/auth/auth.service";

// Centralized API Base URL strictly referencing import.meta.env.VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class ApiError extends Error {
  public status: number;
  public code?: string | undefined;
  public details?: Record<string, string[]> | undefined;

  constructor(message: string, status: number, code?: string, details?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized access") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Access forbidden") {
    super(message, 403, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ValidationError extends ApiError {
  constructor(message = "Validation failed", details?: Record<string, string[]>) {
    super(message, 422, "VALIDATION_FAILED", details);
    this.name = "ValidationError";
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers: customHeaders, ...restOptions } = options;

  let url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers = new Headers(customHeaders);
  headers.set("Content-Type", "application/json");

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

