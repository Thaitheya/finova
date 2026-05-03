import Feedback from "@/components/Feedback"
import Navbar from "@/components/navbar"
import PrivacyPolicy from "@/components/PrivacyPolicy"
import Help from "@/components/Help"

const Landing = () => {
 
  return (
    <>
     <Navbar />
     <PrivacyPolicy />
     <Feedback />
     <Help />
    </>
    
  )
}

export default Landing