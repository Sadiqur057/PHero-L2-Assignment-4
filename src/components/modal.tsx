"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
  primaryCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  contentClassName,
  overlayClassName,
  primaryCloseButton = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs",
        overlayClassName
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-xl",
          contentClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {primaryCloseButton ? (
          <button
            onClick={onClose}
            className="bg-primary/10 p-1.5 rounded-md text-primary absolute top-4 right-4 cursor-pointer"
          >
            <X className="h-5 w-5 ml-[1px]" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground absolute top-4 right-4 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
export function ModalHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-4 text-lg font-semibold bg-background border-b border-border",
        className
      )}
    >
      {title}
    </div>
  );
}

export function ModalFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex justify-end gap-2 p-4", className)}>
      {children}
    </div>
  );
}

export function ModalBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("p-4 max-h-[calc(100vh-150px)] overflow-auto", className)}
    >
      {children}
    </div>
  );
}
