import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Nexfit home" className="inline-flex items-center">
      <Image
        src="/brand/nexis-logo.png"
        alt="Nexis"
        width={717}
        height={345}
        className="h-8 w-auto sm:h-9"
        priority
        unoptimized
      />
    </Link>
  );
}
