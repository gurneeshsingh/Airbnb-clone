import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { format, differenceInCalendarDays } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { getSession } from "next-auth/react";



const Search = ({ allData, errorData, pagesData }) => {
   

    // to get the values from the navbar component of the search inputs , we can use use router ,where the query holds all the values and e can destructure them 
 
    const router = useRouter();
    const { location, startDate, endDate, guests } = router.query;

    // use format package to format the date 
    const formattedStartDate = format(new Date(startDate), 'dd MMM yy');
    const formattedEndDate = format(new Date(endDate), 'dd MMM yy');
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    const nights = differenceInCalendarDays(new Date(endDate),new Date(startDate));

   

    function searchNextpage(page) {
        const path = router.pathname;
        const query = router.query;
        query.pageNumber = page + 1;
        router.push({
            pathname: path,
            query:query
        })
    };

    function searchPreviouspage(page) {
        const path = router.pathname;
        const query = router.query;
        query.pageNumber = page - 1;
        router.push({
            pathname: path,
            query:query
        })
    };
    

    return (
        <div>
            <Head>
                <title>{location}- Stays</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <Navbar placeholder={`${location} | ${range} | ${guests} guests`} />
            <main className="flex ">

                {/* left section  */}
                {errorData && <section>
                    <p className="text-center text-gray-600  font-poppins text-sm sm:text-xl tracking-wide mt-12">No Places found</p>
                </section>}
               

                <section className="flex-grow ">
                    <p className="text-xs md:text-sm mt-10 pl-5 font-poppins text-gray-600 tracking-wide">Showing {allData.length}  stays   | <span className="bg-red-400 py-1 px-3 rounded-xl">{range}</span>  | {guests} guests </p>
                    <h2 className="pl-5 font-poppins font-medium text-2xl md:text-4xl mt-4 mb-5">Stays in {location}</h2>
                    <div className="hidden lg:inline-flex space-x-3 pl-5 mb-5 items-center whitespace-nowrap">
                        <p className="filterButtons">Cancellation flexibility</p>
                        <p className="filterButtons">Type of place</p>
                        <p className="filterButtons">Price</p>
                        <p className="filterButtons">Instant book</p>
                    </div>
                    {(allData?.length == 0 || !allData) ? <section>
                        <p className="text-center text-gray-600  font-poppins text-sm sm:text-xl tracking-wide mt-12">No Places found</p>
                    </section> :
                        <div className="flex flex-col">
                            {allData.map((item) => (
                                <InfoCard
                                    id={item.id}
                                    key={item.id}
                                    address={item.address}
                                    coords={item.coordinate}
                                    rating={item.guestReviews}
                                    title={item.name}
                                    star={item.guestReviews?.rating}
                                    price={item.ratePlan?.price}
                                    img={item.optimizedThumbUrls?.srpDesktop || item.thumbnailUrl}
                                    dateRange={range}
                                    guests={guests}
                                    nights={nights}

                                />
                            ))}
                        </div>}
                    
                    {/* pagination div  */}
                    <div className="flex items-center justify-center space-x-10 mb-4 -mt-1">
                        <button disabled={pagesData?.pagination.currentPage<=1}  className="px-4 py-2 rounded-full border-[1.5px] border-red-400 text-xs sm:text-sm hover:bg-red-400 hover:text-white transition-all disabled:bg-gray-400 disabled:border-none disabled:text-white disabled:opacity-30 disabled:cursor-not-allowed" onClick={()=>searchPreviouspage(pagesData?.pagination.currentPage)}>Previous</button>
                        <p className="flex items-center justify-center bg-red-400 text-sm sm:text-base rounded-full font-medium h-10 w-10">{pagesData?.pagination.currentPage}</p>
                        <button disabled={pagesData?.pagination.currentPage >=Math.ceil(pagesData?.totalCount/25)} className="px-4 py-2 rounded-full border-[1.5px] border-red-400 text-xs sm:text-sm hover:bg-red-400 hover:text-white transition-all disabled:bg-gray-400 disabled:border-none disabled:text-white disabled:opacity-30 disabled:cursor-not-allowed" onClick={()=>searchNextpage(pagesData?.pagination.currentPage)}>Next</button>
                    </div>

                </section>

                {/* Map section only show on large screen and hide on small and mobile device   */}

                <section className="hidden xl:inline-flex xl:min-w-[450px] xl:sticky xl:top-0 xl:right-0  xl:h-screen xl:self-start xl:overflow-hidden ">
                    <Map allData={allData} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search;



export async function getServerSideProps(context) {

    const { location, startDate, endDate, guests } = context.query;
    let pageNumber = context.query.pageNumber || 1;
    const newStartDate = format(new Date(startDate), 'yyyy-MM-dd')
    const newEndDate = format(new Date(endDate), 'yyyy-MM-dd')
    const session = await getSession(context);

    try {
        const locationresponse = await fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${location}&locale=en_US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "112c0dc446mshc5baa3cd61a3329p1a751bjsn2ffdd8e3d45c",
                "x-rapidapi-host": "hotels4.p.rapidapi.com"
            }
        })
        const locationData = await locationresponse.json();

        const locationId = locationData?.suggestions[0].entities[0].destinationId;


        if (locationId) {

            const response = await fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${locationId}&pageNumber=${pageNumber}&pageSize=25&checkIn=${newStartDate}&checkOut=${newEndDate}&adults1=${guests}&sortOrder=STAR_RATING_HIGHEST_FIRST&locale=en_US&currency=USD`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "112c0dc446mshc5baa3cd61a3329p1a751bjsn2ffdd8e3d45c",
                    "x-rapidapi-host": "hotels4.p.rapidapi.com"
                }
            })
            const allData = await response.json();

            return {
                props: {
                    session,
                    allData: allData?.data.body.searchResults.results,
                    pagesData:allData?.data.body.searchResults
                }
            }
        }

    } catch (err) {
        return {
            props: {
                errorData: null
            }
        }
    }

}
