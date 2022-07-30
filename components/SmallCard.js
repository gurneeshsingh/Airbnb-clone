import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { add } from "date-fns";

const SmallCard = ({ img, location, distance }) => {

    const router = useRouter();


    function gotoPlaceSearch(location) {
        const startdate = new Date();
        const enddate = add(new Date(),{days: 2})
      
        router.push({
            pathname: '/search',
            query: {
                startDate: startdate.toISOString(),
                endDate: enddate.toISOString(),
                location: location,
                guests : 2
            } 
        })
    }

    return (
        <div className="flex items-center space-x-5 m-2 mt-5 hover:bg-gray-100 rounded-xl hover:scale-105 cursor-pointer transition transform duration-300 ease-out min-w-max pr-2 " onClick={()=>gotoPlaceSearch(location)}>
            <div className="relative h-16 w-16 ">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-xl"
                />
            </div>
            <div>
                <h3 className="font-poppins font-medium tracking-wide">{location}</h3>
                <h2 className="font-poppins text-sm text-gray-700 ">{ distance}</h2>
            </div>
        </div>
    )
}   

export default SmallCard
