import { Vazirmatn } from 'next/font/google'
import { Inter, Lusitana } from 'next/font/google';

export const vazirmatn=Vazirmatn({subsets:['arabic']});
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
