export interface GenericSearchQuery {
  query: string;
  page: number;
  size: number;
  orderBy?: string;
  direction?: 'ASC' | 'DESC';
}
