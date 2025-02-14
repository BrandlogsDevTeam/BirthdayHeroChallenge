"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResetPasswordModal } from "./password-reset-modal";
import { Spinner } from "../ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm({
  signIn,
}: {
  signIn: (
    formData: FormData
  ) => Promise<{ error?: string; success?: boolean }>;
}) {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(formData);
      if (result.error) {
        setError(result.error);
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
      <div className="space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Your email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="email"
                name="email"
                id="email"
                className="pl-10"
                placeholder="name@company.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="pl-10 pr-10"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="text-sm font-medium text-green-600 hover:underline px-0"
              onClick={() => router.push("/reset-password")}
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 text-white hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2" size="sm" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
