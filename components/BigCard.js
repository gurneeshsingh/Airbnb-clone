import Image from "next/image"
import { useRouter } from 'next/dist/client/router';
import { add } from "date-fns";

const BigCard = ({ img, title }) => {

    const router = useRouter();
    function goToPlace(title) {
        const startdate = new Date();
        const enddate = add(new Date(), { days: 2 });
        router.push({
            pathname: '/search',
            query: {
                startDate: startdate.toISOString(),
                endDate: enddate.toISOString(),
                location: title.split(',')[0],
                guests:2
            }
        })
    }
    
    return (
        <div className="flex flex-col items-center m-4 cursor-pointer hover:scale-105 transition transform ease-out duration-200 min-w-max rounded-xl py-2" onClick={()=>goToPlace(title)}>
            <div className="relative h-60 w-60 2xl:h-72 2xl:w-72  ">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-xl"
                />
            </div>

            <h3 className="font-poppins font-medium tracking-wide mt-2 ">{title}</h3>

        </div>
    )
}

export default BigCard;