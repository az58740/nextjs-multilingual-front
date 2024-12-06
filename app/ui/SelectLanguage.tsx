"use client"
import { availableLanguageTags, AvailableLanguageTag, languageTag } from "@/paraglide/runtime"
import { usePathname, useRouter } from "@/lib/i18n"
import { Route } from "next"
import CountryFlag from 'react-country-flag';
import Select from 'react-select';
import clsx from 'clsx';



export function SelectLanguage() {
	const pathname = usePathname() as Route
	const router = useRouter()
	
	const direction: Record<AvailableLanguageTag, "ltr" | "rtl"> = {
		en: "ltr",
		fa:"rtl",
		ar:"rtl"
	}
	
	const labels: Record<AvailableLanguageTag, string> = {
		en: "🇬🇧 English",
		fa: "IR فارسی",
		ar: "AR العربیه",
	}
	return (
	<div className="relative inline-block text-left">
         <select
            className={clsx(
	           'block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded shadow focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500',
	            {
	               'bg-left-bottom': direction[languageTag()]==="rtl",
                   'bg-right-bottom': direction[languageTag()]==="ltr",
                })}
				value={languageTag()}
				onChange={(e) => router.push(pathname, { locale: e.target.value as AvailableLanguageTag })}
			>
				{availableLanguageTags.map((lang) => (
					<option key={lang} value={lang}>
						{labels[lang]}
					</option>
				))}
		</select>
	

	</div>

	)
}




