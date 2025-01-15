import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Form } from "@remix-run/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

const NewSaaSPlanButton = () => {
  const [saasIdea, setSaasIdea] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Plan a new project
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-description="Adding a Project"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form method="post" className="space-y-4">
          <div>
            <Label
              htmlFor="saasIdea"
              className="block text-sm font-medium text-gray-700"
            >
              SaaS Idea
            </Label>
            <Input
              id="saasIdea"
              value={saasIdea}
              onChange={(e) => setSaasIdea(e.target.value)}
              placeholder="Describe your SaaS idea"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="targetMarket"
              className="block text-sm font-medium text-gray-700"
            >
              Target Market
            </Label>
            <Input
              id="targetMarket"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              placeholder="Who is your target market?"
              required
            />
          </div>
          <div>
            <label
              htmlFor="keyFeatures"
              className="block text-sm font-medium text-gray-700"
            >
              Key Features
            </label>
            <Textarea
              id="keyFeatures"
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              placeholder="List the key features of your SaaS"
              required
            />
          </div>
          <Button type="submit">Save SaaS Plan</Button>
        </Form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSaaSPlanButton;
