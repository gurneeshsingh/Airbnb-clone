import Head from 'next/head';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import BigCard from '../components/BigCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';
import { exploredata } from '../exploredata';
import { destinations } from '../destinations';


export default function Home() {
  
 

  return (
    <div >
      <Head>
        <title>Airbnb-Home</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />
      <Banner />

      {/* now comes the main section and under this we we will create other sections  */}

      <main className=" px-8 sm:px-16 ">
        <section className="pt-16">
          <h1 className="text-3xl font-poppins font-semibold tracking-wide text-gray-800 ">Explore nearby</h1>

          <div className=" mt-6 grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 overflow-x-auto grid-flow-col sm:grid-flow-row grid-rows-2 scroll_hidden">
            {exploredata?.map((item, index) => (
              <SmallCard img={item.img}
                location={item.location}
                distance={item.distance}
                key={index}
                
              />
            ))}
          </div>
        </section>


        <section>
          <h1 className="text-3xl font-poppins font-semibold tracking-wide text-gray-800 mt-14">Destinations travellers love</h1>
          <div className="mt-6 flex overflow-scroll scroll_hidden sm:justify-between">
            {destinations?.map((item, index) => (
              <BigCard img={item.img}
                title={item.title}
                key={index}
              />
            ))}

          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Join for thrilling experiences around the globe"
          buttonText="Get Inspired"
          
        />


      </main>

      <Footer />
    </div>
  )
}

// here use the static rendering from the server , export an async function that will make the request 




