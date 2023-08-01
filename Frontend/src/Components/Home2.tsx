import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";
import HomePageGraphic from "@/assets/HomePageGraphic6.png"

function Home(){
  return (
  <div
    className="gap-16 bg-gray-50 pt-5 md:h-full md:pb-0 left-20">
    {/* Image and main header */}
    <motion.div 
      className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6">
      {/* IMAGE */}
      <div
          className="flex justify-center basis-2/5"
        >
          <img alt="home-pageGraphic" src={HomePageGraphic} />
      </div>
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
            <div>
              <img alt="home-page-text" src={HomePageText}/>
            </div>
          </div>
          <p className="mt-4 text-sm">
          Welcome to The MINICS Gym.
          <li>The Place where you're gonna have a perfect body and sexy body,</li>
          <li>The Place where you're gonna be healthy,</li>
          <li>The Place where you're gonna be happy in everyday life.</li>
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
          <button
            className="rounded-md bg-yellow-500 px-10 py-2 hover:bg-red-400
            hover:text-white active:scale-[.98] active:duration-75 transition-all"
            >
              Our Services
          </button>
        </motion.div>
      </div>
    </motion.div>
  </div>
  )
}

export default Home;