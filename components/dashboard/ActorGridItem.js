import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";

export default function MovieListItem({ href = "#", imageSrc, name, ...props }) {
  const [isLoading, setLoading] = useState(true)
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className="mx-auto w-32 group border dark:border-neutral-800 shadow focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded" {...props}>
      <div className="relative h-[180px] overflow-hidden">
        <Image
          alt={name}
          src={imageSrc}
          className={`rounded-t duration-500 ease-in-out transform brightness-90 transition will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
          fill
          sizes={sizes}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="p-3 pb-2">
        <Text.medium className="!text-[15px] mb-1 line-clamp-2 group-hover:text-emerald-500 transition-all duration-500">{name}</Text.medium>
      </div>
    </Link>
  )
}