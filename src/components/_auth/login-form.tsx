'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Mail, Lock, ArrowLeft,AlertCircle  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { authLogin } from '@/lib/api/_auth';
import { useToken } from '@/hooks/useToken'; // Ajuste o caminho conforme sua estrutura

 import Router from 'next/router';
import axios from 'axios';

type datalogin = {
  email : string;
  password : string;
};

type dataReset = {
  email : string;
};






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

export function LoginForm(){
  const router = useRouter();
  const { token, loading: tokenLoading, isAuthenticated } = useToken();

  const [isResetMode, setIsResetMode] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [authEmail, setauthEmail] = useState("");
  const [authSenha, setauthSenha] = useState("");

  const [valueJWT, setvalueJWT] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [ loadingsend, setloadingsend] = useState(false);



  // Exemplo token estático, substitua pela resposta da sua API
  
  const sendLogin = async () => {
    const idAssociado = '02b22b35-8c91-4b3f-a317-6987766f14ae';
    const token = idAssociado;



    const datalogin: datalogin = {
      email: authEmail,
      password: authSenha,

    };


    const responseAuth = await authLogin(datalogin);
    setIsLoading(true);
    if (responseAuth.message === 'Network Error') {
      toast.error('Falha ao efetuar Login, Tente mais tarde!');

    }


    if (responseAuth.event === 'AUTH_LOGIN_FAILED') {
      //setErrorMessage(responseAuth.message);
      toast.error(responseAuth.message);

      console.log('Setou mensagem de erro');
    }

    if( responseAuth.event === 'AUTH_LOGIN_SUCCESS'){
      let dataToken =  responseAuth.token

      // Salva o token no cookie por 7 dias
      document.cookie = `token=${dataToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
  
      setvalueJWT(dataToken);
      toast.success('Login efetuado com sucesso!');
      router.push("/dashboard");


    }

  };
  const sendReset = async () => {
    const dataReset: dataReset = {
      email: authEmail,
    };

  console.log('Resetando senha ')
  setloadingsend(true); // Ativa o loading

try {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.post(`${API_URL}/auth/reset`,{
    domainOrigin : window.location.origin,
    dataemail : dataReset.email,
  });
  
  let dataViewAssociado = response.data;
  let eventResponse = dataViewAssociado.event;
  let messageResponse = dataViewAssociado.message;
  
  if( eventResponse === 'RESET_EMAIL_FAILED'){
    console.log('response')
    console.log(dataViewAssociado)
    console.log('response')

    toast.warning(messageResponse)
    setloadingsend(false); // Ativa o loading
  }
  
  if( eventResponse === 'RESET_EMAIL_SUCCESS'){
    console.log('response')
    console.log(dataViewAssociado)
    console.log('response')
  
    toast.success(messageResponse)
    setloadingsend(false); // Ativa o loading
  }
  
} catch (error) {
    setloadingsend(false); // Ativa o loading
    toast.warning('Tente novamente mais tarde!');

  console.log('************** error')
  console.log( error)
  console.log('************** error')
  
}





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
            {isResetMode ? 'Recuperar Senha' : 'Painel de Login'}
          </CardTitle>
          <CardDescription>
            {isResetMode
              ? 'Digite seu email para receber as instruções de recuperação'
              : 'Entre com suas credenciais para acessar sua conta'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

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
                    required
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={authEmail}
                    onChange={(e) => setauthEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>


                <Button
                  className="flex-1"
                  onClick={sendReset}
                  disabled={loadingsend}
                >
                
                  {loadingsend ? "Enviando ... " : "Resetar Senha"}

                </Button>





              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};


