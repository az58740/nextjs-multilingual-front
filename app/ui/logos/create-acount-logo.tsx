import { UserPlusIcon } from '@heroicons/react/24/outline';
import { vazir,amiri,tajawal } from '@/app/ui/fonts';
import * as m from "@/paraglide/messages.js";

export default function CreateAcountLogo() {
  return (
    <div
      className={`${vazir.className} flex flex-row items-center leading-none text-white`}
    >
      <UserPlusIcon className="h-8 w-8 rotate-[1deg]" />
      <p className="text-[22px]">{m.CreateAccount()}</p>
    </div>
  );
}