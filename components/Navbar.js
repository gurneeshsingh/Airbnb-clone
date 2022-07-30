import Image from 'next/image';
import { SearchIcon, UserIcon, MenuAlt1Icon, UsersIcon, MinusCircleIcon, PlusCircleIcon, LoginIcon, HomeIcon, HeartIcon, LogoutIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';
import Loginbox from './Loginbox';
import Signupbox from './Signupbox';
import { useSession, signOut } from 'next-auth/react';


const Navbar = ({ placeholder }) => {

    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [loginoptiontoggle, setLoginoptiontoggle] = useState(false);
    const [loginbox, setLoginbox] = useState(false);
    const [signupbox, setSignupbox] = useState(false);
    const { data: session, status } = useSession();
    

    // next.js has inbuilt router so we import that and use it to route to diff pages 
    const router = useRouter();

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
        min: startDate
    }

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    function decreaseGuests() {
        if (numberOfGuests > 1) {
            setNumberOfGuests(numberOfGuests - 1)
        } else {
            setNumberOfGuests(1)
        }
    }
    function increaseguests() {
        setNumberOfGuests(numberOfGuests + 1)
    }

    function gotoSearchPage() {
        if (startDate && endDate) {
            router.push({
                pathname: '/search',
                query: {
                    location: searchInput,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    guests: numberOfGuests

                }
            })
            setSearchInput('')
        } else {
            alert('Select dates properly')
        }
    }

    function showLoginBox() {
        setLoginoptiontoggle(!loginoptiontoggle)
        setLoginbox(true)
        setSearchInput('')

    }
    function showSignupBox() {
        setLoginoptiontoggle(!loginoptiontoggle)
        setSignupbox(true)
        setSearchInput('')

    }

    useEffect(() => {
        if (loginbox || signupbox) {
            document.body.style.overflow = "hidden"


        } else {
            document.body.style.overflow = "auto"


        }
        return () => {
            document.body.style.overflow = "hidden"
            document.body.style.overflow = "auto"

        }
    }, [loginbox, signupbox])

    return (
        <>
            <header className="sticky top-0 z-40 grid grid-cols-4 md:grid-cols-3 items-center shadow-md p-5 md:px-16  bg-white">

                {/* left  */}
                <div className="relative  hidden md:flex h-10 items-center  my-auto " onClick={() => router.push('/')}>
                    <Image
                        className="cursor-pointer "
                        width="110rem"
                        height="60rem"
                        src="/Images/logobig.png"
                        objectFit="contain"
                        objectPosition="left"
                    />
                    
                </div>
                <div className="relative flex md:hidden h-10 items-center my-auto w-10 " onClick={() => router.push('/')}>
                    <Image
                        className="cursor-pointer "
                        src="/Images/logosmall.png"
                        height="45rem"
                        width="45rem"
                        objectFit="contain"
                        objectPosition="left"

                    />
                </div>


                {/* middle search bar  */}
                <div className="flex items-center border border-gray-300 rounded-full shadow-sm transition duration-200 hover:shadow-md py-2 col-span-2 md:col-span-1 ">

                    <input className="w-full py-2 pl-5 pr-5 md:pr-0 bg-transparent outline-none font-poppins text-xs md:text-sm tracking-wide text-gray-500 placeholder-red-400 flex-grow "
                        type="text"
                        placeholder={placeholder || "Start your search"}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} />

                    <SearchIcon className="hidden md:inline-flex h-7 p-1.5 bg-red-400 text-white rounded-full cursor-pointer md:mx-2" />
                </div>

                {/* right profile and menu  */}
                <div className="flex items-center space-x-2 md:space-x-6 justify-end">
                    <div className="flex items-center space-x-2 border-gray-300 border rounded-full p-1.5 hover:shadow-md" onClick={() => setLoginoptiontoggle(!loginoptiontoggle)}>
                        {!session ? <UserIcon className="h-4 md:h-5 cursor-pointer text-red-400" /> :
                                <Image src={session?.user.image} alt='user' objectFit='cover' width={30} height={30}  className='rounded-full'/>
                            }
                        <MenuAlt1Icon className="h-4 md:h-5 cursor-pointer text-red-400" />
                    </div>
                </div>
            </header>

            {loginoptiontoggle && (
                <div className="fixed md:w-48  w-40 rounded-lg shadow-xl top-[80px] md:right-14 right-5 z-50 bg-white  border border-gray-100 transition-all ease-out duration-500 flex flex-col items-start">
                    {(!session || status === 'unauthenticated') && <>
                        <p className="text-sm font-poppins text-gray-700 my-2 hover:bg-gray-100 cursor-pointer w-full p-3 rounded-lg flex items-center" onClick={showSignupBox} > <UserIcon className="h-5 text-red-400 mr-3" />Sign up</p>
                        <p className="text-sm font-poppins text-gray-700 my-2 hover:bg-gray-100 cursor-pointer w-full p-3 rounded-lg flex items-center" onClick={showLoginBox} ><LoginIcon className="h-5 text-red-400 mr-3" />Login</p>
                    </>}
                    {session &&
                        <>
                        <div className=' text-xs sm:text-sm font-poppins text-gray-700  hover:bg-gray-100 cursor-pointer w-full p-3 rounded-lg flex items-center transition-all' onClick={()=>router.push('/profile')}>
                            <Image src={session?.user?.image} alt='user' objectFit='cover' width={30} height={30} className='rounded-full' />
                            <p className='text-xs sm:text-sm font-poppins text-gray-500  hover:bg-gray-100 cursor-pointer w-full p-1.5 rounded-lg flex items-center'>{session?.user?.name }</p>
                        </div>

                            <p className="text-sm font-poppins text-gray-500 my-2 hover:bg-gray-100 cursor-pointer w-full p-3 rounded-lg flex items-center border-t border-gray-200 sm:border-t-0" onClick={() => signOut()}><LogoutIcon className="h-5 text-red-400 mr-3" />Signout</p>
                        </>
                    }
                </div>
            )}

            {loginbox && <Loginbox toggler={setLoginbox} />}
            {signupbox && <Signupbox toggler={setSignupbox} />}

            {searchInput && (

                <div className="flex flex-col rounded-xl shadow-xl my-3 w-[350px] md:w-max mx-auto  z-40  movingdown ">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        rangeColors={["#FF5A5F"]}
                        minDate={new Date()}
                        onChange={handleSelect}
                        className="md:mx-auto overflow-auto scroll_hidden rounded-xl z-40  "
                        showDateDisplay={false}

                    />
                    <div className="flex items-center  px-3 mb-4 py-1.5  ">
                        <h2 className="font-poppins text-sm font-medium tracking-wide md:text-base flex-grow text-gray-600 ">Number of Guests</h2>
                        <UsersIcon className="h-5  md:h-6 text-red-400 flex-grow" />
                        <button onClick={decreaseGuests} ><MinusCircleIcon className="h-6 md:h-7 text-red-400 active:scale-90 transition duration-200" /></button>
                        <p className="outline-none border-none w-9 h-9 p-1.5 bg-gray-100 text-gray-500 text-center mx-6">{numberOfGuests}</p>
                        <button onClick={increaseguests} ><PlusCircleIcon className="h-6 md:h-7 text-red-400 active:scale-90 transition duration-200 " /></button>
                    </div>
                    <div className="flex font-poppins  text-sm mt-3 mb-5">
                        <button className="flex-grow text-gray-500" onClick={() => setSearchInput('')}>Cancel</button>
                        <button className="text-red-400 flex-grow" onClick={gotoSearchPage} >Search</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar;


