import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/outline"
import { StarIcon } from "@heroicons/react/solid";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState, useEffect } from 'react';
import { format, differenceInCalendarDays, addDays } from "date-fns";
import { useRouter } from 'next/router';


const BooknowComponent = ({ toggler, info, guests, nights, dates, changeNights, id, title}) => {

    const router = useRouter();
    const [editableStartDate, setEditableStartDate] = useState(format(new Date(dates.split('-')[0]), 'yyyy-MM-dd'));
    const [editableEndDate, setEditableEndDate] = useState(format(new Date(dates.split('-')[1]), 'yyyy-MM-dd'));
    const [nextDate, setNextDate] = useState(null);

    let today = format(new Date(), 'yyyy-MM-dd');

    useEffect(() => {
        let nextDay = addDays(new Date(editableStartDate), 1)
        setNextDate(format(new Date(nextDay), 'yyyy-MM-dd'))
    }, [editableStartDate])


    useEffect(() => {
        const newNights = differenceInCalendarDays(new Date(editableEndDate), new Date(editableStartDate));
        changeNights(newNights)
    }, [editableStartDate, editableEndDate]);


    function gotoConfirmPage(id, info) {
        if (nights >= 1) {
            router.push({
                pathname: `/property/${id}/confirm`,
                query: {
                    startDate: editableStartDate,
                    endDate: editableEndDate,
                    guests: guests,
                    nights: nights,
                    title: title,
                    price:Math.ceil(info?.propertyDescription?.featuredPrice?.currentPrice.plain * 70)
                }
            })
        } else {
            alert('Please select dates properly')
        }
    };
   
    return (
        <>
            {/* big screens  */}

            <div className="hidden fixed bottom-4 right-16 shadow-lg  text-gray-800 tracking-wide rounded-xl md:flex flex-col bg-white  text-base font-poppins font-semibold  transition-all z-[40] w-96 border border-gray-300">
                <ChevronRightIcon className='sm:h-10 sm:w-10 sm:p-2 h-8 w-8 p-1.5 mx-3 my-3 hover:bg-gray-200 transition-all rounded-full cursor-pointer ' onClick={() => toggler(false)} />
                <div className="w-[86%] mx-auto flex mb-3">
                    <p className="text-black font-poppins  text-lg font-medium  tracking-wide flex-1 ">&#8377;{Math.ceil(info?.propertyDescription.featuredPrice.currentPrice.plain * 70)} <span className="text-gray-800 font-normal text-sm">/night</span></p>
                    <div className="flex flex-1 items-center space-x-2">
                        <StarIcon className="h-5 text-red-400 " />
                        <p className="text-gray-900 text-[13px] font-medium font-poppins">{info?.guestReviews.brands.rating || 7.0} | </p>
                        <p className="text-gray-900 text-[13px] font-medium font-poppins">{info?.guestReviews.brands.total} reviews</p>
                    </div>
                </div>
                {/* date selection div  */}
                <div className="flex items-center w-[86%] mx-auto  border-t border-l border-r border-b-0 border-[1px] border-gray-300 rounded-t-xl h-14">
                    <span className="flex-1 border-r border-t-0 border-b-0 border-l-0 border-gray-300 border-[1px] h-full flex flex-col px-3 py-2">
                        <p className="text-[.70rem] font-poppins font-semibold">CHECK-IN</p>
                        <input name="startDate" type='date' min={today} value={editableStartDate} onChange={(e) => setEditableStartDate(e.target.value)} className="text-xs text-gray-700 focus:text-red-400 font-poppins font-light -mt-1 cursor-pointer" ></input>
                    </span>
                    <span className="flex-1 h-full flex flex-col px-3 py-2">
                        <p className="text-[.70rem] font-poppins font-semibold">CHECKOUT</p>
                        <input name='endDate' type='date' value={editableEndDate} min={nextDate} onChange={(e) => setEditableEndDate(e.target.value)} className="text-xs text-gray-700 focus:text-red-400 font-poppins font-light -mt-1 cursor-pointer" ></input>
                    </span>
                </div>
                <div className="flex items-center w-[86%] mx-auto  border-b border-l border-r  border-[1px] border-gray-300 rounded-b-xl h-14 mb-3 py-2 px-3">
                    <p className="text-[.70rem] font-poppins font-semibold flex-grow">GUESTS</p>
                    <p className="text-sm text-gray-700 font-poppins font-light items-center text-center ">{guests} {guests <= 1 ? `guest` : `guests`}</p>
                </div>

                {/* reserve button  */}
                <button className="w-[86%] mx-auto text-center flex items-center justify-center h-12  bg-gradient-to-tr from-green-200 via-green-300 to-blue-500 rounded-lg mt-2 mb-2 font-poppins font-medium shadow-sm" onClick={()=>gotoConfirmPage(id,info)}>Reserve</button>
                <p className="text-center text-gray-800 font-extralight text-sm font-poppins mb-3">You wont be charged yet.</p>

                {/* amount section  */}
                {nights>=1 ?<div>
                    <div className="w-[86%] mx-auto flex items-center mt-3">
                        <p className="flex-grow font-light  text-gray-600 underline text-[15px] font-poppins">&#8377;{`${Math.ceil(info?.propertyDescription.featuredPrice.currentPrice.plain * 70)} x ${nights}  ${nights <= 1 ? `night` : `nights`}`}</p>
                        <p className="font-normal text-black text-[15px] font-poppins">&#8377;{Math.ceil(info?.propertyDescription.featuredPrice.currentPrice.plain * 70) * nights}</p>
                    </div>
                    <div className="w-[86%] mx-auto flex items-center mt-2 pb-4 mb-4 border-b border-gray-300">
                        <p className="flex-grow font-light  text-gray-600 underline text-[15px] font-poppins">Special offer</p>
                        <p className="font-normal text-black text-[15px] font-poppins">- &#8377; 0</p>
                    </div>
                    <div className="w-[86%] mx-auto flex items-center mb-4">
                        <p className="flex-grow font-medium  text-gray-900  text-base font-poppins">Total</p>
                        <p className="font-medium text-gray-900 text-base font-poppins"> &#8377; {Math.ceil(info?.propertyDescription.featuredPrice.currentPrice.plain * 70) * nights}</p>
                    </div>
                </div> : 
                <p className="w-[86%] mx-auto text-center flex justify-center items-center text-sm font-poppins font-medium h-28 text-red-400">Checkout date can't preceed Check-In date</p>}

            </div>



            {/* mobile devices  */}

            <div className=" sm:hidden fixed top-[50%] left-[50%] trasform translate-x-[-50%] translate-y-[-50%] py-3  text-gray-800 tracking-wide flex flex-col   text-sm font-poppins font-semibold transition-all  z-[40] w-full h-full bg-white shadow-xl border-t border-gray-300 overflow-y-hidden">
                <ChevronDownIcon className=' h-9 w-9 p-1.5 mx-3 my-3 hover:bg-gray-200 transition-all rounded-full cursor-pointer ' onClick={() => toggler(false)} />
                <p className="w-[90%] mx-auto font-poppins  text-xl font-medium mb-6 mt-4">Your trip</p>
                <div className="flex items-center w-[90%] mx-auto  border-t border-l border-r border-b-0 border-[1px] border-gray-300 rounded-t-xl h-14">
                    <span className="flex-1 border-r border-t-0 border-b-0 border-l-0 border-gray-300 border-[1px] h-full flex flex-col px-3 py-2">
                        <p className="text-[.65rem] font-poppins font-semibold">CHECK-IN</p>
                        <input name="startDate" type='date' value={editableStartDate} min={today} onChange={(e) => setEditableStartDate(e.target.value)} className="text-xs text-gray-700 focus:text-red-400 font-poppins font-light "></input>
                    </span>
                    <span className="flex-1 h-full flex flex-col px-3 py-2">
                        <p className="text-[.65rem] font-poppins font-semibold">CHECKOUT</p>
                        <input name="endDate" type='date' value={editableEndDate} min={nextDate} onChange={(e) => setEditableEndDate(e.target.value)} className="text-xs text-gray-700 focus:text-red-400 font-poppins font-light "></input>
                    </span>
                </div>
                <div className="flex items-center w-[90%] mx-auto  border-b border-l border-r  border-[1px] border-gray-300 rounded-b-xl h-14 mb-3 py-2 px-3">
                    <p className="text-[.65rem] font-poppins font-semibold flex-grow">GUESTS</p>
                    <p className="text-xs text-gray-700 font-poppins font-light items-center text-center ">{guests} {guests <= 1 ? `guest` : `guests`}</p>
                </div>
                <div className="w-[90%] mx-auto flex items-center mt-9">
                    <p className="flex-grow font-light  text-gray-600 underline text-[15px] font-poppins">&#8377;{`${Math.ceil(info?.propertyDescription.featuredPrice.currentPrice.plain * 70)} x ${nights}  ${nights <= 1 ? `night` : `nights`}`}</p>
                    <p className="font-normal text-black text-[15px] font-poppins">&#8377;{Math.ceil(info?.propertyDescription.featuredPrice.currentPrice.plain * 70)}</p>
                </div>
                <div className="w-[90%] mx-auto flex items-center mt-2 pb-4 mb-4 border-b border-gray-300">
                    <p className="flex-grow font-light  text-gray-600 underline text-[15px] font-poppins">Special offer</p>
                    <p className="font-normal text-black text-[15px] font-poppins">- &#8377; 0</p>
                </div>
                <div className="w-[90%] mx-auto flex items-center mb-4">
                    <p className="flex-grow font-medium  text-gray-900  text-base font-poppins">Total</p>
                    <p className="font-medium text-gray-900 text-base font-poppins"> &#8377; {Math.ceil(info?.propertyDescription.featuredPrice.currentPrice.plain * 70) * nights}</p>
                </div>

                {/* reserve button  */}
                <div className="fixed bottom-0 flex items-center justify-center text-center w-full py-4 border-t border-gray-300  ">

                    <button className=" flex items-center justify-center text-center bg-gradient-to-tr from-green-200 via-green-300 to-blue-500 text-gray-900 tracking-wide w-[90%] mx-auto rounded-lg py-4 font-poppins font-medium" onClick={()=>gotoConfirmPage(id, info)}>Reserve</button>
                </div>
            </div>

        </>
    )
}

export default BooknowComponent
