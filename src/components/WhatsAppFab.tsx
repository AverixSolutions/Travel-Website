// src/components/WhatsAppFab.tsx
export default function WhatsAppFab() {
  const phone = "91XXXXXXXXXX";
  const text = encodeURIComponent(
    "Hi! I'm interested in your travel packages."
  );
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-fab"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M19.11 17.54c-.29-.14-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.19.29-.74.92-.9 1.11-.16.19-.33.21-.62.07-.29-.14-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.57-1.96-.16-.29-.02-.44.12-.58.12-.12.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.48-.16 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.09 4.9 4.33.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33zM16.02 5.33c-5.88 0-10.66 4.78-10.66 10.66 0 1.88.5 3.73 1.45 5.36l-1.54 5.62 5.74-1.5c1.58.86 3.36 1.31 5.17 1.31h.01c5.88 0 10.66-4.78 10.66-10.66S21.9 5.33 16.02 5.33z" />
      </svg>
    </a>
  );
}
