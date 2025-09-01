// Directives
"use client";

// Packages imports
import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Local imports
import { AuthFormStatusTypes, AuthFormTypes } from "@/lib/types";
import { FormContext } from "./AuthForm.context";
import { toastsCustomID } from "@/lib/configs/react-toastify";

// Local types

// Functional component
export default function AuthFormResultUnit() {
  const router = useRouter();
  const { state, activeForm, resetPasswordForm } = use(FormContext);

  useEffect(() => {
    if (state.redirectNeed && state.toastNeed) {
      toast(state.toastMessage, {
        type: state.status === AuthFormStatusTypes.Error ? "error" : "success",
        autoClose: state.toastMessage.length >= 100 ? 25000 : 10000,
        toastId: toastsCustomID,
        onClose: () => state.redirectPath.startsWith("/") && router.push(state.redirectPath),
      });

      if (
        activeForm === AuthFormTypes.ResetPassword &&
        state.status === AuthFormStatusTypes.Success &&
        state.redirectPath === "2"
      ) {
        resetPasswordForm.setFormStep(state.redirectPath);
      }

      return;
    }

    if (state.redirectNeed) {
      return router.push(state.redirectPath);
    }

    if (state.toastNeed) {
      toast(state.toastMessage, {
        type: state.status === AuthFormStatusTypes.Error ? "error" : "success",
        toastId: toastsCustomID,
        autoClose: state.toastMessage.length >= 100 ? 25000 : 10000,
      });
    }
  }, [state]);

  return null;
}
