import { XIcon } from "@heroicons/react/outline"

import Image from 'next/image';

import { signIn } from 'next-auth/react';



const Loginbox = ({ toggler }) => {


    function gotoLogin() {

        signIn('google')
    };

    return (

        <>
            <div className="flex flex-col md:h-[40%] md:w-[40%] h-[40%] w-[80%] shadow-xl fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[100] bg-white rounded-xl opacity-100 transition duration-500 ease-out">
                <div className="flex items-center px-5 py-3 border-b transition-all duration-300 ease-linear">
                    <XIcon className="md:h-9 md:w-9 h-8 w-8 text-red-400 cursor-pointer text-left rounded-full hover:bg-gray-100 md:p-2 p-1  " onClick={() => toggler(false)} />
                    <p className="font-poppins font-semibold md:text-base text-sm flex-grow text-center tracking-wider mr-3">Login</p>
                </div>

                <div className="flex overflow-y-auto flex-col p-5">
                    <div className="flex flex-col">
                        <h2 className="font-poppins font-medium text-lg md:text-2xl mb-5">Welcome to Airbnb</h2>

                        <div className="flex items-center mt-5 border border-gray-500 p-3 rounded-xl hover:border-black" onClick={gotoLogin}>
                            <Image
                                src="/Images/Search.png"
                                height="21"
                                width="21"
                                objectFit="cover"
                            />
                            <p className="font-poppins text-gray-900 text-sm flex-grow text-center tracking-wide cursor-pointer ">Continue with Google</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-screen w-[100%] fixed top-0 bg-current opacity-70 z-50  " />

        </>
    )
}

export default Loginbox
