import 'tailwindcss/tailwind.css'
import './index.css';
import '../styles/global.css';
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';
import "react-image-gallery/styles/css/image-gallery.css";
import { SessionProvider } from 'next-auth/react';

// we have imported an npm package to make a progress bar in our app , we want the progress bar to be availabe in the entire app thats why we have included it in app.js file 

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-50',
  delay: 150
});

// now we have to connect the router to the progress bar , router has some events that we can tap into and connect the progress bar , we will connect for three events like for souter start, finish , error 

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);



function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
