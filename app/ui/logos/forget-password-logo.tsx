import { UserCircleIcon } from '@heroicons/react/24/outline';
import { lusitana,vazir } from '@/app/ui/fonts';
import * as m from "@/paraglide/messages.js";

export default function ForgetLogo() {
  return (
    <div
      className={`${vazir.className} flex flex-row items-center leading-none text-white`}
    >
      <UserCircleIcon className="h-8 w-8 rotate-[1deg]" />
      <p className="text-[22px]">{m.ForgotPSW()}</p>
    </div>
  );
}
