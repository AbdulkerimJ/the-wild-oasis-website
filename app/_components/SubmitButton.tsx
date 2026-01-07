"use client";
import { useFormStatus } from "react-dom";
export const SubmitButton = ({ children , pendingLabel} : {children: React.ReactNode, pendingLabel?: string}) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-6 py-2 rounded text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? (pendingLabel || "Updating...") : children}{" "}
    </button>
  );
};