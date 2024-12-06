import { Inter, Lusitana,Vazirmatn,Amiri,Cairo,Tajawal } from 'next/font/google';
// Create a font instance
export const vazir = Vazirmatn({
  weight: ['400', '700'], // You can specify the weights you need
  style: ['normal'], // Specify the styles (normal, italic, etc.)
  subsets: ['latin', 'arabic'], // Make sure to include the subsets necessary for Persian
});
// Create a font instance
export const amiri = Amiri({
  weight: ['400', '700'], // You can specify the weights you need
  style: ['normal'], // Specify the styles (normal, italic, etc.)
  subsets: [ "arabic" , "latin" , "latin-ext"], // Make sure to include the subsets necessary for Persian
});
export const tajawal = Tajawal({
  weight: ['400', '700'], // You can specify the weights you need
  style: ['normal'], // Specify the styles (normal, italic, etc.)
  subsets: [ "arabic" , "latin" ], // Make sure to include the subsets necessary for Persian
});

export const cairo = Cairo({ subsets: ['arabic'] });

export const inter = Inter({ subsets: ['latin'] });
 
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});