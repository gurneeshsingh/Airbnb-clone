import { ChevronLeftIcon } from "@heroicons/react/outline"
import { useEffect } from "react";
import ImageGallery from 'react-image-gallery';


const ImgComponent = ({ toggler, images }) => {

    const Photos = [];

    useEffect(() => {
        images.map((img) => Photos.push({
            original: img,
            thumbnail: img,
            originalClass:` mt-10 md:mt-0`
            
        }))
    }, [])

    return (
        <>

            <section className="flex flex-col h-full w-full  fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-[#FAF1ED]  opacity-100 z-[100] transition duration-500 ease-out ">
                <ChevronLeftIcon className='md:h-10 md:w-10 md:p-2 h-8 w-8 p-1.5 mx-3 my-3 hover:bg-gray-200 transition-all rounded-full cursor-pointer' onClick={() => toggler(false)} />
                <ImageGallery
                    items={Photos}
                    lazyLoad={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showThumbnails={false}
                />


            </section>
            {/* <div className="h-screen w-[100%] fixed top-0 bg-current opacity-70 z-50  " /> */}
        </>
    )
}

export default ImgComponent
