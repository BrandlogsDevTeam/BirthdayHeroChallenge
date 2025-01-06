'use client';
import { completeSignUp } from '@/lib/supabase/server-extended/userProfile';
import React, { useState } from 'react'

const UserSignupFlow = () => {

    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (event: any) => {
        setFiles(event.target.files)
    }

    const uploadFiles = async () => {
        setUploading(true)
        const uploads = []

        for (let i = 0; i < files.length; i++) {
            const file: any = files[i]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${i}.${fileExt}`
            const filePath = `${fileName}`

            uploads.push(
                supabase.storage.from('wanderlust-storage-repo').upload(filePath, file)
            )
        }

        const results = await Promise.all(uploads)

        results.forEach(({ error }, index) => {
            if (error) {
                console.error(`Error uploading file ${index + 1}:`, error)
            } else {
                console.log(`File ${index + 1} uploaded successfully`)
            }
        })

        console.log(results)

        const successful_uploads = results.map(r => r?.data?.id || '').filter(r => !!r)
        setFormData(f => ({ ...f, images: successful_uploads }))
        setUploading(false)
    }

    return (
        <div className="flex w-screen h-screen">
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Complete your Profile
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className="mb-4">
                                <label htmlFor="image_upload" className="block text-sm font-medium text-gray-700">Avatar</label>
                                <input
                                    id="image_upload"
                                    name="image_upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5  " placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                <input type="text" name="username" id="username" placeholder="john-doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5  " required />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 ">Bio</label>
                                <textarea rows={3} name="bio" id="bio" placeholder="Check out these amazing photos from my recent birthday party!" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5  " required />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 " required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <a className="font-medium text-green-600 hover:underline" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" formAction={completeSignUp} className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
}

export default UserSignupFlow