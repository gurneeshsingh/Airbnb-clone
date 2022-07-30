import { useRouter } from "next/dist/client/router";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer"
import Head from "next/head";
import { StarIcon } from "@heroicons/react/solid";
import { ChevronLeftIcon } from "@heroicons/react/outline"
import { LocationMarkerIcon, HomeIcon, CalendarIcon, KeyIcon, BookmarkIcon, WifiIcon, } from '@heroicons/react/solid';
import Image from "next/image";
import PropertyMap from "../../../components/PropertyMap";
import { useEffect, useState } from "react";
import ImgComponent from "../../../components/ImgComponent";
import BooknowComponent from "../../../components/BooknowComponent";



const Property = ({ image, info }) => {

    const router = useRouter();

    const { id, title, daterange, guests, nights } = router.query;
    const [imageComponent, setImageComponent] = useState(false);
    const [booknowComponent, setbooknowComponent] = useState(false);
    const [editableNights, setEditableNights] = useState(nights);
   

    // images are array of array so we we flatten the array by converting into string and spliting them by , and then modifying the string of the url 
    const Photos = image.toString().split(',').map((element) => (element.replace("_{size}", ""))).slice(0, 15)



    const aboutHotel = `${info?.propertyDescription?.name} is located around the city center, the nearby places are ${info?.overview?.overviewSections[2]?.content[2]}, ${info?.overview?.overviewSections[2]?.content[3]}, ${info?.overview?.overviewSections[2]?.content[1]} . It has ${info?.atAGlance?.keyFacts?.hotelSize[0]} ${(info?.atAGlance?.keyFacts?.hotelSize[1]) || ""} . This is a ${(info?.atAGlance?.transportAndOther?.otherInformation[0]) || "well maintained property good for families & business travellers "} . In-house Guests have access to ${info?.overview?.overviewSections[0]?.content.map((item) => (item))} and ${info?.overview?.overviewSections[4]?.content}. The hotel follows Enhanced health and safety measures in Respose to Covid-19 pandemic. `

    useEffect(() => {
        if (imageComponent) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'hidden';
            document.body.style.overflow = 'auto';
        }
    }, [imageComponent]);

    function triggerImageComponent() {
        setImageComponent(!imageComponent);
    }


    return (
        <div>
            <Head>
                <title>{title}- Stays</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            {imageComponent && <ImgComponent toggler={setImageComponent} images={Photos} />}
            <main className="flex flex-col max-w-[90%] mx-auto">
                {/* Images section  */}
                <div className="flex md:flex-col flex-col-reverse">
                    <div cn="flex flex-col">
                        <h1 className="font-poppins font-medium text-xl md:text-3xl md:my-2 md:pt-5  ">{title}</h1>
                        <div className="flex md:items-center md:flex-row flex-col justify-start">
                            <div className="flex py-1 md:py-0 ">
                                <StarIcon className="h-4 md:h-5 text-red-400 inline-flex  pr-2" />
                                <p className="inline-flex font-poppins  text-xs md:text-sm">{info.guestReviews?.brands?.formattedRating} </p>
                            </div>
                            <div className="flex py-1 md:py-0 ">
                                <LocationMarkerIcon className="inline-flex h-4 md:h-5 text-red-400  md:pl-2 pr-2" />
                                <p className="inline-flex font-poppins  text-gray-600 text-xs md:text-sm">{info.propertyDescription?.address?.addressLine1} , {info.propertyDescription?.address?.cityName} </p>
                            </div>
                            <div className="flex  py-1 md:py-0">
                                <CalendarIcon className="inline-flex h-4 md:h-5 text-red-400 md:pl-4 pr-2" />
                                <p className="inline-flex font-poppins text-gray-600 text-xs md:text-sm">{daterange}</p>
                            </div>
                            <div className="flex  py-1 md:py-0">
                                <HomeIcon className="inline-flex h-4 md:h-5 text-red-400 md:pl-4 pr-2" />
                                <p className="inline-flex font-poppins  text-gray-600 text-xs md:text-sm">{guests} Guests</p>
                            </div>

                        </div>
                    </div>


                    <div className="grid  grid-cols-4 grid-rows-2 my-2 py-2 " onClick={triggerImageComponent}>
                        {/* For large screen layout  */}
                        <div className="hidden md:grid col-span-2 row-span-2 rounded-l-lg hover:opacity-90 cursor-pointer transition-all">
                            <Image src={Photos[0]}
                                height="300"
                                width="300"
                                objectFit="cover"
                                className="rounded-l-lg"
                            />
                        </div>
                        <div className="hidden md:grid col-span-2 md:col-span-1 row-span-1 rounded-l-lg md:rounded-none md:px-3 px-1 md:mb-2 mb-1 hover:opacity-90 cursor-pointer transition-all">
                            <Image src={Photos[1]}
                                height="150"
                                width="150"
                                objectFit="cover"
                                className="rounded-l-lg md:rounded-none"
                            />
                        </div>
                        <div className="hidden md:grid col-span-2 md:col-span-1 row-span-1 rounded-r-lg px-1 md:mb-2 mb-1 hover:opacity-90 cursor-pointer transition-all">
                            <Image src={Photos[3]}
                                height="150"
                                width="150"
                                objectFit="cover"
                                className="rounded-r-lg"
                            />
                        </div>
                        <div className="hidden md:grid col-span-2 md:col-span-1 row-span-1 rounded-l-lg md:rounded-none md:px-3 px-1  md:mt-2 mt-1 hover:opacity-90 cursor-pointer transition-all">
                            <Image src={Photos[5]}
                                height="150"
                                width="150"
                                objectFit="cover"
                                className="rounded-l-lg md:rounded-none"
                            />
                        </div>
                        <div className="hidden md:grid col-span-2 md:col-span-1 row-span-1 rounded-r-lg px-1  md:mt-2 mt-1 hover:opacity-90 cursor-pointer transition-all">
                            <Image src={Photos[7]}
                                height="150"
                                width="150"
                                objectFit="cover"
                                className="rounded-r-lg"
                            />
                        </div>

                        {/* for mobile device  */}
                        <div className="grid col-span-4 row-span-2 rounded-lg md:hidden hover:opacity-90 cursor-pointer transition-all">
                            <Image src={Photos[2]}
                                height="200"
                                width="300"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>

                    </div>
                </div>

                {/* about hotel section  */}
                <section className="flex  border-t flex-col my-4 pt-7 pb-7 border-b">
                    <h1 className="font-poppins text-lg md:text-2xl mb-3 font-medium">All about this hotel</h1>
                    <p className="font-poppins text-xs md:text-base text-gray-600 ">{aboutHotel}</p>
                </section>

                {/* good to know secion  */}
                <div className="flex flex-col md:flex-row ">
                    <section className="flex flex-col pb-7 pt-3 flex-grow ">
                        <h2 className="font-poppins text-lg md:text-2xl mb-3 font-medium">Good to know</h2>
                        <ul className="px-4 font-poppins text-xs md:text-base text-gray-600 ">
                            {info?.atAGlance?.travellingOrInternet?.travelling?.pets?.map((item, index) => {
                                return <li className="list-disc pl-2" key={index}>{item}</li>
                            })}
                            {info?.atAGlance?.travellingOrInternet?.internet?.map((item, index) => {
                                return <li className="list-disc pl-2" key={index}>{item}</li>
                            })}
                            {info?.atAGlance?.transportAndOther?.transport?.parking?.map((item, index) => {
                                return <li className="list-disc pl-2" key={index}>{item.replace('<em>Free</em>', "")}</li>
                            })}
                            <li className="list-disc pl-2">{info?.hygieneAndCleanliness?.healthAndSafetyMeasures?.title}</li>
                            {info?.amenities[1]?.listItems[6]?.listItems?.map((item, index) => {
                                return <li className="list-disc pl-2" key={index}>{item}</li>
                            })}
                        </ul>
                        <div className="border-b my-7 md:mr-16" />
                    </section>

                    {/* you will love here section  */}
                    <section className="flex flex-col rounded-lg md:shadow-xl shadow-lg p-4 md:w-72 border md:my-7 mb-4 pt-5 pb-7 flex-grow">
                        <h2 className="font-poppins text-base md:text-xl mb-3 font-medium text-center">Why you’ll love it here</h2>
                        <div className="flex flex-col">
                            <div className="flex my-3 ">
                                <LocationMarkerIcon className="h-5 md:h-6 text-red-400 inline-flex pr-5 mt-1" />
                                <div className="flex flex-col ">
                                    <h1 className="font-poppins text-sm md:text-base font-normal">Great Location</h1>
                                    <p className="font-poppins text-xs  text-gray-600">90% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </div>
                            <div className="flex my-3 ">
                                <KeyIcon className="h-5 md:h-6 text-red-400 inline-flex pr-5 mt-1" />
                                <div className="flex flex-col ">
                                    <h1 className="font-poppins text-sm md:text-base font-normal">Great check-in experience</h1>
                                    <p className="font-poppins text-xs  text-gray-600">90% of recent guests gave the check-in process a 5-star rating.</p>
                                </div>
                            </div>
                            <div className="flex my-3 ">
                                <BookmarkIcon className="h-5 md:h-6 text-red-400 inline-flex pr-5 mt-1" />
                                <div className="flex flex-col ">
                                    <h1 className="font-poppins text-sm md:text-base font-normal">Pool</h1>
                                    <p className="font-poppins text-xs  text-gray-600">Guests often search for this popular amenity.</p>
                                </div>
                            </div>
                            <div className="flex my-3 ">
                                <WifiIcon className="h-5 md:h-6 text-red-400 inline-flex pr-5 mt-1" />
                                <div className="flex flex-col ">
                                    <h1 className="font-poppins text-sm md:text-base font-normal">Free Wifi</h1>
                                    <p className="font-poppins text-xs  text-gray-600">Guests have access to free wifi in rooms and public areas.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* hotel map section  */}

                <section className="flex flex-col  my-4 py-5 border-b ">
                    <h1 className="font-poppins text-lg md:text-2xl mb-5 font-medium">Where you'll be</h1>

                    <div className=" overflow-x-scroll md:overflow-hidden  max-w-full md:min-w-full md:h-[26rem] h-[20rem] mb-4 rounded-lg ">
                        <PropertyMap
                            lat={info?.pdpHeader?.hotelLocation?.coordinates?.latitude}
                            lon={info?.pdpHeader?.hotelLocation?.coordinates?.longitude}

                        />
                    </div>
                </section>

                {/* book now div */}

                {!booknowComponent ? <div className="hidden fixed bottom-4 right-2  shadow-md  bg-gradient-to-tr from-green-200 via-green-300 to-blue-500 text-gray-800 tracking-wide rounded-xl sm:flex items-center justify-center text-base font-poppins font-semibold cursor-pointer transition-all  z-[40] " onClick={() => setbooknowComponent(!booknowComponent)}>
                    <ChevronLeftIcon className="md:h-10 md:w-10 md:p-2 h-8 w-8 p-1.5 mx-3 my-3 cursor-pointer transition-all animate-pulse" />
                </div> :
                    <BooknowComponent toggler={setbooknowComponent} info={info} guests={guests} nights={editableNights} dates={daterange} changeNights={setEditableNights} id={id} title={title} />}

            </main>
            {!booknowComponent ? <div className="sm:hidden fixed bottom-0 flex items-center w-full  border-t border-gray-300 border-l-0 border-r-0 border-b-0 z-[40] transition-all bg-white px-6 py-4">
                <div className="flex flex-col flex-1 ">
                    <p className="text-black font-poppins  text-lg font-medium  tracking-wide  ">&#8377;{info?.propertyDescription.featuredPrice.currentPrice.plain * 72} <span className="text-gray-800 font-normal text-sm">/night</span></p>
                </div>
                <div className=" shadow-md py-3 bg-gradient-to-tr from-green-200 via-green-300 to-blue-500 text-gray-800 tracking-wide flex items-center justify-center text-sm font-poppins font-medium cursor-pointer transition-all px-4 rounded-xl" onClick={() => setbooknowComponent(!booknowComponent)}>
                    Reserve
                </div>
            </div> : <BooknowComponent toggler={setbooknowComponent} info={info} guests={guests} nights={editableNights} dates={daterange} changeNights={setEditableNights} id={id} title={title}/>}

            <Footer />

        </div>
    )
}

export default Property;

export async function getServerSideProps(context) {

    const propertyId = context.query.id;

    try {

        //api endpoint to fetch hotel photos 
        const response = await fetch(`https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=${propertyId}`, {
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
            ))
        ));

        // api endpoint to fetch hotel informaton 

        const response2 = await fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${propertyId}&currency=USD&locale=en_US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "112c0dc446mshc5baa3cd61a3329p1a751bjsn2ffdd8e3d45c",
                "x-rapidapi-host": "hotels4.p.rapidapi.com"
            }
        });
        const data2 = await response2.json();

        const propertyInfo = data2?.data?.body;

        return {
            props: {
                image: propertyImages,
                info: propertyInfo
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