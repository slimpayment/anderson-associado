'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { toast } from 'sonner';
import axios from 'axios';

interface Props {
  token: string;
}







export default function ResetForm( { token  }: Props ){
  const router = useRouter();
  const [ loadingsend, setloadingsend] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [authSenha, setauthSenha] = useState("");
  const [authConfirmSenha, setauthConfirmSenha] = useState("");

  const [password, setpassword] = useState(false);


  const verifyToken = async () => {
      try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.post(`${API_URL}/auth/reset/${token}/verify`,{
              domainOrigin : window.location.origin,
              token : token,
          });
          let dataReset = response.data;
          let resetEvent = dataReset.event;
            console.log('********************** response')
            console.log(dataReset)
            console.log('********************** response')
            if(resetEvent === 'RESET_EXPIRE'){
                toast.error(dataReset.message);
                
                router.push('/');
            }    


    
      } catch (error) {
          
      }
  };

  const confirmUpdate = async () => {

      try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.post(`${API_URL}/auth/reset/${token}/update`,{
              domainOrigin : window.location.origin,
              token : token,
              authSenha : authSenha,
              authConfirmSenha : authConfirmSenha
          });
          let dataReset = response.data;
          let resetEvent = dataReset.event;
            console.log('********************** response')
            console.log(dataReset)
            console.log('********************** response')
            if(resetEvent === 'RESET_PASSWORD_FAILED'){
                toast.error(dataReset.message);
            }            
            if(resetEvent === 'RESET_EXPIRE'){
                toast.error(dataReset.message);
                router.push('/');
            }    
            if(resetEvent === 'RESET_PASSWORD_SUCCESS'){
                toast.success(dataReset.message);
                router.push('/');
            }    



    
      } catch (error) {
          
      }


  };









  const sendUpdatePassword = async () => {
    setloadingsend(true); // Ativa o loading

  };


  useEffect(() => {
      verifyToken();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">
           Alteração de Senha

          </CardTitle>
          <CardDescription>
           Digite sua nova Senha
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          

            <div className="space-y-4">

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

              <div className="space-y-2">
                <Label htmlFor="password">Confimar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={authConfirmSenha}
                    onChange={(e) => setauthConfirmSenha(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>



              <Button
              className="w-full"
              onClick={confirmUpdate}
              disabled={loadingsend}
>
                  {loadingsend ? "Alterando Senha ... " : "Resetar Senha"}
              </Button>
            </div>

          
        </CardContent>
      </Card>
    </div>
  );
};

