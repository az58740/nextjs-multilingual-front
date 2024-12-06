import { UserIcon } from '@heroicons/react/24/outline';
import { lusitana,vazir } from '@/app/ui/fonts';
import * as m from "@/paraglide/messages.js";

export default function AcountLogo() {
  return (
    <div
      className={`${vazir.className} flex flex-row items-center leading-none text-white`}
    >
      <UserIcon className="h-8 w-8 rotate-[1deg]" />
      <p className="text-[22px]">{m.AccountLogoTitle()}</p>
    </div>
  );
}
