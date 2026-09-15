"use client";

import { useActionState, useEffect, useMemo, useRef } from "react";
import { useFormStatus } from "react-dom";

import { submitForm } from "@/app/actions";
import {
  formConfig,
  initialFormState,
  type FieldDef,
  type FormKind,
  type FormState,
} from "@/lib/forms";

const inputClass =
  "w-full rounded-[9px] border border-line-input bg-white px-[15px] py-[14px] text-[15px] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-faint focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(31,116,208,0.14)] focus:outline-none";

function Field({
  field,
  error,
  defaultValue,
}: {
  field: FieldDef;
  error?: string;
  defaultValue?: string;
}) {
  const id = `f-${field.name}`;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className={field.span === 2 ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="mb-[9px] block text-[13px]/[1] font-semibold text-[#334]"
      >
        {field.label}
        {field.optionalNote ? (
          <span className="font-normal text-ink-faint"> (optional)</span>
        ) : null}
      </label>

      {field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={inputClass}
        >
          {field.name === "state" ? <option value="">Select</option> : null}
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          autoComplete={
            field.type === "email"
              ? "email"
              : field.type === "tel"
                ? "tel"
                : field.name === "name"
                  ? "name"
                  : undefined
          }
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={inputClass}
        />
      )}

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[12.5px] text-[#b3271f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-[9px] bg-blue-600 py-[17px] text-[15px]/[1] font-bold text-white transition-colors duration-150 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending…" : label}
    </button>
  );
}

/**
 * The shared form panel. Renders whichever field set `kind` names, posts to the
 * one server action, and swaps to a success message in place on completion.
 */
export default function SiteForm({
  kind,
  heading,
  intro,
  footnote,
  sticky = false,
}: {
  kind: FormKind;
  heading?: string;
  intro?: string;
  footnote?: string;
  sticky?: boolean;
}) {
  const config = formConfig[kind];

  const action = useMemo(
    () => submitForm.bind(null, kind),
    [kind],
  );

  const [state, formAction] = useActionState<FormState, FormData>(
    action,
    initialFormState,
  );

  /* When the form was first shown, used by the server action's spam timing
     check. Written to the DOM after mount rather than during render, since the
     clock is not something a render may read. */
  const startedAtRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  return (
    <div
      className={[
        "rounded-[18px] border border-line bg-gray-50 p-8 sm:p-[42px]",
        sticky ? "lg:sticky lg:top-24" : "",
      ].join(" ")}
      data-reveal
    >
      {heading ? (
        <h2 className="font-display m-0 mb-1.5 text-[24px]/[1.2] font-bold text-navy-800">
          {heading}
        </h2>
      ) : null}
      {intro ? (
        <p className="m-0 mb-7 text-[14.5px]/[1.6] text-ink-soft">{intro}</p>
      ) : null}

      {state.status === "success" ? (
        <p
          role="status"
          className="rounded-[9px] bg-[#e7f4ec] p-4 text-center text-[14px]/[1.5] font-semibold text-[#1a7a3c]"
        >
          {state.message}
        </p>
      ) : (
        <form action={formAction} noValidate>
          <input type="hidden" name="startedAt" ref={startedAtRef} defaultValue="" />
          {/* Honeypot: hidden from people, irresistible to bots. */}
          <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="company-field">Company</label>
            <input id="company-field" type="text" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2">
            {config.fields.map((field) => (
              <Field
                key={field.name}
                field={field}
                error={state.errors?.[field.name]}
                defaultValue={state.values?.[field.name]}
              />
            ))}
          </div>

          {state.status === "error" && state.message ? (
            <p role="alert" className="mt-5 text-[13.5px] font-semibold text-[#b3271f]">
              {state.message}
            </p>
          ) : null}

          <div className="mt-[26px]">
            <SubmitButton label={config.submitLabel} />
          </div>

          {footnote ? (
            <p className="mt-4 text-center text-[12px]/[1.5] text-ink-faint">
              {footnote}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
