export const removeUnusedQueryParams = (query: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(query).filter(([_, v]) => v !== undefined));
