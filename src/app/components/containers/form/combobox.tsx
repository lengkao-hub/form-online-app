import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from 'lucide-react';
import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { type Command as CommandPrimitive } from "cmdk";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  FormControl,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  CommandList,
} from "@/components/ui";
import { handleKeyDownNextField } from "./select";

interface Option {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

type ComboboxProps = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive>,
  "onChange" | "onValueChange" | "value"
> & {
  options?: Option[];
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value: string | number) => void;
  value?: string | number | Option;
  defaultValue?: string | number;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  popoverWidth?: string;
  searchPlaceholder?: string;
  formRef?: React.RefObject<HTMLFormElement>;
};

export const Combobox = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComboboxProps
>(({
  options = [],
  placeholder = "Select an option",
  emptyMessage = "No options found",
  onChange,
  value,
  defaultValue,
  disabled = false,
  className,
  clearable = false,
  popoverWidth,
  searchPlaceholder = "Search...",
  formRef,
  ...props
}, ref) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  const [searchValue, setSearchValue] = useState("");
  const getSelectedValue = () => {
    if (value !== undefined) {
      if (value !== null && typeof value === 'object' && 'value' in value) {
        return value.value;
      }
      return value;
    }
    return internalValue;
  };
  useEffect(() => {
    if (defaultValue !== undefined && value === undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, value]);

  const selectedOption = options.find(
    (option) => option.value === getSelectedValue(),
  );

  const handleSelect = (optionValue: string | number) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value === undefined) {
      setInternalValue(undefined);
    }
    onChange?.('' as string);
  };

  // auto scroll to center
  const handleFocus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const focusNextField = () => {
    const formEl = formRef?.current;
    if (!formEl) return;

    const focusables = Array.from(
      formEl.querySelectorAll<HTMLElement>(
        "input, select, textarea, button, [role='combobox'], [data-radix-select-trigger], [tabindex]:not([tabindex='-1'])"
      )
    ).filter(el => !el.hasAttribute("disabled") && el.offsetParent !== null);

    const index = focusables.findIndex(el => el === document.activeElement);
    if (index > -1 && focusables[index + 1]) focusables[index + 1].focus();
  };


  // Custom Filtering and Sorting Logic
  const filteredAndSortedOptions = options
    .filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      (option.description && option.description.toLowerCase().includes(searchValue.toLowerCase()))
    )
    .sort((a, b) => {
      const searchLower = searchValue.toLowerCase();
      const aLabelLower = a.label.toLowerCase();
      const bLabelLower = b.label.toLowerCase();

      // Exact match gets highest priority
      if (aLabelLower === searchLower) return -1;
      if (bLabelLower === searchLower) return 1;

      // Starts with search term
      if (aLabelLower.startsWith(searchLower) && !bLabelLower.startsWith(searchLower)) return -1;
      if (!aLabelLower.startsWith(searchLower) && bLabelLower.startsWith(searchLower)) return 1;

      // Includes search term (general relevance)
      if (aLabelLower.includes(searchLower) && !bLabelLower.includes(searchLower)) return -1;
      if (!aLabelLower.includes(searchLower) && bLabelLower.includes(searchLower)) return 1;

      // Finally, sort alphabetically if no strong relevance
      return aLabelLower.localeCompare(bLabelLower);
    });
    
  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            ref={ref as React.Ref<HTMLButtonElement>}
            variant="outline"
            role="combobox"
            onKeyDown={(e) => {
              // Enter → focus next field
              if (e.key === "Enter") {
                e.preventDefault();
                focusNextField();
                return; // อย่าเปิด dropdown
              }

              // ถ้า key เป็น character → เปิด dropdown และ focus input
              if (e.key.length === 1) {
                if (!open) setOpen(true);
                setTimeout(() => {
                  const inputEl = document.querySelector<HTMLInputElement>(
                    `[data-radix-popover-content] input`
                  );
                  inputEl?.focus();
                }, 0);
              }
            }}
            onClick={handleFocus}
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between h-10 px-3 transition-all",
              "border-input bg-background hover:bg-accent hover:text-accent-foreground",
              "data-[state=open]:border-ring data-[state=open]:ring-1 data-[state=open]:ring-ring",
              selectedOption && "text-foreground",
              !selectedOption && "text-muted-foreground",
              className
            )}
          >
            <span className="flex items-center gap-2 truncate">
              {selectedOption?.icon}
              <span className="truncate">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </span>
            <div className="flex items-center gap-1">
              {clearable && selectedOption && (
                <X
                  className="h-4 w-4 opacity-70 hover:opacity-100 cursor-pointer"
                  onClick={handleClear}
                />
              )}
              <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0 ml-1" />
            </div>
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn("p-0 overflow-hidden", popoverWidth || "w-[var(--radix-popover-trigger-width)]")}
        style={{ width: popoverWidth }}
      >
        <Command ref={ref} {...props} className="w-full">
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-11 border-none focus:ring-0"
            value={searchValue}
            onValueChange={setSearchValue}
            autoFocus={open}
          />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm">{emptyMessage}</CommandEmpty>
            <CommandGroup >
              <ScrollArea className="overflow-y-auto max-h-60">
                {filteredAndSortedOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => { handleSelect(option.value); }}
                      className={cn(
                        "py-2.5 px-3 cursor-pointer flex items-center gap-2 aria-selected:bg-accent",
                        "transition-colors hover:bg-accent/50 data-[selected=true]:bg-accent"
                      )}
                      data-selected={option.value === getSelectedValue()}
                    >
                      {option.icon}
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        )}
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4 text-primary",
                          option.value === getSelectedValue()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

Combobox.displayName = "Combobox";