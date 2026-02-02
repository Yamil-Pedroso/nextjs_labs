import Image from "next/image";

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={36}
      height={36}
      className="rounded-full border border-[rgb(var(--border))]"
    />
  );
}
