/**
 * core/types/index.ts
 * Shared utility types used across the entire application.
 */

// ── Utility Types ─────────────────────────────────────────────────

/** Makes a type nullable */
export type Nullable<T> = T | null;

/** Makes a type optional (undefined) */
export type Maybe<T> = T | undefined;

/** Makes a type nullable or undefined */
export type Optional<T> = T | null | undefined;

/** Extract the resolved type of a Promise */
export type Awaited<T> = T extends Promise<infer R> ? R : T;

// ── API Shell Types ───────────────────────────────────────────────
// These are shells only — fill in when API integration begins.

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string | null;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

// ── Common Entity Fields ──────────────────────────────────────────

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
