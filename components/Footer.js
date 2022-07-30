
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="bg-[#FAF1ED] ">
           
                <div className=" hidden md:grid  md:grid-cols-2 lg:grid-cols-4 gap-y-8  py-5  bg-[#FAF1ED] border-t ">

                    <div className="text-sm space-y-4 text-gray-800 font-poppins text-center cursor-pointer">
                        <h5 className="font-bold ">ABOUT</h5>
                        <p>How Airbnb works</p>
                        <p>Newsroom</p>
                        <p>Investors</p>

                    </div>
                    <div className="text-sm space-y-4 text-gray-800 font-poppins text-center cursor-pointer">
                        <h5 className="font-bold ">COMMUNITY</h5>
                        <p>Accessibility</p>
                        <p>Referals</p>
                        <p>Providers</p>
                    </div>

                    <div className="text-sm space-y-4 text-gray-800 font-poppins text-center cursor-pointer">
                        <h5 className="font-bold ">SUPPORT</h5>
                        <p>Help center</p>
                        <p>Cancellation options</p>
                        <p>Trust and safety</p>
                        <p>Neighbourhood support</p>

                    </div>
                    <div className="text-sm space-y-4 text-gray-800 font-poppins text-center cursor-pointer">
                        <h5 className="font-bold ">EXPLORE</h5>
                        <p>Write a Review</p>
                        <p>Add a Place</p>
                        <p>GreenLeaders</p>
                        <p>Join</p>

                    </div>

                </div>
                <div className=" bg-[#FAF1ED] border-t mb-3 flex flex-col  space-y-1 ml-8  md:hidden">
                    <details className="md:hidden text-gray-800 font-poppins  cursor-pointer tracking-wide mt-5">
                        <summary className="font-semibold pb-1 text-xs">ABOUT</summary>
                        <p className="text-xs">How Airbnb works</p>
                        <p className="text-xs">Newsroom</p>
                        <p className="text-xs">Investors</p>
                    </details>
                    <details className="md:hidden text-gray-800 font-poppins  cursor-pointer tracking-wide">
                        <summary className="font-semibold pb-1 text-xs">COMMUNITY</summary>
                        <p className="text-xs">Accessibility</p>
                        <p className="text-xs">Referals</p>
                        <p className="text-xs">Providers</p>
                    </details>
                    <details className="md:hidden text-gray-800 font-poppins  cursor-pointer tracking-wide">
                        <summary className="font-semibold pb-1 text-xs">SUPPORT</summary>
                        <p className="text-xs">Help center</p>
                        <p className="text-xs">Cancellation options</p>
                        <p className="text-xs">Trust and safety</p>
                        <p className="text-xs">Neighbourhood support</p>
                    </details>

                </div>
              

            <div className="flex items-center pb-4 ">
                <div className="ml-8 flex md:hidden">
                <Image src='/Images/logosmall.png' objectFit="contain" width={25} height={25} />
                </div>
                <div className="ml-28 mt-[-1px] hidden md:flex">
                <Image src='/Images/logosmall.png' objectFit="contain" width={30} height={30} />
                </div>
                <div className="flex flex-col ml-4">
                    <p className="font-poppins font-light text-gray-700 text-xs ">© 2022 Airbnb LLC All rights reserved.</p>
                    <div className="flex space-x-3 text-sm sm:text-base">
                    <p className="font-poppins font-medium underline">Terms of Use</p>
                    <p className="font-poppins font-medium underline">Privacy and cookies</p>
                    <p className="font-poppins font-medium underline">Statement</p>
                    <p className="font-poppins font-medium underline">Site Map</p>
                    </div>
                </div>
            </div>
          
        </div>

    )
}

export default Footer
