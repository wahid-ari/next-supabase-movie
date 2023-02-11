import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";
import { PhotographIcon } from "@heroicons/react/outline";

export default function MovieGridItem({ href = "#", imageSrc, title, description, date, ...props }) {
  const [isLoading, setLoading] = useState(true)
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className="mx-auto w-40 sm:w-[12rem] group border dark:border-neutral-800 shadow focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded" {...props}>
      <div className="relative h-56 sm:h-64 w-full overflow-hidden">
        {imageSrc ?
          <Image
            alt={title}
            src={imageSrc}
            className={`rounded-t duration-500 ease-in-out transform brightness-90 transition will-change-auto group-hover:brightness-110
          ${isLoading ? 'blur-2xl' : 'blur-0'}`}
            fill
            sizes={sizes}
            onLoadingComplete={() => setLoading(false)}
          />
          :
          <div className="h-full w-full rounded-t bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
            <PhotographIcon className="w-16 h-16 text-neutral-500" />
          </div>
        }
      </div>
      <div className="p-3.5">
        <Text.semibold className="!text-[15px] mb-1 line-clamp-2 group-hover:text-emerald-500 transition-all duration-500">{title}</Text.semibold>
        <span className="text-[13px] text-neutral-600 dark:text-neutral-400">{date}</span>
      </div>
    </Link>
  )
}