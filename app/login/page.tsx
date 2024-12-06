import AcountLogo from '@/app/ui/logos/acount-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'Login',
};
 
export default async function LoginPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-2">
      <div className="flex h-20 w-full items-center rounded-lg bg-blue-500 p-3 md:h-18">
      <div className="w-full  text-white md:w-full">
            <AcountLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}