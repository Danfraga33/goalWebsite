import { NoteCategory } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Evernote from "~/components/Evernote";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { clientsData } from "~/lib/data/clients";
import { productsData } from "~/lib/data/products";
import { db } from "~/lib/db/db";
import { Client, Product } from "~/lib/types/types";
import { getPageCategory } from "~/utils/pageUtils";

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
  console.log(formData);
  const addNote = await db.note.create({
    data: {
      authorId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return null;
}

const Agency = () => {
  const { notes } = useLoaderData<typeof loader>();
  // const [products, setProducts] = useState<Product[]>(productsData);
  // const [clients, setClients] = useState<Client[]>(clientsData);
  // const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
  //   name: "",
  //   description: "",
  //   price: 0,
  // });

  // const [newClient, setNewClient] = useState<Omit<Client, "id">>({
  //   name: "",
  //   company: "",
  //   email: "",
  // });

  // const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  // const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);

  // const handleAddProduct = () => {
  //   const id = (products.length + 1).toString();
  //   setProducts([...products, { ...newProduct, id }]);
  //   setNewProduct({ name: "", description: "", price: 0 });
  //   setIsProductDialogOpen(false);
  // };

  // const handleAddClient = () => {
  //   const id = (clients.length + 1).toString();
  //   setClients([...clients, { ...newClient, id }]);
  //   setNewClient({ name: "", company: "", email: "" });
  //   setIsClientDialogOpen(false);
  // };

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Agency</PageTitle>
        {/* <section className="mb-8">
          <h1 className="text-center text-4xl font-bold text-primary">
            Digital Automation Agency
          </h1>
          <p className="mt-2 text-center text-xl text-gray-600">
            Automating Operations Business
          </p>
        </section> */}
        {/* <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Products & Services</h2>
            <Dialog
              open={isProductDialogOpen}
              onOpenChange={setIsProductDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>Add Product</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productDescription" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="productDescription"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productPrice" className="text-right">
                      Price ($)
                    </Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <p className="font-semibold">${product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Target Market</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600">
                Our agency primarily targets small to medium-sized businesses in
                the technology and creative industries. We focus on companies
                looking to establish or improve their online presence, increase
                their digital marketing efforts, and optimize their business
                processes through technology. Our ideal clients are
                forward-thinking organizations that value innovation and are
                ready to invest in high-quality digital solutions.
              </p>
            </CardContent>
          </Card>
        </section> */}
        {/* <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Clients</h2>
            <Dialog
              open={isClientDialogOpen}
              onOpenChange={setIsClientDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>Add Client</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="clientName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="clientName"
                      value={newClient.name}
                      onChange={(e) =>
                        setNewClient({ ...newClient, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="clientCompany" className="text-right">
                      Company
                    </Label>
                    <Input
                      id="clientCompany"
                      value={newClient.company}
                      onChange={(e) =>
                        setNewClient({ ...newClient, company: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="clientEmail" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={newClient.email}
                      onChange={(e) =>
                        setNewClient({ ...newClient, email: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleAddClient}>Add Client</Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <Card key={client.id}>
                <CardHeader>
                  <CardTitle>{client.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm text-gray-600">{client.company}</p>
                  <p className="text-sm">{client.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}
        <section>
          <Evernote notesData={notes} />
        </section>
      </div>
    </Sidebar>
  );
};

export default Agency;
