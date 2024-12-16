import { MutationFunction } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z,ZodSchema } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const useZodForm = (schema: ZodSchema, mutation: MutationFunction, defaultValues?: any) => {
    const {register, handleSubmit, formState: {errors},watch, reset } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultValues
        }
    })
    const onFormSubmit = handleSubmit(async(values)=> mutation({...values}))
    return {
        register, 
        errors,
        onFormSubmit,
        watch,
        reset
    }
}


export default useZodForm