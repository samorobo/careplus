"use server"

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, databases, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file"

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )
        console.log({newUser})
        return parseStringify(newUser)

    } catch (error: any) {
        //if user already exists, return existing user
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])
            return documents?.users[0]
        }
    }
}

//user already authenticated but we need to register them here ant the backend

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error) {
        console.log(error)
    }
}

export const getPatient = async (userId: string) => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal('userId', userId)]
        )
        return parseStringify(patients.documents[0])
    } catch (error) {
        console.log(error)
    }
}

//we are registering patients, and here its takes in the identificationdocument that was uploaded as props
// and all the other patient information which is passed as a spread operator ...patient

export const registerPatient = async ({identificationDocument, ...patient}: RegisterUserParams) => {
    try{
        let  file ;
        if(identificationDocument){
        //check if the identificationDocument exist, then access to that input file from the blob
        const inputFile = InputFile.fromBuffer(
            identificationDocument?.get('blobFile') as Blob,
            identificationDocument?.get('fileName') as string,
        )

        // we are first parsing it into app-write storage before its goes into appwrite database
        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    console.log(
        {
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            ...patient
        },
        
    )

    // create the new patient information and documents on the appwrite database
    const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            ...patient
        }
    )
    return parseStringify(newPatient);

    } catch(error){
        console.log(error)
    }
}

