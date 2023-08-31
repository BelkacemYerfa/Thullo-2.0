import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const shellVariants = cva("h-screen w-full space-y-6 flex flex-col", {
  variants: {
    variant: {},
  },
});

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

export const Shell = ({ className, variant, ...props }: ShellProps) => {
  return (
    <main
      {...props}
      className={cn(shellVariants({ variant }), className)}
    ></main>
  );
};
