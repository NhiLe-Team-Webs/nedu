import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  variants: {
    default: "bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-full border border-black/20",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-full border border-black/20",
    outline: "border border-black/30 bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-full",
    secondary: "bg-white text-black border border-black/20 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-full shadow-sm hover:shadow-md",
    ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-full",
    link: "text-primary underline-offset-4 hover:underline transition-all duration-200",
    hero: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105 active:scale-95 rounded-full border border-black/20",
    apple: "bg-white text-black border border-black/20 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 relative overflow-hidden rounded-full",
    "apple-primary": "bg-black text-white border border-black/30 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-full",
  },
  sizes: {
    default: "h-10 px-6 py-2",
    sm: "h-9 px-4 py-2",
    lg: "h-12 px-8 py-3",
    icon: "h-10 w-10",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variants;
  size?: keyof typeof buttonVariants.sizes;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      if (onClick) onClick(event);
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden backdrop-blur-sm",
          buttonVariants.variants[variant as keyof typeof buttonVariants.variants],
          buttonVariants.sizes[size as keyof typeof buttonVariants.sizes],
          className
        )}
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onClick={handleClick}
        {...props}
      >
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-black/10 animate-ripple"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
