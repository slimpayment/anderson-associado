import Image from "next/image";
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/_auth/login-form";
import Link from "next/link"
import { GalleryVerticalEnd } from "lucide-react";

let name_bussiness = process.env.NEXT_PUBLIC_COMPANY_NAME






export default function Home() {

  return (
<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-bgasaas p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="#" className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
          {name_bussiness}
          </a>
        <div className="border border-gray-300 rounded p-4 ">

          <LoginForm />
          <div className="text-center text-sm">
                    <p>
                      Não tem uma conta?{" "}
                      <Link href="/signup" className="font-medium text-primary hover:underline">
                        Cadastre-se
                      </Link>
                    </p>
          </div>

        </div>
      </div>
    </div>
  )
}