import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Plus } from "lucide-react";
import { accountants } from "~/lib/data/accountants";

const AccountantList = () => {
  return (
    <Card className="p-3">
      <h2 className="mb-4 text-xl font-semibold">Tax Accountants</h2>
      <Separator className="my-2" />
      <CardContent className="px-4">
        <div className="flex flex-col justify-between space-y-4">
          {accountants.map((accountant, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${accountant.name}`}
                />
                <AvatarFallback>
                  {accountant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">{accountant.name}</h3>
                <p className="text-sm text-gray-500">{accountant.specialty}</p>
                <p className="text-sm text-gray-500">{accountant.phone}</p>
                <p className="text-sm text-gray-500">{accountant.email}</p>
              </div>
            </div>
          ))}
          <Button variant="default">
            <span>
              <Plus />
            </span>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountantList;
