"use client"

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Control } from "react-hook-form"
import { FormFieldChoiceType } from "./forms/PatientFormModal"
import Image from "next/image"
//import PhoneInput from "react-phone-number-input/input"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"



  interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldChoiceType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?:string,
    disabled?: boolean,
    dateFormat?: string
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
  }

  const RenderField = ({field, props}: {field: any, props: CustomProps}) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect,dateFormat, renderSkeleton } = props
    switch (fieldType) {
        case FormFieldChoiceType.INPUT:
        return(
            <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                {
                   iconSrc && (
                    <Image src={iconSrc} height={24} width={24} alt={iconAlt || 'icon'} className='ml-2'
                    />
                    )}
                <FormControl>
                  <Input placeholder={placeholder} {...field} className='shad-input border-0'
                  />
                </FormControl>
            </div>
        )
        case FormFieldChoiceType.TEXTAREA:
          return(
            <FormControl>
              <Textarea placeholder={placeholder} {...field} className="shad-textArea" disabled={props.disabled} />
            </FormControl>
          )
      case FormFieldChoiceType.PHONE_INPUT: 
      return(
       <FormControl>
        <PhoneInput
       defaultCountry='NG'
       placeholder={placeholder}
       international
       withCountryCallingCode
       value={field.value as E164Number | undefined}
       onChange={field.onChange}
       className='input-form'
        />
       </FormControl>
      )
      case FormFieldChoiceType.DATE_PICKER:
        return(
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            <Image src="/assets/icons/calender.svg" height={24} width={24} alt="calender" className="ml-2 bg-white" />
            <FormControl>
            <DatePicker 
            selected={field.value} 
            onChange={(date) => field.onChange(date)}
            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
            showTimeSelect={showTimeSelect ?? false}
            timeInputLabel="Time"
            wrapperClassName="date-picker" />
            </FormControl>
          </div>
        )

        case FormFieldChoiceType.SELECT:
          return (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="shad-select-content">
                  {props.children}
                </SelectContent>
              </Select>
            </FormControl>
          )
        case FormFieldChoiceType.SKELETON:
          return (
            renderSkeleton ? renderSkeleton(field) : null
          )
          case FormFieldChoiceType.CHECKBOX:
            return(
              <FormControl>
                <div className="flex items-center gap-4">
                  <Checkbox id={props?.name} checked={field.value} onCheckedChange={field.onChange} />
                  <label htmlFor={props?.name} className="checked-label">
                    {props.label}
                  </label>
                </div>
              </FormControl>
            )
            
            
    
        default:
            break;
    }
  }


const CustomDefaultFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;
  return (
    <div>
            <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {/* if the fieldType is not a checkbox and the label exist, then show the label */}
            {fieldType !== FormFieldChoiceType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
            )}

            {/* we can render different type of field depending on the FormFieldChoiceType */}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </div>
  )
}

export default CustomDefaultFormField
