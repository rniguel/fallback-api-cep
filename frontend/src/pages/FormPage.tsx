import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { fetchAddress } from "@/services/cepService"

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  sobrenome: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  cep: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado é obrigatório").max(2, "Use a sigla (ex: SP)"),
})

type FormValues = z.infer<typeof formSchema>

export function FormPage() {
  const [isLoadingCep, setIsLoadingCep] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  })

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "")
    if (cep.length !== 8) return

    setIsLoadingCep(true)
    try {
      const address = await fetchAddress(cep)
      if (address) {
        setValue("logradouro", address.logradouro)
        setValue("bairro", address.bairro)
        setValue("cidade", address.cidade)
        setValue("estado", address.estado)
        // Trigger validation for the newly filled fields
        trigger(["logradouro", "bairro", "cidade", "estado"])
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    } finally {
      setIsLoadingCep(false)
    }
  }

  const onSubmit = (data: FormValues) => {
    console.log("Formulário enviado:", data)
    alert("Formulário enviado com sucesso! Confira o console.")
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl shadow-lg border-primary/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Cadastro de Endereço</CardTitle>
          <CardDescription className="text-center">
            Preencha seus dados pessoais e seu CEP para completar o cadastro.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome"
                  {...register("nome")}
                  className={errors.nome ? "border-destructive" : ""}
                />
                {errors.nome && (
                  <p className="text-xs text-destructive">{errors.nome.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input
                  id="sobrenome"
                  placeholder="Seu sobrenome"
                  {...register("sobrenome")}
                  className={errors.sobrenome ? "border-destructive" : ""}
                />
                {errors.sobrenome && (
                  <p className="text-xs text-destructive">{errors.sobrenome.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="space-y-2 max-w-[200px]">
                <Label htmlFor="cep">CEP</Label>
                <div className="relative">
                  <Input
                    id="cep"
                    placeholder="00000-000"
                    {...register("cep")}
                    onBlur={handleCepBlur}
                    className={errors.cep ? "border-destructive" : ""}
                  />
                  {isLoadingCep && (
                    <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                {errors.cep && (
                  <p className="text-xs text-destructive">{errors.cep.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logradouro">Logradouro</Label>
                  <Input
                    id="logradouro"
                    placeholder="Rua, Avenida..."
                    disabled={isLoadingCep}
                    {...register("logradouro")}
                    className={errors.logradouro ? "border-destructive" : ""}
                  />
                  {errors.logradouro && (
                    <p className="text-xs text-destructive">{errors.logradouro.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    placeholder="Seu bairro"
                    disabled={isLoadingCep}
                    {...register("bairro")}
                    className={errors.bairro ? "border-destructive" : ""}
                  />
                  {errors.bairro && (
                    <p className="text-xs text-destructive">{errors.bairro.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    placeholder="Sua cidade"
                    disabled={isLoadingCep}
                    {...register("cidade")}
                    className={errors.cidade ? "border-destructive" : ""}
                  />
                  {errors.cidade && (
                    <p className="text-xs text-destructive">{errors.cidade.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado (UF)</Label>
                  <Input
                    id="estado"
                    placeholder="SP"
                    disabled={isLoadingCep}
                    {...register("estado")}
                    className={errors.estado ? "border-destructive" : ""}
                  />
                  {errors.estado && (
                    <p className="text-xs text-destructive">{errors.estado.message}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting || isLoadingCep}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Cadastro
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
