import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";

import { db } from "~/lib/db/db";
import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory } from "~/utils/pageUtils";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const notes = await db.note.findMany({
    where: {
      category: pageCategory as NoteCategory,
    },
  });

  if (!notes) throw new Response("Not Found", { status: 404 });
  return json({ notes });
}

export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  const addNote = await db.note.create({
    data: {
      userId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return null;
}

const RealEstate = () => {
  const { notes } = useLoaderData<typeof loader>();
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <PageTitle>Real Estate</PageTitle>
          {/* <section>
          <h2 className="mb-4 text-2xl font-semibold">My Investments</h2>
          <Card>
          <CardContent className="p-6">
          <p className="text-start text-lg text-gray-500">Coming soon...</p>
          </CardContent>
          </Card>
          </section>
          <section>
          <h2 className="mb-4 text-2xl font-semibold">Watchlist</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {watchlistProperties.map((property) => (
              <Card
                key={property.id}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                <CardTitle className="flex items-center justify-between">
                {property.type}
                <Badge variant="secondary">{property.price}</Badge>
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <p className="mb-2 text-sm text-gray-500">
                  {property.address}
                  </p>
                  <Dialog>
                  <DialogTrigger asChild>
                  <Button className="w-full">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                  <DialogTitle>{property.type}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                  <div>
                  <h4 className="mb-1 font-semibold">Address</h4>
                  <p className="text-sm">{property.address}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Price</h4>
                  <p className="text-sm">{property.price}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Rental Income</h4>
                  <p className="text-sm">{property.rentalIncome}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Cap Rate</h4>
                  <p className="text-sm">{property.capRate}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">
                  Cash on Cash Return
                  </h4>
                  <p className="text-sm">{property.cashOnCash}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Description</h4>
                  <p className="text-sm text-gray-600">
                  {property.description}
                  </p>
                  </div>
                  </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                </Card>
                ))}
                </div>
                </section>
                <section className="flex gap-2">
                {" "}
                <CapitalGrowth
                name="Property Value Growth (Last 5 Years)"
                data={capitalGrowthData}
                />
              </section> */}
        </div>
        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default RealEstate;
