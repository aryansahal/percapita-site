/**
 * Inline SVG icon set lifted from the design.
 * Swap for the house icon library if one is adopted later.
 */

type IconProps = { size?: number; className?: string };

export function WhatsAppIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.86.5 3.6 1.38 5.1L2 22l5.2-1.53a9.8 9.8 0 0 0 4.84 1.27h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm0 17.9h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.91.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.32c0-4.5 3.68-8.17 8.2-8.17a8.15 8.15 0 0 1 8.18 8.18c0 4.51-3.67 8.05-8.18 8.05Zm4.49-6.1c-.25-.13-1.46-.72-1.68-.8-.23-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.39.1-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.05-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37.99 2.53c.12.17 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.47-.28Z" />
    </svg>
  );
}

export function CloseIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChatIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 5.5h16v11H9.5L5.5 20v-3.5H4v-11Z" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}

export function LockIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="10.5" width="16" height="11" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

export function MailIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6l9 6 9-6" />
    </svg>
  );
}

export function UserIcon({ size = 15, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-3.6 3.2-5.5 7.5-5.5s7.5 1.9 7.5 5.5" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 40, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8 12.3 2.6 2.6L16 9.5" />
    </svg>
  );
}

export function AppleIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.37 12.62c-.02-2.13 1.74-3.15 1.82-3.2-1-1.45-2.54-1.65-3.09-1.67-1.31-.13-2.56.77-3.23.77-.66 0-1.69-.75-2.78-.73-1.43.02-2.75.83-3.48 2.1-1.48 2.57-.38 6.37 1.06 8.45.71 1.02 1.55 2.16 2.65 2.12 1.07-.04 1.47-.69 2.76-.69 1.29 0 1.65.69 2.78.67 1.15-.02 1.87-1.03 2.57-2.05.81-1.18 1.15-2.32 1.16-2.38-.03-.01-2.22-.85-2.24-3.39ZM14.3 6.06c.58-.71.98-1.7.87-2.68-.84.03-1.86.56-2.46 1.27-.54.62-1.01 1.62-.89 2.58.94.07 1.9-.47 2.48-1.17Z" />
    </svg>
  );
}

export function PlayIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.6 2.4 13.9 12 3.6 21.6c-.3-.22-.5-.6-.5-1.1V3.5c0-.5.2-.88.5-1.1Z"
        fill="#C3A0E4"
      />
      <path
        d="m16.2 9.6 2.9 1.66c.8.46.8 1.62 0 2.08l-2.9 1.66L13.9 12l2.3-2.4Z"
        fill="#E8D8F5"
      />
      <path d="M4.6 2.05 16.2 9.6 13.9 12 4.1 2.2c.15-.1.33-.15.5-.15Z" fill="#B48BD9" />
      <path
        d="M4.6 21.95 16.2 14.4 13.9 12 4.1 21.8c.15.1.33.15.5.15Z"
        fill="#8B5CC7"
      />
    </svg>
  );
}

/** The bullet used across the dark and light feature lists. */
export function Diamond({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      ◆
    </span>
  );
}
