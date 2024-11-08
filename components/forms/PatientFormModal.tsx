"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomDefaultFormField from "../CustomDefaultFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"





export enum FormFieldChoiceType{
    INPUT = 'input',
    TEXTAREA= 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}
 
const  PatientFormModal = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone}: z.infer<typeof UserFormValidation>) {
   
    setIsLoading(true);

    try{
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if(user) router.push(`/patients/${user.$id}/register`)
      
    } catch (error) {
      console.log(error)
    } 
    setIsLoading(false)
    
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-x-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="name" 
        label="Full name" 
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user" />

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="email" 
        label="Email" 
        placeholder="sammy@master.pro"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email" />

         <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.PHONE_INPUT} 
        name="phone" 
        label="Phone number" 
        placeholder="(555) 123-4567"
         /> 

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>

  )
}

export default PatientFormModal







