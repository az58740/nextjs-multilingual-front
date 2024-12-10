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
		en: "English",
		fa: "فارسی",
		ar: "العربیه",
	}
	return (
	<div className="relative inline-block text-left md:text-base">
         <select
            className={clsx(
	           'ml-3 bg-blue-500 text-white border-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300  py-2 rounded-lg  hover:bg-blue-300',
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

