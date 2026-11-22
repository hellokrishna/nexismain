import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
      <Image
        src="/brand/nexis-logo.png"
        alt=""
        width={395}
        height={512}
        className="h-9 w-auto"
      />
      <span>
        Nexfit
        <span className="ml-1 font-sans text-[0.68rem] font-semibold tracking-[0.22em] text-lime">
          SOFTWARE
        </span>
      </span>
    </Link>
  );
}
