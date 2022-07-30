import React from 'react'
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import NavbarMinimal from '../components/NavbarMinimal';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/outline';
import { BadgeCheckIcon } from '@heroicons/react/outline';
import Footer from '../components/Footer';

const profile = () => {

    const { data: session } = useSession();
    const router = useRouter();


    return (
        <div>
            <Head>
                <title>Profile-{session?.user?.name}</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <NavbarMinimal />
            <main className='w-[90%] mx-auto flex  h-full my-10 md:mb-10'>
                <aside className='w-[80%] md:w-[60%] h-full flex flex-col items-center md:mt-9 mt-4 border rounded-lg mx-auto '>
                    <div className='w-full flex items-center mt-3'>
                        <ChevronLeftIcon className="md:h-10 md:w-10 md:p-2 h-8 w-8 p-1.5 mx-3 my-3 cursor-pointer transition-all hover:bg-gray-100 rounded-full " onClick={() => router.back()} />
                        <p className='font-poppins  mr-auto font-semibold text-gray-700 text-base md:text-xl text-center '>Profile</p>
                        <p className='font-poppins text-red-500 capitalize mr-8  text-base md:text-xl font-medium'>{session?.user?.name }</p>
                    </div>
                    {session && <div className='w-[90%] mx-auto border-t my-2 pt-8 flex justify-center items-center'>
                        <Image src={session?.user?.image} alt='user' objectFit='cover' width={130} height={130} className='rounded-full' />
                    </div>}
                    <div className='w-[88%] mx-auto flex mt-6 mb-2 items-center'>
                        <StarIcon className='h-6 w-6' />
                        <p className='font-poppins text-lg ml-4 flex-1'>No reviews</p>
                    </div>
                    <div className='w-[88%] mx-auto flex items-center mb-6'>
                        <BadgeCheckIcon className='h-6 w-6' />
                        <p className='font-poppins text-lg ml-4 flex-1'>Identity verified</p>
                    </div>
                </aside>
            </main>
            <Footer/>

        </div>
    )
}

export default profile