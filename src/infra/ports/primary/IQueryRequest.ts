export interface IQueryRequest {
  page?: number,
  size?: number;
  filters?: Record<string, unknown>;
}
