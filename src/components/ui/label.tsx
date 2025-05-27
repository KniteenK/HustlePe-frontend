import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils"; // Assuming 'cn' is a utility for conditional class merging

// Define label variants for size and color
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", 
  {
    variants: {
      size: {
        default: "text-sm", // Default label size
        lg: "text-lg",      // Large label size
        xl: "text-xl",      // Extra-large label size
      },
      color: {
        default: "text-gray-900",  // Default color
        primary: "text-blue-600",  // Primary color
        danger: "text-red-600",    // Danger or error label color
        success: "text-green-600", // Success label color
      },
    },
    defaultVariants: {
      size: "default",   // Default size
      color: "default",  // Default color
    },
  }
);

// Ensure size and color are optional and properly typed
type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    className?: string;
  };

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, size, color, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, color }), className)} // Apply variants and merge custom classes
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
