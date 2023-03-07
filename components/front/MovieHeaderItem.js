import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

export default function MovieHeaderItem({ href = '#', imageSrc, name, description, date, language, ...props }) {
  // src="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg"
  // src="https://www.themoviedb.org/t/p/w1280_and_h720_bestv2/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg"
  let imageSrcReplace = imageSrc.replace('w533_and_h300', 'w1280_and_h720');
  return (
    <Link
      {...props}
      href={href}
      className={clsx(
        'group relative flex h-64 cursor-pointer rounded-md sm:h-80 md:h-[420px] lg:h-[500px]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
      )}
    >
      <Image alt='Image' src={imageSrcReplace} className='rounded-md object-cover object-right-top' fill />
      <div className='z-[1] flex h-full w-full items-center rounded-md bg-gradient-to-r from-black via-black/80 to-black/10'>
        <div className='max-w-2xl p-8'>
          <p className='mb-4 text-xl font-medium text-white transition-all duration-300 group-hover:text-sky-500 dark:text-white sm:text-2xl md:text-3xl'>
            {name}
          </p>
          <div className='mb-3 flex flex-wrap gap-x-2 text-sm text-neutral-400 sm:text-base'>
            <p>{date.split('-')[0]}</p>
            <span className='my-1 border-l border-l-neutral-500' />
            <p>{language}</p>
          </div>
          <p className='text-sm text-neutral-200 line-clamp-2 sm:text-base sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-none'>
            {description}
          </p>
        </div>
      </div>
    </Link>
    // <Link {...props} href="#" className="group cursor-pointer h-[500px] flex relative rounded-md">
    //   <Image
    //     alt="Image"
    //     src="https://www.themoviedb.org/t/p/w1280_and_h720_bestv2/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg"
    //     className="object-cover rounded-md"
    //     fill
    //   />
    //   <div className="z-[1] bg-gradient-to-r from-black via-black/80 to-black/10 h-full w-full flex items-center rounded-md">
    //     <div className="p-8 max-w-2xl">
    //       <p href="#" className="dark:text-white text-3xl mb-4 font-medium text-white group-hover:text-sky-500 transition-all duration-300">
    //         Fugiat deserunt duis nisi proident incididunt velit exercitation quis
    //       </p>
    //       <div className="flex flex-wrap gap-x-2 text-neutral-300 text-sm sm:text-base">
    //         <p>2018</p>
    //         <span className="border-l border-l-neutral-300 my-1" />
    //         <span>Action,</span>
    //         <span>Action,</span>
    //         <span>Action,</span>
    //         <span>Action,</span>
    //         <span>Action,</span>
    //         <span>Action,</span>
    //       </div>
    //       <p className="my-3 text-white text-sm sm:text-base">Ex culpa ipsum magna eiusmod id commodo excepteur cillum. Ut sunt pariatur sint sint cupidatat eu. Elit esse in esse dolore anim quis ipsum eiusmod cupidatat eu veniam ad aliquip. Velit consequat ipsum minim nostrud laboris est cupidatat pariatur.</p>
    //       <div className="flex flex-wrap gap-x-2 text-sm sm:text-base text-white">
    //         <span className="text-neutral-300">Starring: </span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //         <span>Tom Cruise,</span>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
}
