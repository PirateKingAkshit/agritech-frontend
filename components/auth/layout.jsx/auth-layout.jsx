import { LucideVegan } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[2.5fr_1.5fr]">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/agritech.webp"
          alt="AgriTech"
          fill
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex justify-center mb-8 md:mb-10">
              {/* <div className="relative size-20 sm:size-24 rounded-full overflow-hidden shadow-xl">
                <Image
                  src="/logo-agritech.png"
                  alt="AGGROW Logo"
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-contain p-0.5 drop-shadow-md"
                  priority
                  quality={95}
                />
              </div> */}
              <img
                src="/logo-agritech.png"
                alt="AGGROW Logo"
                className="h-20 sm:h-24 w-auto drop-shadow-md"
                priority
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
