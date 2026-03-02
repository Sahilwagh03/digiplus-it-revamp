"use client";

import { ReactNode, useState } from "react";
import { Mail, MapPin } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PrimaryButton from "./primary-button";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export default function ContactDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const formspreeEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT as string;

  // 🔥 Strict Indian Validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value))
          return "Enter a valid email";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required";

        // remove spaces
        const cleaned = value.replace(/\s/g, "");

        if (!/^(\+91)?[6-9]\d{9}$/.test(cleaned)) {
          return "Enter valid Indian mobile number";
        }

        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormData] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMessage = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);

        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        });

        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
        }, 2000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-[95vw] rounded-2xl p-0 overflow-hidden">
        <div className="bg-white p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center space-y-1">
            <DialogTitle className="text-lg md:text-2xl font-semibold">
              Ready to Transform Your Operations?
            </DialogTitle>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              Let’s discuss how{" "}
              <span className="font-medium text-foreground">
                DigiPlus
              </span>{" "}
              can accelerate your digital transformation journey.
            </p>
          </DialogHeader>

          <div className="mt-4">
            {success ? (
              <div className="text-center py-8">
                <p className="text-green-600 font-medium">
                  ✅ Message sent successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Name *</Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label>Email *</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Company</Label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Phone *</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Message *</Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={3}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <PrimaryButton
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? "Sending..." : "Schedule Free Consultation"}
                </PrimaryButton>
              </form>
            )}
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground space-y-2">
            <p className="font-medium text-foreground">
              Or reach us directly:
            </p>

            <div className="flex flex-col items-center justify-center gap-2">
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