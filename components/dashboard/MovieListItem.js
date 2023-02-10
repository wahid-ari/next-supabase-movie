import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";

export default function MovieListItem({ href = "#", imageSrc, title, description, date, ...props }) {
  const [isLoading, setLoading] = useState(true)
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className="group border dark:border-neutral-800 shadow flex gap-4 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded" {...props}>
      <div className="w-[88px]">
        <div className="relative h-32 w-[88px] overflow-hidden">
          <Image
            alt={title}
            src={imageSrc}
            className={`rounded-l duration-500 ease-in-out transform brightness-90 transition will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
            fill
            sizes={sizes}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </div>
      <div className="pt-3.5 pr-3">
        <Text.semibold className="!text-[15px] mb-1 line-clamp-2 group-hover:text-emerald-500 transition-all duration-500">{title}</Text.semibold>
        <span className="text-[13px] text-neutral-600 dark:text-neutral-400">{date}</span>
        <Text className="mt-2 font-normal line-clamp-2">{description}</Text>
      </div>
    </Link>
  )
}