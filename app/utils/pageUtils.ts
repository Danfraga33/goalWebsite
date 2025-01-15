export function getPageCategory(requestUrl: string): string {
  const url = new URL(requestUrl);
  let pageCategory = url.pathname.replace(/^\//, "");
  pageCategory = pageCategory.replace(/^\w/, (c) => c.toUpperCase());
  return pageCategory;
}

export function getParentPath(urlPath: string) {
  // Split the URL path into segments
  const pathSegments = urlPath.split("/").filter(Boolean); // filter(Boolean) removes empty segments

  // Return the first segment as the parent
  return pathSegments[0] || "";
}

export function getSubCategory(category: string) {
  const parts = category.split("/"); // Split the string by "/"
  return parts.length > 1 ? parts[1] : category; // Return the second part (Fundamentals), or the full category if no "/"
}
