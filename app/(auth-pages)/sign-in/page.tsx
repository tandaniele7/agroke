import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center py-16 px-4 mx-auto sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Accedi</h1>
          <p className="text-sm text-gray-600">
            Non hai un account?{" "}
            <Link className="text-green-600 font-medium hover:underline" href="/sign-up">
              Registrati
            </Link>
          </p>
        </div>
        
        <form className="flex-1 flex flex-col">
          <div className="flex flex-col gap-4 [&>input]:mb-3">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input 
                name="email" 
                placeholder="tu@esempio.com" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Link
                  className="text-xs text-green-600 hover:underline"
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
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <SubmitButton 
              pendingText="Accesso in corso..." 
              formAction={signInAction}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 mt-4"
            >
              Accedi
            </SubmitButton>
            
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}