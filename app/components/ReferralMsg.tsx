import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Form } from "@remix-run/react";
import { Button } from "./ui/button";

const Referral = ({ referralMsg }: { referralMsg: string }) => {
  const [newRefferal, setNewRefferal] = useState<string>(
    "Hi, \n\nI've just returned home after living abroad for 5 years and came across the software engineer position at SauceAI. Would you be open to sharing my resume with the hiring team?\n\nThanks\nDaniel",
  );

  return (
    <Form method="POST" className="flex flex-col gap-2">
      <Label htmlFor="referralMsg">Referral Msg</Label>
      <Textarea
        id="referralMsg"
        className="min-h-32 py-2"
        value={newRefferal}
        onChange={(e) => setNewRefferal(e.target.value)}
        name="referralMsg"
      />
      <input type="text" hidden readOnly value="referral" name="intent" />
      <Button variant="default">Update</Button>
    </Form>
  );
};

export default Referral;
