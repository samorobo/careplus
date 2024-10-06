import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register =  async ({ params: { userId }}: SearchParamProps) => {
    //we get the userId from params by destructing it from params - since the userId is in the url 
    // which can only be gotten through params
    const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex flex-1 py-10">
          <Image 
          src="/assets/icons/logo-full.svg" 
          height={1000} width={1000} 
          alt="patient" 
          className="mb-12 h-10 w-fit" />

          <RegisterForm user={user}/>
          <p className="copyright py-12">
            © 2024 CarePulse
            </p>
        </div>
      </section>
      <Image src="/assets/images/register-img.png" 
      height={1000} width={1000} alt="patient" 
      className="side-img max-w-[390px]" />
    </div>
  )
}

export default Register



// import Image from 'next/image'
// import React from 'react'
// import Link from 'next/link'
// import PatientForm from '@/components/forms/PatientForm'
// import RegisterForm  from '@/components/forms/RegisterForm'
// import { getUser } from '@/lib/actions/patient.actions'
// //import * as Sentry from '@sentry/nextjs'
// const Register = async( {params: {userId}}: SearchParamProps) => {
//      const user = await getUser(userId);
  
//     // Sentry.metrics.set("user_view_register", user.name);
//   return (
//     <div className="flex h-screen max-h-screen">
//     <section className="remove-scrollbar container">
// <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
// <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className="mb-12 h-10 w-fit"/>
// <RegisterForm user={user}/>
// <p className="py-12 copyright">
// © 2024 Richard's clinic 
// </p>
// </div>
//     </section>
//     <Image src="/assets/images/register-img.png" 
//     height={1000} 
//     width={1000} 
//     alt="patient" 
//     className="side-img max-w-[50%]"/>
//     </div> 
//     // <div className='flex h-screen max-h-screen'>
//     //    <section className='remove-scrollbar container'>
//     //     <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
//     //         <Image src="/assets/icons/logo.svg" height={1000} width={1000} alt="carepulse" className='mb-12 h-10 w-fit'/>
//     //     </div>
//     //    </section>
//     // </div>
//   )
// }

// export default Register
