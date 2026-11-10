/** First and last item number shown on the current page (1-based). */
export const getPageRange = ({ offset, limit, total }: { offset: number; limit: number; total: number }) => {
  if (total <= 0) return { start: 0, end: 0 };
  return { start: offset + 1, end: Math.min(offset + limit, total) };
};
