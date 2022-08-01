import NavbarMinimal from '../../../components/NavbarMinimal';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon } from "@heroicons/react/outline"
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';



const confirm = () => {
    const router = useRouter();
    const { startDate, endDate, guests, nights, id, title, price } = router.query;
    const [baseImage, setBaseImage] = useState(null);
    const { data: session, status } = useSession();
    const [bookingMessage, setbookingMessage] = useState(false);


    function gotoLogin() {
        signIn()
    };


    useEffect(() => {
        let isSubscribed = true;
        async function fetchData() {
            try {
                const response = await fetch(`https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=${id}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "112c0dc446mshc5baa3cd61a3329p1a751bjsn2ffdd8e3d45c",
                        "x-rapidapi-host": "hotels4.p.rapidapi.com"
                    }
                });
                const data = await response.json();
                const propertyImages = data?.roomImages?.map(element => (
                    element.images?.map((nextelement) => (
                        nextelement?.baseUrl
                    ))));
                isSubscribed && setBaseImage(propertyImages.toString().split(',').map((element) => (element.replace("_{size}", ""))).slice(0, 1));

            } catch (error) {
                console.log(error);
            }
        }

        id && fetchData()
        return () => isSubscribed = false;
    }, [id])



    return (
        <div>
            <Head>
                <title> Confirm and pay</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <NavbarMinimal />
            <main className='flex flex-col h-full w-[90%] mx-auto'>
                {/* top div  */}
                <div className='w-full flex items-center md:mt-9 mt-4  '>
                    <ChevronLeftIcon className="md:h-10 md:w-10 md:p-2 h-8 w-8 p-1.5 mx-3 my-3 cursor-pointer transition-all hover:bg-gray-100 rounded-full " onClick={() => router.back()} />
                    <p className='font-poppins font-semibold text-gray-700 text-base md:text-2xl text-center '>Confirm and pay</p>
                </div>
                <div className='w-full flex md:hidden  border-b border-gray-300 pb-4 mt-4 '>
                    <div className='rounded-lg w-28 ml-6'>
                        {baseImage && <Image src={baseImage[0]} height={80} width={90} objectFit='cover' loading='lazy' className='!rounded-md' />}
                    </div>
                    <div className='flex-1 ml-3 mt-2'>
                        <p className='font-poppins font-light  text-xs text-gray-600'>{title}</p>
                    </div>
                </div>

                {/* main section  */}
                <section className='w-full flex'>
                    {/* left section  */}

                    <div className='flex flex-col w-[100%] md:w-[55%] p-7'>
                        <p className='font-poppins font-medium text-gray-800 text-base md:text-xl mb-4'>Your trip</p>
                        <div className='flex items-center border border-gray-200 rounded-lg px-3 py-4 mb-3'>
                            <p className='font-poppins text-xs md:text-sm font-medium flex-grow'>Check-In</p>
                            <p className='font-poppins text-xs md:text-sm text-gray-600 font-light'>{startDate}</p>
                        </div>
                        <div className='flex items-center border border-gray-200 rounded-lg px-3 py-4 mb-3 '>
                            <p className='font-poppins text-xs md:text-sm font-medium flex-grow'>Checkout</p>
                            <p className='font-poppins text-xs md:text-sm text-gray-600 font-light'>{endDate}</p>
                        </div>
                        <div className='flex items-center border border-gray-200 rounded-lg px-3 py-4 mb-3 '>
                            <p className='font-poppins text-xs md:text-sm font-medium flex-grow'>Guests</p>
                            <p className='font-poppins text-xs md:text-sm text-gray-600 font-light'>{guests}</p>
                        </div>

                        {/* login or signup  */}
                        {(!session || status === 'unauthenticated') ? <div className='border-t border-gray-300 py-5 flex flex-col mt-8'>
                            <h3 className='font-poppins font-medium text-gray-800 text-sm md:text-xl my-3 '>Login first to book</h3>

                            <div className="flex items-center mt-5 border border-gray-500 p-3 rounded-xl hover:border-black" onClick={gotoLogin}>
                                <Image
                                    src="/Images/search.png"
                                    height="21"
                                    width="21"
                                    objectFit="cover"
                                />
                                <p className="font-poppins text-gray-900 text-sm flex-grow text-center tracking-wide cursor-pointer ">Login with Google</p>
                            </div>
                        </div> :
                            <>
                                <div className='border-t border-b border-gray-300 pt-4 md:pt-5 pb-6 md:pb-8 flex flex-col  mt-4 md:mt-6'>
                                    <h2 className='text-lg md:text-xl font-semibold font-poppins my-3'>Cancellation policy</h2>
                                    <p className='font-poppins text-gray-600 text-sm md:text-base'><span className='font-medium text-black'>Free cancellation for 48 hours.</span> Cancel before {endDate} for a partial refund.</p>
                                </div>
                                <div className='flex w-full flex-col md:flex-row  items-center my-2 '>
                                    <button className='rounded-xl font-poppins  w-full md:w-[40%] py-3 md:py-4  shadow-sm text-center text-lg md:text-xl items-center my-6 flex justify-center font-semibold text-white bg-red-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:pointer-events-none' disabled={bookingMessage} onClick={() => setbookingMessage(!bookingMessage)}>{!bookingMessage ? "Request to book" : "Requested"}</button>
                                    {bookingMessage && <p className='font-poppins text-sm font-light md:my-6 md:ml-4'>Thank you. This feature would be available soon.</p>}
                                </div>
                            </>}

                    </div>

                    {/* right section  */}
                    <aside className='w-full md:w-[40%] ml-auto  md:h-full hidden md:flex md:items-center md:overflow-hidden md:sticky md:top-[20vh] transition-all mb-8'>
                        <div className='border border-gray-300 rounded-lg w-full p-5 flex flex-col'>
                            {/* image section  */}
                            <div className='w-full flex  border-b border-gray-300 pb-4 '>
                                <div className='rounded-lg w-32'>
                                    {baseImage && <Image src={baseImage[0]} height={150} width={150} objectFit='cover' loading='lazy' className='!rounded-md' />}
                                </div>
                                <div className='flex-1 ml-3 mr-3 mt-2'>
                                    <p className='font-poppins font-light tracking-wide text-sm text-gray-600'>{title}</p>
                                </div>
                            </div>
                            <div className='w-full flex flex-col  border-b border-gray-300 pb-4 '>
                                <h1 className='font-medium font-poppins text-gray-700 text-xl my-5'>Price Details</h1>
                                <div className='w-full flex flex-col mt-1 mb-3'>
                                    <div className='w-full flex '>
                                        <p className='font-poppins tracking-wide flex-1'>&#8377; {price} x {nights} {nights > 1 ? "nights" : "night"}</p>
                                        <p className='font-poppins tracking-wide'>&#8377; {price * nights}</p>
                                    </div>
                                    <div className='w-full flex mt-2 '>
                                        <p className='font-poppins tracking-wide flex-1 underline text-gray-600'>Service fee</p>
                                        <p className='font-poppins tracking-wide text-green-600 font-medium'>&#8377; 0</p>
                                    </div>

                                </div>
                            </div>
                            <div className='w-full flex mt-4'>
                                <h2 className='flex-1 font-bold font-poppins'>Total (INR)</h2>
                                <p className='font-poppins tracking-wide'>&#8377; {price * nights}</p>
                            </div>

                        </div>
                    </aside>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default confirm;

