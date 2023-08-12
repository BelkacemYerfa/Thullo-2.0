import { forwardRef, useState } from "react";
import { Input, type InputProps } from "./ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icons } from "./Icons";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          ref={ref}
          className={cn("pr-10", className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <Icons.EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Icons.Eye className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
