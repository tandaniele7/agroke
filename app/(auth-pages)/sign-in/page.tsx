import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-agroke-green/20 to-white -z-10"></div>
      
      {/* Login Container */}
      <div className="w-full max-w-md px-4 sm:px-0">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/agroke_logo_with_text.png"
            alt="AgroKe Logo"
            width={160}
            height={48}
            className="mx-auto"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-agroke-green/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-agroke-green/10 rounded-full"></div>
          
          <div className="relative">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-agroke-black-light mb-2">Accedi</h1>
              <p className="text-sm text-gray-600">
                Non hai un account?{" "}
                <Link className="text-agroke-green font-medium hover:text-agroke-green-dark transition-colors" href="/sign-up">
                  Registrati
                </Link>
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-agroke-black-light font-medium">Email</Label>
                <Input 
                  name="email" 
                  placeholder="tu@esempio.com" 
                  required 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-agroke-green/50 focus:border-agroke-green transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-agroke-black-light font-medium">Password</Label>
                  <Link
                    className="text-xs text-agroke-green hover:text-agroke-green-dark transition-colors"
                    href="/forgot-password"
                  >
                    Password dimenticata?
                  </Link>
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="La tua password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-agroke-green/50 focus:border-agroke-green transition-all"
                />
              </div>
              
              <SubmitButton 
                pendingText="Accesso in corso..." 
                formAction={signInAction}
                className="w-full bg-agroke-green hover:bg-agroke-green-dark text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                Accedi
              </SubmitButton>
              
              <FormMessage message={searchParams} />
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-gray-600">
          Protetto da standard di sicurezza avanzati
        </p>
      </div>
    </div>
  );
}