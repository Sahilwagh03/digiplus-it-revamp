"use client";

import { ReactNode, useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PrimaryButton from "./primary-button";

export default function ContactDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className=" w-[95vw] rounded-2xl p-0 overflow-hidden">
        <div className="bg-white p-6 max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <DialogHeader className="text-center space-y-1">
            <DialogTitle className="text-lg md:text-2xl font-semibold">
              Ready to Transform Your Operations?
            </DialogTitle>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              Let’s discuss how{" "}
              <span className="font-medium text-foreground">DigiPlus</span>{" "}
              can accelerate your digital transformation journey.
            </p>
          </DialogHeader>

          <div className="mt-4">
            <form className="space-y-4">

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input placeholder="Your full name" />
                </div>

                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@company.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Company</Label>
                  <Input placeholder="Company name" />
                </div>

                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Message</Label>
                <Textarea
                  placeholder="Tell us about your project..."
                  rows={3}
                />
              </div>

              <PrimaryButton className="w-full justify-center">
                Schedule Free Consultation
              </PrimaryButton>
            </form>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground space-y-2">
            <p className="font-medium text-foreground">Or reach us directly:</p>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                salesmanager@digiplusit.com
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Mumbai | Bangalore | Pune
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}