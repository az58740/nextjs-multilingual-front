"use client"
import {UserGroupIcon,UserIcon } from '@heroicons/react/24/outline';
import { lusitana,vazir } from '@/app/ui/fonts';
import * as m from "@/paraglide/messages.js"
import { Link } from '@/lib/i18n';
import { useState } from 'react';
import { SelectLanguage } from '../SelectLanguage';
import { languageTag } from '@/paraglide/runtime';

export default function AcmeLogo() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div
      className={`${vazir.className} bg-blue-400  text-white p-4 flex justify-between items-center rounded-lg  md:h-32 w-full `}
    >
       <div className="flex items-center space-x-2">
       <UserGroupIcon className="h-10 w-10  hidden md:block" />
       <UserGroupIcon className="h-5 w-5 block md:hidden" />
       <p className="text-[18px] ml-2 gap-1 text-white:bold md:text-[25px]">{m.logoTitle()}</p>
       </div> 
  <div className="hidden sm:flex items-center space-x-6">
  <SelectLanguage />
  {isLoggedIn ? (
          <>
            <span>Welcome, User!</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link 
             href="/login"  
             className="flex items-start gap-0   self-start rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-300 ">
            <UserIcon   className="w-4 md:w-6 ml-1 mr-1" /> 
            <span className='ml-1 mr-1 '>{m.login()}</span>  
            </Link>
          </>
        )}
  </div>

  <div className="sm:hidden">
  <button className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
  </div>
  </div>
  );
}
