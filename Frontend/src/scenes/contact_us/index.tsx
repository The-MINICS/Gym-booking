import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { SelectedPage } from "@/shared/types";
import ContactUsPageGraphic from "@/assets/ContactUsPageGraphic.jpg"
import HText from "@/shared/HText";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const ContactUs = ({setSelectedPage}: Props) => {
    const inputStyles = `mb-3 w-full rounded-lg bg-red-400 px-5 py-3 placeholder-white`;
    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();
    const onSubmit = async (e: any) => {
        const isValid = await trigger();
        if (!isValid) {
            e.preventDefault();
        }
    }

    return (
    <section id="contactus" className="w-full bg-gray-20">
        <motion.div className="mx-auto w-5/6 pt-24 pb-32"
            onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}>
            {/* Header */}
            <motion.div
                className="md:w-3/5"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <HText>
                    <span className="text-red-500">CONTACT US</span>: YOURE PROBLEM IS UNDER OUR RESPONSIBILITY
                </HText>
                <p className="my-5">
                Recovery and Wellness Facilities: APC understands the importance of recovery 
                and offers facilities such as saunas, steam rooms, cryotherapy chambers, 
                and massage therapy to promote muscle relaxation, reduce soreness, 
                and enhance overall well-being.
                </p>
            </motion.div>

            {/* Form and image */}
            <div className="mt-10 justify-between gap-8 md:flex">
                <motion.div
                    className="mt-10 basis-3/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                <form
                    target="_blank"
                    onSubmit={onSubmit}
                    action="https://formsubmit.co/minics2001@gmail.com"
                    method="POST"
                    >
                        <input
                            className={inputStyles}
                            type="text"
                            placeholder="FULL-NAME"
                            {...register("name", {
                                required: true,
                                maxLength: 100,
                            })}
                        />
                            {errors.name && (
                                <p className="mt-1 text-red-500">
                                    {errors.name.type === "required" && "This field is required"}
                                    {errors.name.type === "maxLength" && "Max length is 100 charecters"}
                                </p>
                            )}

                        <input
                            className={inputStyles}
                            type="text"
                            placeholder="EMAIL"
                            {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />
                            {errors.email && (
                                <p className="mt-1 text-red-500">
                                {errors.email.type === "required" &&
                                    "This field is required."}
                                {errors.email.type === "pattern" && "Invalid email address."}
                                </p>
                            )}

                        <textarea
                            className={inputStyles}
                            placeholder="MESSAGE"
                            rows={4}
                            cols={50}
                            {...register("message", {
                                required: true,
                                maxLength: 5000,
                            })}
                        />
                        {errors.message && (
                            <p className="mt-1 text-red-500">
                                {errors.message.type === "required" && "This field is required."}
                                {errors.message.type === "maxLength" && "Max length is 5000 charactors."}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="mt-3 rounded-lg bg-yellow-400 px-20 py-3 transition duration-500 hover:text-white"
                        >
                            SUBMIT
                        </button>
                    </form>
                </motion.div>

                <motion.div
                    className="mt-16 basis-2/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 },
                    }}>
                    <div className="relative">
                        <div className="before:absolute before:-bottom-20 before:-right-10 
                            before:z-[-1] md:before:content-evolvetext">
                            <img
                                className="w-full rounded-lg bg-auto"
                                alt="contact-us-page-graphic"
                                src={ContactUsPageGraphic}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    </section>
  )
}

export default ContactUs