// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold">TravelCo</h3>
          <p className="mt-3 text-sm text-foreground/80">
            TravelCo is a leading travel agency dedicated to curating the most
            memorable getaways worldwide. With personalized guidance and
            end-to-end support, embark on journeys tailored for relaxation,
            exploration, or deep cultural immersion.
          </p>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-base font-semibold">Locations</h4>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>Calicut</li>
            <li>Koyilandi</li>
            <li>Nadapuram</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-base font-semibold">Contact us</h4>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>
              <a
                href="mailto:info@travelco.example"
                className="hover:text-brand"
              >
                info@travelco.example
              </a>
            </li>
            <li>
              <a
                href="mailto:director@travelco.example"
                className="hover:text-brand"
              >
                director@travelco.example
              </a>
            </li>
            <li>
              <a href="tel:+917736468222" className="hover:text-brand">
                +91 77364 68222
              </a>
            </li>
            <li>
              <a href="tel:+917736469444" className="hover:text-brand">
                +91 77364 69444
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container flex h-14 items-center justify-between text-sm text-foreground/70">
          <span>
            All rights reserved TravelCo © 2023–{new Date().getFullYear()}
          </span>
          <span />
        </div>
      </div>
    </footer>
  );
}
