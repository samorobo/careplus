"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"



 
const  RegisterForm = ({ user }: {user: User}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
        ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
   
    setIsLoading(true);

    let formData;

    if(values.identificationDocument && values.identificationDocument.length > 0){
        //Blob is a special version of a file which browser can read
        const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
        })
        formData = new FormData();
        formData.append('blobFile', blobFile)
        formData.append("fileName", values.identificationDocument[0].name)

    }

    try{
        //we are parsing all the values with the spread operator ...values, and only modifying thise that would be updated
      const patientData = {
        ...values,
        userId: user.$id,
        birthData: new Date(values.birthDate),
        identificationDocument: formData,
      }

      // @ts-ignore
      const patient = await registerPatient(patientData)

      if(patient) router.push(`/patients/${user.$id}/new-appointment`)
      
    } catch (error) {
      console.log(error)
    } finally{
    setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9">
            <h2 className="sub-header">Personal Information.</h2>
            </div>
        </section>
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="name" 
        label="Full Name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user" />


        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="email" 
        label="Email" 
        placeholder="sammy@master.pro"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email" />

         <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.PHONE_INPUT} 
        name="phone" 
        label="Phone number" 
        placeholder="(555) 123-4567"
         /> 
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.DATE_PICKER} 
        name="birthDate" 
        label="Date of Birth" 
         />

         <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.SKELETON} 
        name="gender" 
        label="Gender" 
        renderSkeleton={(field) => (
            <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" 
                onValueChange={field.onChange} 
                defaultValue={field.value}>
                    {GenderOptions.map((option) => (
                        <div key={option} className="radio-group">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
        )}
         />       
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="address" 
        label="Address"
        placeholder="Bourdilon avenue, ikoyi, Lagos"
        />

        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="occupation" 
        label="Occupation"
        placeholder="Software Engineer"
        />                            
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="emergencyContactName" 
        label="Emergency contact name" 
        placeholder="Guardian's name"
        />

         <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.PHONE_INPUT} 
        name="emergencyContactNumber" 
        label="Emergency contact number" 
        placeholder="(555) 123-4567"
         /> 
        </div>

        <section className="space-y-6">
            <div className="mb-9">
            <h2 className="sub-header">Medical Information.</h2>
            </div>
        </section>

        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.SELECT} 
        name="primaryPhysician" 
        label="Primary Physician" 
        placeholder="Select a physician">
            {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                        src={doctor.image} 
                        width={24} height={24} alt={doctor.name} className="rounded-full border border-dark-500" />
                        <p>{doctor.name}</p>
                    </div>
                </SelectItem>
            ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="insuranceProvider" 
        label="Insurance provider"
        placeholder="Leadway Assurance company"
        />

        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="insurancePolicyNumber" 
        label="Insurance policy number"
        placeholder="ABC12345679"
        />        
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.TEXTAREA} 
        name="allergies" 
        label="Allergies (if any)"
        placeholder="Peanut, penicillin, pollen"
        />

        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.TEXTAREA} 
        name="currentMedication" 
        label="Current medication (if any)"
        placeholder="Ibuprofen 200mg, paracetamol 500mg"
        />        
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.TEXTAREA} 
        name="familyMedicalHistory" 
        label="Family medical history"
        placeholder="Mother had brain cancer, father had heart disease"
        />

        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.TEXTAREA} 
        name="pastMedicalHistory" 
        label="Past medical history"
        placeholder="Appendectomy, Tonsillectomy"
        />        
        </div>

        <section className="space-y-6">
            <div className="mb-9">
            <h2 className="sub-header">Identification and Verification</h2>
            </div>
        </section>

        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.SELECT} 
        name="identificationType" 
        label="Identification type" 
        placeholder="Select an identification type">
            {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                    {type}
                </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.INPUT} 
        name="identificationNumber" 
        label="Identification number"
        placeholder="12345679"
        />

    <CustomFormField 
        control={form.control} 
        fieldType={FormFieldType.SKELETON} 
        name="identificationDocument" 
        label="Scanned copy of identification document" 
        renderSkeleton={(field) => (
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
        )}
         />

         <section className="space-y-6">
            <div className="mb-9">
            <h2 className="sub-header">Consent and Privacy</h2>
            </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment" />

        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information" />

        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy" />


      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>

  )
}

export default RegisterForm







