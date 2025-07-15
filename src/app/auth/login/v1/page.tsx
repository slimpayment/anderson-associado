'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([.$?*|{}()[]\\\/+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const LoginPage = () => {
  const router = useRouter();

  const [isResetMode, setIsResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authEmail, setauthEmail] = useState("");
  const [authSenha, setauthSenha] = useState("");
  const [valueJWT, setvalueJWT] = useState<string | undefined>();

  // Exemplo token estático, substitua pela resposta da sua API
  const idAssociado = '02b22b35-8c91-4b3f-a317-6987766f14ae';

  const sendLogin = async () => {
    // Aqui você faria a chamada real para API de login,
    // enviando authEmail e authSenha, e recebendo o token.

    // Para demo, vamos usar o token estático:
    const token = idAssociado;

    // Salva o token no cookie por 7 dias
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;

    setvalueJWT(token);
    toast.success('Login efetuado com sucesso!');
    router.push("/dashboard");
  };

  useEffect(() => {
    const savedToken = getCookie("token");
    if (savedToken) {
      setvalueJWT(savedToken);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">
            {isResetMode ? 'Recuperar Senha' : 'Entrar'}
          </CardTitle>
          <CardDescription>
            {isResetMode
              ? 'Digite seu email para receber as instruções de recuperação'
              : 'Entre com suas credenciais para acessar sua conta'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="hidden">
            <AlertDescription>
              Esta é uma mensagem de exemplo
            </AlertDescription>
          </Alert>

          {!isResetMode && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={authEmail}
                    onChange={(e) => setauthEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={authSenha}
                    onChange={(e) => setauthSenha(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    Lembrar de mim
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm"
                  onClick={() => setIsResetMode(true)}
                >
                  Esqueceu a senha?
                </Button>
              </div>

              <Button className="w-full" onClick={sendLogin}>
                Entrar
              </Button>
            </div>
          )}

          {isResetMode && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resetEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsResetMode(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button className="flex-1">
                  Enviar
                </Button>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
