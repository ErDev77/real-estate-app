"use client";

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Formik } from 'formik';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import FileUpload from '../_components/FileUpload';
import { Loader } from 'lucide-react';

function EditListing({params}) {
    const router = useRouter();
    const {user} = useUser();
    const [listing, setListing] = useState();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        user&&verifyUserRecord();
    }, [user]);


    const verifyUserRecord = async () => {
        const { data, error } = await supabase
        .from('listing')
        .select('*, listingImages(listing_id, url)')
        .eq('createdBy', user?.primaryEmailAddress.emailAddress)
        .eq('id', params.id);

        if(data) {
            console.log(data)
            setListing(data[0]);
        }

        if(data?.length <= 0) {
            {
                router.replace('/')
            }
        }
    }

    const onSubmitHandler = async (formValue) => {
        setLoading(true)
        const { data, error } = await supabase
            .from('listing')
            .update(formValue)
            .eq('id', params.id)
            .select();

            if(data) {
                console.log(data)
                toast("Listing Updated and Published")
                setLoading(false)
            }

            for(const image of images) {
                setLoading(true)
                const file = image;
                const fileName = Date.now().toString();
                const fileExt = fileName.split('.').pop(); 'sample.png'
                
                const { data, error } = await supabase.storage
                .from('listingImages')
                .upload(`${fileName}`, file, {
                    contentType: `image/${fileExt}`,
                    upsert: false
                });
                
                if(error) {
                    setLoading(false)
                    toast("Error while uploading images")
                } else {
                    const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName
                    const { data, error } = await supabase
                    .from('listingImages')
                    .insert([
                        {url:imageUrl, listing_id:params?.id}
                    ])
                    .select();

                    if(data) {
                        setLoading(false)
                    }

                    if(error) {
                        setLoading(false)
                    }
                }
                setLoading(false);
            }
    }

    const publishButtonHandler = async () => {
        setLoading(true)
        const { data, error } = await supabase
        .from('listing')
        .update({ active: true })
        .eq('id', params?.id)
        .select();

        if(data) {
            setLoading(false)
            toast("Listing published!")
        }
    }
  return (
		<div className='px-10 md:px-36 my-10'>
			<h2 className='font-bold text-2xl'>
				Enter more information about your listing
			</h2>
			<Formik
				initialValues={{
					type: '',
					propertyType: '',
					profileImage: user?.imageUrl,
					fullName: user?.fullName,
				}}
				onSubmit={values => {
					console.log(values)
					onSubmitHandler(values)
				}}
			>
				{({ values, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<div>
							<div className='p-5 border rounded-lg shadow-md grid gap-7 mt-6'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
									<div className='flex flex-col gap-2'>
										<h2 className='text-lg text-slate-500'>Rent or Sell?</h2>
										<RadioGroup
											defaultValue={listing?.type}
											onValueChange={v => (values.type = v)}
										>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem value='Rent' id='Rent' />
												<Label htmlFor='Rent'>Rent</Label>
											</div>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem value='Sell' id='Sell' />
												<Label htmlFor='Sell'>Sell</Label>
											</div>
										</RadioGroup>
									</div>
									<div className='flex flex-col gap-2'>
										<h2 className='text-lg text-slate-500'>Property Type</h2>
										<Select
											defaultValue={listing?.propertyType}
											onValueChange={e => (values.propertyType = e)}
											name='propertyType'
										>
											<SelectTrigger className='w-[180px]'>
												<SelectValue
													placeholder={
														listing?.propertyType
															? listing?.propertyType
															: 'Select Property Type'
													}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Single Family House'>
													Single Family House
												</SelectItem>
												<SelectItem value='Town House'>Town House</SelectItem>
												<SelectItem value='Condo'>Condo</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Bedroom</h2>
										<Input
											defaultValue={listing?.bedroom}
											type='number'
											placeholder='Ex.2'
											name='bedroom'
											onChange={handleChange}
										/>
									</div>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Bathroom</h2>
										<Input
											defaultValue={listing?.bathroom}
											type='number'
											placeholder='Ex.2'
											name='bathroom'
											onChange={handleChange}
										/>
									</div>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Built In</h2>
										<Input
											defaultValue={listing?.builtIn}
											type='number'
											placeholder='Ex.1900 Sq.ft'
											name='builtIn'
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Parking</h2>
										<Input
											defaultValue={listing?.parking}
											type='number'
											placeholder='Ex.2'
											name='parking'
											onChange={handleChange}
										/>
									</div>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Lot Size (Sq.Ft)</h2>
										<Input
											defaultValue={listing?.lotSize}
											type='number'
											placeholder='Ex.2'
											name='lotSize'
											onChange={handleChange}
										/>
									</div>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Area (Sq.Ft)</h2>
										<Input
											defaultValue={listing?.area}
											type='number'
											placeholder='Ex.2'
											name='area'
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Selling Price($)</h2>
										<Input
											defaultValue={listing?.price}
											type='number'
											placeholder='400000'
											name='price'
											onChange={handleChange}
										/>
									</div>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>HOA(Per Month)($)</h2>
										<Input
											defaultValue={listing?.hoa}
											type='number'
											placeholder='100'
											name='hoa'
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className='grid grid-cols-1 gap-10'>
									<div className='flex gap-2 flex-col'>
										<h2 className='text-gray-500'>Description</h2>
										<Textarea
											defaultValue={listing?.description}
											placeholder=''
											name='description'
											onChange={handleChange}
										/>
									</div>
								</div>
								<div>
									<h2 className='font-lg text-gray-500 my-2'>
										Upload your images
									</h2>
									<FileUpload
										setImages={value => setImages(value)}
										imageList={listing?.listingImages}
									/>
								</div>
								<div className='flex gap-7 justify-end'>
									<Button
										disabled={loading}
										variant='outline'
										className='text-primary border-primary'
									>
										{loading ? <Loader className='animate-spin' /> : 'Save'}
									</Button>

									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button type='button' disabled={loading}>
												{loading ? (
													<Loader className='animate-spin' />
												) : (
													'Save & Publish'
												)}
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Ready to publish?</AlertDialogTitle>
												<AlertDialogDescription>
													You sure that you want to publish listing?
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => publishButtonHandler()}
												>
													{loading ? <Loader  className='animate-spin'/> : 'Continue'}
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</div>
	)
}

export default EditListing;