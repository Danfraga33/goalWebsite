import React from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ReferralMsg } from "~/lib/constants/Referral";

const Referral = () => {
  return (
    <section>
      <Label htmlFor="referralMsg">Referral Msg</Label>
      <Textarea id="referralMsg" className="min-h-32" value={ReferralMsg} />
    </section>
  );
};

export default Referral;
