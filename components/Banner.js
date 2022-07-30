import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { add } from "date-fns";


const Banner = () => {


    const router = useRouter();


    function gotoRandomSearch() {
        const startdate = new Date();
        const enddate = add(new Date(),{days: 2})
        
        router.push({
            pathname: '/search',
            query: {
                startDate: startdate.toISOString(),
                endDate: enddate.toISOString(),
                location: 'Jaipur',
                guests : 2
            }
            
        })
    }

    return (
        <div className="relative h-[400px] sm:h-[500px] lg:h-[550px] xl:h-[550px] 2xl:h-[700px]   ">
            <Image
                src="https://links.papareact.com/0fm"
                layout="fill"
                objectFit="cover" 
            />
            <div className="absolute top-1/2 text-center w-full ">
                <p className=" text-gray-600 font-poppins  mb-4 text-sm sm:text-xl ">Not sure where to go? Perfect!</p>
                <button className="sm:px-4 sm:py-2 px-4 py-2.5 bg-white text-red-400 rounded-full font-poppins text-xs sm:text-base active:scale-90 transition duration-200 outline-none shadow-md hover:shadow-lg" onClick={gotoRandomSearch}>Explore now</button>
            </div>
        </div>
    )   
}

export default Banner;

