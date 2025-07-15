"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export function LoginForm(){
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

    const loginSchema = z.object({
        email: z.string().email({ message: "Email inválido" }),
        password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    })

    type LoginFormValues = z.infer<typeof loginSchema>

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })


    async function onSubmitx(formData: LoginFormValues) {

        try {
            setIsLoading(true)

            // Simulação: envie os dados para sua API
            const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            })

            if (!response.ok) {
            throw new Error("Credenciais inválidas")
            }

            const data = await response.json()

            // Redireciona para o dashboard ou outra rota
            router.push("/dashboard")
        } catch (error) {
            console.error(error)
            alert("Erro ao fazer login: " + (error as Error).message)
        } finally {
            setIsLoading(false)
        }

    }

    async function onSubmit(formData: LoginFormValues) {
              setIsLoading(true)

        router.push("/dashboard")
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="seu@email.com" type="email" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>
                        Senha
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline" >
                      Lembrar Senha?
                    </a>

                    </FormLabel>

                    <FormControl>
                        <div className="relative">
                        <Input
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            disabled={isLoading}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                        </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

            <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>

            </div>


            </form>
        </Form>

    )









  
}















