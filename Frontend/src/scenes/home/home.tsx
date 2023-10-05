import Carousel from "./carousel";
import img1 from "@/assets/HomePageGraphic1.png";
import img2 from "@/assets/HomePageGraphic2.png";
import img3 from "@/assets/HomePageGraphic3.png";
import img4 from "@/assets/HomePageGraphic4.png";
import { SelectedPage } from "@/shared/types";
import ActionButton from "@/shared/ActionButton";
import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

const Home1 = ( { setSelectedPage } : Props) => {
  const slides = [img1, img2, img3, img4];

  return <section id="home"
    className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
    {/* Image and main header */}
    <motion.div 
      className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6"
      onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
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
          <ActionButton setSelectedPage={setSelectedPage}>
            Join Now
          </ActionButton>
        </motion.div>
      </div>

      {/* Image */}
      <div className="flex basis-3/5 justify-center md:z-10
        md:ml-40 md:mt-20 md:justify-items-end">
        <Carousel 
        autoSlide={true}
        slides={slides} />
      </div>
    </motion.div>
  </section>;
}

export default Home1;