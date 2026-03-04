"use client";

import { ReactNode, useState, useEffect } from "react";
import { Mail, MapPin, ChevronDown, Check } from "lucide-react";
import { useLenis } from "lenis/react";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  CountryCode,
} from "libphonenumber-js";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PrimaryButton from "./primary-button";

// ─── Country List ────────────────────────────────────────────────────────────
interface Country {
  name: string;
  code: CountryCode;
  dialCode: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { name: "Afghanistan", code: "AF", dialCode: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "AL", dialCode: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Chile", code: "CL", dialCode: "+56", flag: "🇨🇱" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", dialCode: "+57", flag: "🇨🇴" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Hong Kong", code: "HK", dialCode: "+852", flag: "🇭🇰" },
  { name: "Hungary", code: "HU", dialCode: "+36", flag: "🇭🇺" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Iran", code: "IR", dialCode: "+98", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", dialCode: "+964", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "IL", dialCode: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", dialCode: "+962", flag: "🇯🇴" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼" },
  { name: "Lebanon", code: "LB", dialCode: "+961", flag: "🇱🇧" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Morocco", code: "MA", dialCode: "+212", flag: "🇲🇦" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "Romania", code: "RO", dialCode: "+40", flag: "🇷🇴" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94", flag: "🇱🇰" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "Ukraine", code: "UA", dialCode: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "Venezuela", code: "VE", dialCode: "+58", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
];

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

// ─── PhoneInput Component ────────────────────────────────────────────────────
interface PhoneInputProps {
  value: string;
  onChange: (value: string, country: Country) => void;
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  error?: string;
}

function PhoneInput({
  value,
  onChange,
  selectedCountry,
  onCountryChange,
  error,
}: PhoneInputProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      <Label>Phone *</Label>
      <div className="flex gap-2">
        {/* ── Shadcn Popover + Command searchable country picker ── */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={popoverOpen}
              className="flex items-center gap-1.5 h-9 px-2.5 min-w-[90px] justify-between font-normal"
            >
              <span>{selectedCountry.flag}</span>
              <span className="text-muted-foreground text-sm">
                {selectedCountry.dialCode}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
            </Button>
          </PopoverTrigger>

          {/*
            modal={false} is critical here — prevents Radix Popover from fighting
            with the parent Dialog's focus trap, which would break keyboard nav.
          */}
          <PopoverContent className="w-72 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList className="max-h-56">
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {COUNTRIES.map((country) => (
                    <CommandItem
                      key={`${country.code}-${country.dialCode}`}
                      value={`${country.name} ${country.dialCode}`}
                      onSelect={() => {
                        onCountryChange(country);
                        setPopoverOpen(false);
                      }}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <span>{country.flag}</span>
                      <span className="flex-1 truncate">{country.name}</span>
                      <span className="text-muted-foreground text-xs shrink-0">
                        {country.dialCode}
                      </span>
                      {selectedCountry.code === country.code && (
                        <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Phone number input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value, selectedCountry)}
          placeholder={getPlaceholder(selectedCountry.code)}
          className="flex-1 h-9 px-3 border border-input rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ─── Placeholder helper ───────────────────────────────────────────────────────
function getPlaceholder(countryCode: CountryCode): string {
  const examples: Partial<Record<CountryCode, string>> = {
    IN: "98765 43210",
    US: "202 555 0123",
    GB: "07911 123456",
    AU: "0412 345 678",
    AE: "050 123 4567",
    DE: "01512 3456789",
    FR: "06 12 34 56 78",
    JP: "090 1234 5678",
    CN: "131 2345 6789",
    BR: "11 91234 5678",
    CA: "613 555 0123",
    SG: "8123 4567",
    SA: "050 123 4567",
  };
  return examples[countryCode] ?? "Enter phone number";
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validatePhoneNumber(phone: string, countryCode: CountryCode): string {
  if (!phone.trim()) return "Phone number is required";
  try {
    const cleaned = phone.replace(/[^\d+\s\-()]/g, "").trim();
    if (!cleaned) return "Enter a valid phone number";
    const valid = isValidPhoneNumber(cleaned, countryCode);
    const validFull = cleaned.startsWith("+")
      ? isValidPhoneNumber(cleaned)
      : valid;
    if (!valid && !validFull) {
      return `Enter a valid ${COUNTRIES.find((c) => c.code === countryCode)?.name ?? ""} phone number`;
    }
  } catch {
    return "Enter a valid phone number";
  }
  return "";
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find((c) => c.code === "IN")!,
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const formspreeEndpoint = process.env
    .NEXT_PUBLIC_FORMSPREE_ENDPOINT as string;

  // ── Lenis scroll lock ─────────────────────────────────────────────────────
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      setErrors({});
      setSuccess(false);
    }
    return () => {
      lenis.start();
    };
  }, [open, lenis]);

  // ── Validation ────────────────────────────────────────────────────────────
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email address";
        return "";
      case "phone":
        return validatePhoneNumber(value, selectedCountry.code);
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof FormData] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handlePhoneChange = (value: string, country: Country) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({
      ...prev,
      phone: validatePhoneNumber(value, country.code),
    }));
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setErrors((prev) => ({
      ...prev,
      phone: formData.phone
        ? validatePhoneNumber(formData.phone, country.code)
        : "",
    }));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      let formattedPhone = formData.phone;
      try {
        const parsed = formData.phone.startsWith("+")
          ? parsePhoneNumber(formData.phone)
          : parsePhoneNumber(formData.phone, selectedCountry.code);
        formattedPhone = parsed.formatInternational();
      } catch {
        formattedPhone = `${selectedCountry.dialCode} ${formData.phone}`;
      }

      const payload = {
        ...formData,
        phone: formattedPhone,
        country: selectedCountry.name,
      };
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[560px] rounded-2xl p-0 flex flex-col max-h-[90vh]">
        {/* ── Fixed Header ── */}
        <div className="shrink-0 px-5 sm:px-6 pt-6 pb-3 border-b border-border">
          <DialogHeader className="text-center space-y-1">
            <DialogTitle className="text-xl sm:text-2xl font-semibold leading-tight">
              Ready to Transform Your Operations?
            </DialogTitle>
            <p className="text-muted-foreground text-sm sm:text-base">
              Let's discuss how{" "}
              <span className="font-medium text-foreground">DigiPlus</span> can
              accelerate your digital transformation journey.
            </p>
          </DialogHeader>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-5 sm:px-6 py-4">
          {success ? (
            <div className="text-center py-10">
              <p className="text-green-600 font-medium text-base">
                ✅ Message sent successfully!
              </p>
            </div>
          ) : (
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="space-y-3.5 pb-1"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label>Name *</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
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
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Company + Phone */}
              <div className="grid grid-cols-1 gap-3.5">
                <div className="space-y-1.5">
                  <Label>Company</Label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </div>
                <PhoneInput
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  selectedCountry={selectedCountry}
                  onCountryChange={handleCountryChange}
                  error={errors.phone}
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label>Message *</Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="min-h-[7.5rem] max-h-[12rem] resize-none overflow-y-auto"
                  onWheel={(e) => e.stopPropagation()}
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message}</p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* ── Fixed Footer ── */}
        <div className="shrink-0 px-5 sm:px-6 pt-3 pb-5 sm:pb-6 border-t border-border space-y-3">
          {!success && (
            <PrimaryButton
              type="submit"
              form="contact-form"
              disabled={loading}
              className="w-full justify-center"
            >
              {loading ? "Sending..." : "Schedule Free Consultation"}
            </PrimaryButton>
          )}
          <div className="text-center text-sm text-muted-foreground space-y-1.5">
            <p className="font-medium text-foreground">Or reach us directly:</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>salesmanager@digiplusit.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Mumbai | Bangalore | Pune</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
