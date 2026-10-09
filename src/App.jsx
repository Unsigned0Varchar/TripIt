import './App.css'
import Hero from './components/custom/Hero'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react';

function App() {


  return (
    <>
       {/* Hero */}
       <Hero/>
       <Footer/>
       <Analytics />
    </>
  )
}

export default App;
