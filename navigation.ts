import {createSharedPathnamesNavigation} from 'next-intl/navigation';
export const locales = ['en', 'ur', 'hi', 'ar', 'es', 'fr'] as const;
export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});
