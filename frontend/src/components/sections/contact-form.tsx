"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  phone: string;
  age: string;
  message: string;
};

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

const initialState: FormState = {
  name: "",
  phone: "",
  age: "",
  message: ""
};

function validateForm(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  const age = Number(values.age);

  if (values.name.trim().length < 2) {
    errors.name = "Escribe el nombre completo.";
  }

  if (!/^[0-9+\s()-]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Escribe un telefono valido.";
  }

  if (!Number.isInteger(age) || age < 4 || age > 25) {
    errors.age = "La edad debe estar entre 4 y 25.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Cuéntanos un poco mas sobre el jugador.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  function updateField(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToast({ type: "error", message: "Revisa los campos marcados." });
      return;
    }

    setIsLoading(true);
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          age: Number(values.age),
          message: values.message.trim()
        })
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar la solicitud.");
      }

      setValues(initialState);
      setToast({ type: "success", message: "Solicitud enviada. Te contactaremos pronto." });
    } catch {
      setToast({ type: "error", message: "No se pudo enviar. Intenta por WhatsApp." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative">
      {toast ? (
        <div
          className={`mb-5 flex items-center gap-3 rounded-sm border p-4 text-sm ${
            toast.type === "success"
              ? "border-brand-cyan/60 bg-brand-cyan/10 text-brand-white"
              : "border-red-500/50 bg-red-500/10 text-red-100"
          }`}
          role="status"
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="text-brand-cyan" size={20} />
          ) : (
            <XCircle className="text-red-300" size={20} />
          )}
          {toast.message}
        </div>
      ) : null}

      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            error={errors.name}
            label="Nombre"
            name="name"
            onChange={(value) => updateField("name", value)}
            placeholder="Nombre del jugador"
            value={values.name}
          />
          <Field
            error={errors.phone}
            inputMode="tel"
            label="Telefono"
            name="phone"
            onChange={(value) => updateField("phone", value)}
            placeholder="3022243805"
            value={values.phone}
          />
        </div>

        <Field
          error={errors.age}
          inputMode="numeric"
          label="Edad"
          name="age"
          onChange={(value) => updateField("age", value)}
          placeholder="Edad del jugador"
          value={values.age}
        />

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-brand-cyan">Mensaje</span>
          <textarea
            className="min-h-36 resize-y rounded-sm border border-brand-line bg-black/35 px-4 py-3 text-sm text-brand-white outline-none transition placeholder:text-brand-steel/65 focus:border-brand-cyan focus:shadow-glow"
            name="message"
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Cuéntanos que objetivo tiene el jugador o que tipo de entrenamiento busca."
            value={values.message}
          />
          {errors.message ? <span className="text-xs text-red-300">{errors.message}</span> : null}
        </label>

        <Button className="mt-2 h-14" disabled={isLoading} icon={isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} type="submit">
          {isLoading ? "Enviando..." : "Enviar solicitud"}
        </Button>
      </form>
    </div>
  );
}

type FieldProps = {
  error?: string;
  inputMode?: "numeric" | "tel";
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

function Field({ error, inputMode, label, name, onChange, placeholder, value }: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.22em] text-brand-cyan">{label}</span>
      <input
        className="h-12 rounded-sm border border-brand-line bg-black/35 px-4 text-sm text-brand-white outline-none transition placeholder:text-brand-steel/65 focus:border-brand-cyan focus:shadow-glow"
        inputMode={inputMode}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
