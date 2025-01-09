export function getPageCategory(requestUrl: string): string {
  const url = new URL(requestUrl);
  let pageCategory = url.pathname.replace(/^\//, "");
  pageCategory = pageCategory.replace(/^\w/, (c) => c.toUpperCase());
  return pageCategory;
}
