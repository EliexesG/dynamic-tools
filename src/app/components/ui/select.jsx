import * as React from "react";
import { cn } from "cn";

/*
 * Select nativo estilizado como el Input de shadcn. Se usa el `<select>`
 * real (no Radix Select) porque aquí la lista es corta y el componente
 * nativo ya Hereda keyboard/a11y + funciona bien en móvil.
 */
function Select({ className, children, ...props }) {
  return (
    <select
      data-slot="select"
      className={cn(
        "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent bg-[url('data:image/svg+xml;charset=utf-8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%236f8f89%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22m6%209%206%206%206-6%22/></svg>')] bg-size-[1rem] bg-position-[right_0.5rem_center] bg-no-repeat px-3 py-1 pr-8 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export { Select };
