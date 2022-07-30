import Image from "next/image"

const LargeCard = ({ img, title, description, buttonText }) => {
    return (
        <section className="relative my-10 cursor-pointer">
            <div className="relative h-80 w-100 rounded-xl">
                <Image
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                />
            </div>
            <div className="absolute top-20 left-12">
                <h3 className=" w-44 text-lg md:text-4xl font-poppins md:w-60 mb-2">{title}</h3>
                <p className="w-36 text-sm md:text-base font-poppins md:w-60">{description}</p>
                <button className="mt-4 md:px-4 md:py-3 px-3 py-2.5 text-white bg-gray-900 rounded-2xl text-xs md:text-sm cursor-pointer shadow-md hover:bg-red-400 hover:scale-105 transition transform ease-out duration-200">{ buttonText}</button>
            </div>
        </section>
    )
}

export default LargeCard
