import { LanguageProvider } from "@inlang/paraglide-next"
import { AvailableLanguageTag, languageTag } from "@/paraglide/runtime.js"
import { vazirmatn } from "./ui/font"
import "./ui/global.css"
import Header from "./ui/header/header"
const direction: Record<AvailableLanguageTag, "ltr" | "rtl"> = {
	en: "ltr",
	fa:"rtl",
  ar:"rtl"
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
   <html lang={languageTag()} dir={direction[languageTag()]}>
      <body>
        {children }
        </body>
    </html>
    </LanguageProvider>
  );
}
