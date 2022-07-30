import Image from 'next/image';
import { useRouter } from 'next/router';


const NavbarMinimal = () => {

    const router = useRouter();
    
    return <header className="z-40 grid  grid-cols-3 items-center shadow-md md:p-5 p-4 md:px-16 px-12  bg-white">
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
        <div className="relative  flex md:hidden h-10 items-center  my-auto " onClick={() => router.push('/')}>
            <Image
                className="cursor-pointer "
                width="60rem"
                height="40rem"
                src="/Images/logosmall.png"
                objectFit="contain"
                objectPosition="left"
            />
            
        </div>
    </header>;
};

export default NavbarMinimal;
