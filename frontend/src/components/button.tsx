import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "rounded-lg px-5 font-medium flex items-center justify-center gap-2",

  variants: {
    variant: {
      primary: "bg-rose-500 text-zinc-50 hover:bg-rose-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },

    size: {
      default: "py-2",
      full: "w-full h-11",
      responsive: "max-md:w-full h-11",
    },

    disabled: {
      true: "bg-rose-500 text-zinc-100 cursor-not-allowed opacity-70",
      false: "",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
    disabled: false,
  },
})

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({
  children,
  variant,
  size,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={buttonVariants({ variant, size, disabled })}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
