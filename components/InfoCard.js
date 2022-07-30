import Image from "next/image";
import { HeartIcon, BadgeCheckIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";

const InfoCard = ({ address, rating, title, star, price, img, id, dateRange, guests, nights }) => {
   

    const router = useRouter();

    function gotoPropertyPage() {
        
        router.push({
            pathname: '/property/[id]',
            query: {
                id: id,
                daterange: dateRange,
                guests: guests,
                title: title,
                nights:nights
            }
        })
    };


    return (
        <div className="flex  my-3 w-[96%] mx-auto px-2 py-5 border-b cursor-pointer hover:opacity-90 hover:shadow-md rounded-lg transition duration-300 ease-out first:border-t last:mb-8" onClick={gotoPropertyPage}>
            <div className="relative md:h-40 md:w-60 h-28 w-32  flex-shrink-0 rounded-lg">
                <Image
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
            <div className="flex flex-col pl-5 flex-grow font-poppins">
                <div className="flex justify-between">
                    <p className=" text-gray-600 text-[10px] md:text-sm tracking-wide">{`${address.streetAddress || 'Main Street'} , ${address.locality}`}</p>
                    <HeartIcon className="h-4 md:h-6 cursor-pointer  " />
                </div>
                <h3 className="font-medium text-gray-900 text-sm md:text-xl mt-1">{title}</h3>
                <div className="flex space-x-3 items-center flex-grow ">
                    <BadgeCheckIcon className="h-4 md:h-6  text-red-400" />
                    <p className="text-gray-600 text-xs md:text-sm tracking-wide capitalize ">{ rating?.badge || 'Nice'}</p>
                </div>
                <div className="flex items-center text-xs md:text-base ">
                    <p className="flex flex-grow items-center">
                        <StarIcon  className="h-4 md:h-6 text-red-400 mr-2"/>
                        {star || '7.0'}
                    </p>
                    <div className="flex flex-col justify-end "> 
                        <p className="text-gray-900 font-poppins font-medium md:text-lg text-xs tracking-wide">&#8377;{ `${Math.ceil(price.exactCurrent * 70) } /night`}</p>
                        <p className="text-gray-700 font-poppins  md:text-sm text-xs tracking-wide text-right underline">&#8377;{ `${Math.ceil(price.exactCurrent * 70) * nights} total `}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InfoCard;
