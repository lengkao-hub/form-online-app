"use client";

import { cn } from "@/lib/utils";
import {
  type Content as SelectContentType,
  type SelectProps as SelectCoreProps,
} from "@radix-ui/react-select";
import React, { forwardRef } from "react";
import {
  FormControl,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  Select as SelectUI,
  SelectValue,
} from "../../ui";

type SelectProps = SelectCoreProps & {
    placeholder?: string;
    emptyMessage?: string;
    onChange?: (value: string | number) => void;
    options?: any[];
    className?: string
    disabled?: boolean
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    formRef?: React.RefObject<HTMLFormElement>; 
};

export const Select = forwardRef<
    React.ElementRef<typeof SelectContentType>,
    SelectProps
>(({ ...props }, ref) => {
  return (
    <SelectUI
    disabled={props.disabled || props.options?.length === 0}
      onValueChange={props.onChange}
      defaultValue={props.defaultValue}
      value={props.value ? props.value : props.defaultValue}
    >
      <FormControl className="h-10">
        <SelectTrigger 
          className={cn("focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2", props?.className)} 
          ref={ref as React.Ref<HTMLButtonElement>}
          onKeyDown={(e) => handleKeyDownNextField(e, props.formRef)}
        >
          <SelectValue placeholder={props?.defaultValue ?? "ເລືອກ"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent className={cn("", props?.className)} ref={ref}>
        <SelectGroup>
          {props.options?.map((option, key: number) => (
            <SelectItem key={key} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectUI>
  );
});

Select.displayName = "Select";


export const handleKeyDownNextField = (
  e: React.KeyboardEvent<HTMLElement>,
  formRef?: React.RefObject<HTMLFormElement>
) => {
  if (e.key !== "Enter") return;

  e.preventDefault();

  const formEl = formRef?.current;
  if (!formEl) return;

  const focusables = Array.from(
    formEl.querySelectorAll<HTMLElement>(
      "input, select, textarea, button, [role='combobox'], [data-radix-select-trigger], [tabindex]:not([tabindex='-1'])"
    )
  ).filter(el => !el.hasAttribute("disabled") && el.offsetParent !== null);

  const index = focusables.indexOf(e.currentTarget as HTMLElement);
  if (index > -1 && focusables[index + 1]) {
    focusables[index + 1].focus();
  }
};