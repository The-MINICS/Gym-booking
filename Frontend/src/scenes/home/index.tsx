import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";
import HomePageGraphic from "@/assets/HomePageGraphic.png"

function Home(){

  return (
  <div
    className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
    {/* Image and main header */}
    <motion.div 
      className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6">
      {/* Main Header */}
      <div className="z-10 mt-32 md:basis-3/5">
        {/* Headings */}
        <motion.div 
          className="md:-mt-20" 
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x:-50 },
            visible: { opacity: 1, x:-0 }
          }}>
          <div className="relative">
            <div className="before:absolute before:-top-20 before:-left-20 
            before:z-[-1] md:before:content-evolvetext">
              <img alt="home-page-text" src={HomePageText}/>
            </div>
          </div>
          <p className="mt-8 text-sm">
          Welcome to The MINICS Gym.
          The Place where you're gonna have a perfect body and sexy body,
          The Place where you're gonna be healthy,
          The Place where you're gonna be happy in everyday life.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="mt-8 flex items-center gap-8"
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x:-50 },
            visible: { opacity: 1, x:-0 }
          }}>
          <button >
            Book Now
          </button>
        </motion.div>
      </div>
      {/* IMAGE */}
      <div
          className="flex basis-3/5 justify-center md:z-10
              md:ml-40 md:mt-16 md:justify-items-end"
        >
          <img alt="home-pageGraphic" src={HomePageGraphic} />
        </div>
    </motion.div>
  </div>
  )
}

export default Home;