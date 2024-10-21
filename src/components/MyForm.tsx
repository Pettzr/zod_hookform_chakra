import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

const schema = z.object({
    name: z.string().min(2, {message: 'Name required.'}),
    email: z.string().email( {message: 'Email required'}),
    number: z.number().min(8, {message: 'Number required, min 8 caracteres'})
    // possivel tratamento de numeros no esquema:
    //     number: z
    //     .string()
    //     .nonempty({ message: "Campo obrigatório" })
    //     .transform((val) => Number(val))
    //     .refine((val) => !isNaN(val), { message: "Deve ser um número válido" }),
})


type FormData = z.infer<typeof schema>

export default function MyForm () {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: FormData) => {
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} mt={4}>
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.number} mt={4}>
                <FormLabel>Number</FormLabel>
                <Input {...register("number", {valueAsNumber: true})} />
                <FormErrorMessage>{errors.number?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" mt={4} colorScheme="teal">Enviar</Button>
        </form>
    )
}