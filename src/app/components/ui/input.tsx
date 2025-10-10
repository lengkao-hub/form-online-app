import { cn } from "@/lib/utils";
import * as React from "react";
// import { useEnterNavigation } from "../hooks/use-enter-navigation";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  
  ({ className, type, icon, onKeyDown,...props }, ref) => {
    // const { handleKeyDown: handleEnterNavigation } = useEnterNavigation()
    
    // auto scroll to center
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //   handleEnterNavigation(event)
    //   onKeyDown?.(event)
    // }
    return (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref} // Ensure the ref is forwarded
          type={type}
          onFocus={handleFocus}
          // onKeyDown={handleKeyDown}
          className={cn(
            "flex h-10 w-full rounded-md border border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input"

export { Input };

