import Image from "next/image";
import Link from "next/link";

const LOGO_URL =
  "https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/vendor-logos/motion-pouches/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-20">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <Image
                src={LOGO_URL}
                alt="MOTION"
                width={100}
                height={40}
                className="object-contain h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-white/60 font-light leading-relaxed max-w-xs">
              Nootropic pouches. Zero nicotine.
              Clean focus that actually works.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-white/80 mb-8">
              Shop
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-light"
                >
                  All Products
                </Link>
              </li>
              {[
                "Mint Pouches",
                "Mango Pouches",
                "Blue Raspberry",
                "Limitless Capsules",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-white/80 mb-8">
              Company
            </h4>
            <ul className="space-y-4">
              {["About", "Science", "Affiliates", "Wholesale"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-white/80 mb-8">
              Support
            </h4>
            <ul className="space-y-4">
              {[
                { label: "FAQ", href: "/#faq" },
                { label: "Contact", href: "mailto:support@motionpouches.com" },
                { label: "Shipping", href: "/shipping" },
                { label: "Returns", href: "/refund" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[12px] text-white/40 font-light">
            &copy; {new Date().getFullYear()} Motion Pouches. All rights
            reserved.
          </p>
          <div className="flex gap-8">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Shipping", href: "/shipping" },
              { label: "Refunds", href: "/refund" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12px] text-white/40 hover:text-white/70 transition-colors font-light"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
