import {
  FilmIcon,
  UserGroupIcon,
  UsersIcon,
  LibraryIcon,
  ColorSwatchIcon,
  FlagIcon,
  ArrowSmRightIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';

// https://github.com/harshhhdev/kmenu#adding-commands
const dashboard = [
  {
    category: 'Page',
    commands: [
      {
        icon: <ViewGridIcon className='h-4 w-4' />,
        text: 'Dashboard',
        href: '/dashboard',
        keywords: 'Dashboard',
      },
      {
        icon: <FilmIcon className='h-4 w-4' />,
        text: 'Movie',
        href: '/dashboard/movie',
        keywords: 'movie',
      },
      {
        icon: <UserGroupIcon className='h-4 w-4' />,
        text: 'Actor',
        href: '/dashboard/actor',
        keywords: 'actor',
      },
      {
        icon: <UsersIcon className='h-4 w-4' />,
        text: 'Director',
        href: '/dashboard/director',
        keywords: 'director',
      },
      {
        icon: <LibraryIcon className='h-4 w-4' />,
        text: 'Studio',
        href: '/dashboard/studio',
        keywords: 'studio',
      },
      {
        icon: <ColorSwatchIcon className='h-4 w-4' />,
        text: 'Category',
        href: '/dashboard/category',
        keywords: 'category',
      },
      {
        icon: <FlagIcon className='h-4 w-4' />,
        text: 'Country',
        href: '/dashboard/country',
        keywords: 'country',
      },
    ],
  },
];

const movie = [
  {
    category: 'Movie API',
    commands: [
      {
        icon: <FilmIcon className='h-4 w-4' />,
        text: 'Movie Playground',
        href: '/movie',
        newTab: true,
        keywords: 'movie playground',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get All Movie',
        href: '/movie/list',
        newTab: true,
        keywords: 'get all movie',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get Detail Movie',
        href: '/movie/detail',
        newTab: true,
        keywords: 'get detail movie',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Create Movie',
        href: '/movie/create',
        newTab: true,
        keywords: 'create movie',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Edit Movie',
        href: '/movie/edit',
        newTab: true,
        keywords: 'edit movie',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Delete Movie',
        href: '/movie/delete',
        newTab: true,
        keywords: 'delete movie',
      },
    ],
  },
];

const actor = [
  {
    category: 'Actor API',
    commands: [
      {
        icon: <UserGroupIcon className='h-4 w-4' />,
        text: 'Actor Playground',
        href: '/actor',
        newTab: true,
        keywords: 'actor playground',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get All actor',
        href: '/actor/list',
        newTab: true,
        keywords: 'get all actor',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get Detail Actor',
        href: '/actor/detail',
        newTab: true,
        keywords: 'get detail actor',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Create Actor',
        href: '/actor/create',
        newTab: true,
        keywords: 'create actor',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Edit Actor',
        href: '/actor/edit',
        newTab: true,
        keywords: 'edit actor',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Delete Actor',
        href: '/actor/delete',
        newTab: true,
        keywords: 'delete actor',
      },
    ],
  },
];

const director = [
  {
    category: 'Director API',
    commands: [
      {
        icon: <UsersIcon className='h-4 w-4' />,
        text: 'Director Playground',
        href: '/director',
        newTab: true,
        keywords: 'director playground',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get All Director',
        href: '/director/list',
        newTab: true,
        keywords: 'get all director',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get Detail Director',
        href: '/director/detail',
        newTab: true,
        keywords: 'get detail director',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Create Director',
        href: '/director/create',
        newTab: true,
        keywords: 'create director',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Edit Director',
        href: '/director/edit',
        newTab: true,
        keywords: 'edit director',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Delete Director',
        href: '/director/delete',
        newTab: true,
        keywords: 'delete director',
      },
    ],
  },
];

const studio = [
  {
    category: 'Studio API',
    commands: [
      {
        icon: <LibraryIcon className='h-4 w-4' />,
        text: 'Studio Playground',
        href: '/studio',
        newTab: true,
        keywords: 'studio playground',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get All Studio',
        href: '/studio/list',
        newTab: true,
        keywords: 'get all studio',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get Detail Studio',
        href: '/studio/detail',
        newTab: true,
        keywords: 'get detail studio',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Create Studio',
        href: '/studio/create',
        newTab: true,
        keywords: 'create studio',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Edit Studio',
        href: '/studio/edit',
        newTab: true,
        keywords: 'edit studio',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Delete Studio',
        href: '/studio/delete',
        newTab: true,
        keywords: 'delete studio',
      },
    ],
  },
];

const category = [
  {
    category: 'Category API',
    commands: [
      {
        icon: <ColorSwatchIcon className='h-4 w-4' />,
        text: 'Category Playground',
        href: '/category',
        newTab: true,
        keywords: 'category playground',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get All Category',
        href: '/category/list',
        newTab: true,
        keywords: 'get all category',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get Detail Category',
        href: '/category/detail',
        newTab: true,
        keywords: 'get detail category',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Create Category',
        href: '/category/create',
        newTab: true,
        keywords: 'create category',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Edit Category',
        href: '/category/edit',
        newTab: true,
        keywords: 'edit category',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Delete Category',
        href: '/category/delete',
        newTab: true,
        keywords: 'delete category',
      },
    ],
  },
];

const country = [
  {
    category: 'Country API',
    commands: [
      {
        icon: <FlagIcon className='h-4 w-4' />,
        text: 'Country Playground',
        href: '/country',
        newTab: true,
        keywords: 'country playground',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get All Country',
        href: '/country/list',
        newTab: true,
        keywords: 'get all country',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Get Detail Country',
        href: '/country/detail',
        newTab: true,
        keywords: 'get detail country',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Create Country',
        href: '/country/create',
        newTab: true,
        keywords: 'create country',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Edit Country',
        href: '/country/edit',
        newTab: true,
        keywords: 'edit country',
      },
      {
        icon: <ArrowSmRightIcon className='h-4 w-4' />,
        text: 'Delete Country',
        href: '/country/delete',
        newTab: true,
        keywords: 'delete country',
      },
    ],
  },
];

export { dashboard, movie, actor, director, studio, category, country };
