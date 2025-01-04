export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  let pageCategory = url.pathname.replace(/^\//, "");
  pageCategory = pageCategory.replace(/^\w/, (c) => c.toUpperCase());
  const users = await db.note.findMany({
    where: {
      category: "Education",
    },
  });
  return users;
}
