import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "@components/systems/Text";
import { PhotographIcon } from "@heroicons/react/outline";

export default function DirectorGridItem({ href = "#", imageSrc, name, ...props }) {
  const [isLoading, setLoading] = useState(true)
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className="mx-auto w-32 max-w-[8rem] group text-center focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded" {...props}>
      <div className="relative h-32 w-32 max-w-[8rem] mb-3 overflow-hidden mx-auto">
        {imageSrc ?
          <Image
            alt={name}
            src={imageSrc}
            className={`object-cover duration-500 ease-in-out transform rounded-full brightness-90 transition will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
            fill
            sizes={sizes}
            onLoadingComplete={() => setLoading(false)}
          />
          :
          <div className="h-full w-full rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
            <PhotographIcon className="w-16 h-16 text-neutral-500" />
          </div>
        }
      </div>
      <Text.medium className="group-hover:text-emerald-500 transition-all duration-500">{name}</Text.medium>
    </Link>
  )
}