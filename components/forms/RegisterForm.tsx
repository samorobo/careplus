"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomDefaultFormField from "../CustomDefaultFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormModalValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldChoiceType } from "./PatientFormModal"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormModalDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"



 
const  RegisterFormModal = ({ user }: {user: User}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormModalValidation>>({
    resolver: zodResolver(PatientFormModalValidation),
    defaultValues: {
        ...PatientFormModalDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormModalValidation>) {
   
    setIsLoading(true);

    let formData;

    if(values.identificationDocument && values.identificationDocument.length > 0){
        //Blob is a special version of a file which browser can read
        const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
        })
        formData = new FormData();
        formData.append('blobFile', blobFile)
        formData.append("fileName", values.identificationDocument[0]?.name)

    }

    try{
        //we are parsing all the values with the spread operator ...values, and only modifying thise that would be updated
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      }

      // @ts-ignore
      const patient = await registerPatient(patientData)

      if(patient) router.push(`/patients/${user.$id}/new-appointment`)
      
    } catch (error) {
      console.log(error)
    } 
    setIsLoading(false)
    
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
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="name" 
        label="Full Name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user" />


        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.DATE_PICKER} 
        name="birthDate" 
        label="Date of Birth" 
         />

         <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.SKELETON} 
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
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="address" 
        label="Address"
        placeholder="Bourdilon avenue, ikoyi, Lagos"
        />

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="occupation" 
        label="Occupation"
        placeholder="Software Engineer"
        />                            
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="emergencyContactName" 
        label="Emergency contact name" 
        placeholder="Guardian's name"
        />

         <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.PHONE_INPUT} 
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

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.SELECT} 
        name="primaryPhysician" 
        label="Primary Physician" 
        placeholder="Select a physician">
            {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor?.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                        src={doctor.image} 
                        width={24} height={24} alt={doctor?.name} className="rounded-full border border-dark-500" />
                        <p>{doctor?.name}</p>
                    </div>
                </SelectItem>
            ))}
        </CustomDefaultFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="insuranceProvider" 
        label="Insurance provider"
        placeholder="Leadway Assurance company"
        />

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="insurancePolicyNumber" 
        label="Insurance policy number"
        placeholder="ABC12345679"
        />        
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.TEXTAREA} 
        name="allergies" 
        label="Allergies (if any)"
        placeholder="Peanut, penicillin, pollen"
        />

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.TEXTAREA} 
        name="currentMedication" 
        label="Current medication (if any)"
        placeholder="Ibuprofen 200mg, paracetamol 500mg"
        />        
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.TEXTAREA} 
        name="familyMedicalHistory" 
        label="Family medical history"
        placeholder="Mother had brain cancer, father had heart disease"
        />

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.TEXTAREA} 
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

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.SELECT} 
        name="identificationType" 
        label="Identification type" 
        placeholder="Select an identification type">
            {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                    {type}
                </SelectItem>
            ))}
        </CustomDefaultFormField>

        <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.INPUT} 
        name="identificationNumber" 
        label="Identification number"
        placeholder="12345679"
        />

    <CustomDefaultFormField 
        control={form.control} 
        fieldType={FormFieldChoiceType.SKELETON} 
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

        <CustomDefaultFormField
            fieldType={FormFieldChoiceType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment" />

        <CustomDefaultFormField
            fieldType={FormFieldChoiceType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information" />
                                      
        <CustomDefaultFormField
            fieldType={FormFieldChoiceType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy" />


      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>

  )
}

export default RegisterFormModal







