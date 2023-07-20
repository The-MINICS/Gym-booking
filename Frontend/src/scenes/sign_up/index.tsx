import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import HText from "@/shared/HText";
import { UserInterface } from '@/interfaces/IUser';
import { GenderInterface } from '@/interfaces/IGender';
import { ReservationInterface } from '@/interfaces/IReservation';
import { useEffect, useState } from 'react';
import Alert from '@/shared/Alert';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const SignUp = ({setSelectedPage}: Props) => {
    const [users, setUsers] = useState<UserInterface>();
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [reservations, setReservations] = useState<ReservationInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const apiUrl = "http://localhost:9999";

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof SignUp;
        const { value } = event.target;
        setUsers({ ...users, [id]: value });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
    };

    async function GetGenders() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/genders`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              return res.data;
            } else {
              return false;
            }
          });
      
        return res;
    }

    async function GetReservations() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/reservations`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              return res.data;
            } else {
              return false;
            }
          });
      
        return res;
    }

    async function Users(data: UserInterface) {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      
        let res = await fetch(`${apiUrl}/users`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              return res.data;
            } else {
              return false;
            }
          });
      
        return res;
    }

    // const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    //     props,
    //     ref
    //   ) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    // });

    // <div>
    //     <Alert type="error">An error occurred!</Alert>
    //     <Alert type="success">Success! Data saved.</Alert>
    // </div>

    const getGenders = async () => {
        let res = await GetGenders();
        if (res) {
            setGenders(res);
        }
    };

    const getReservations = async () => {
        let res = await GetReservations();
        if (res) {
            setReservations(res);
        }
    };

    useEffect(() => {
        getGenders();
        getReservations();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            User_fullname: users?.Fullname,
            User_email: users?.Gmail,
            User_username: users?.Username,
            User_password: users?.Password,
            User_age: users?.Age,
            User_Weight: users?.Weight,
            User_Height: users?.Height,
            ReservationID: convertType(users?.ReservationID),
            GenderID: convertType(users?.GenderID),
        };

        console.log(data)

        const apiUrl = "http://localhost:9999";
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      
        fetch(`${apiUrl}/users`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("Saved")
              setSuccess(true);
              setErrorMessage("")
              setTimeout(() => {
                window.location.href = "/users";
            }, 500);
            } else {
              console.log("Error!")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }


    return (
        <section id="signup" className="w-full">
            <motion.div className="mx-auto w-5/6 pt-24 pb-32"
                onViewportEnter={() => setSelectedPage(SelectedPage.SignUp)}>
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
                        <span className="text-red-500">WELCOME</span> TO OUR FAMILY
                    </HText>
                    <p className="my-5">
                    It's important to note that the fitness industry is constantly evolving, 
                    and new state-of-the-art gyms may emerge with even more advanced features in the future.
                    </p>
                </motion.div>

                {/* Fill the form */}
                
            </motion.div>
        </section>
    )
}

export default SignUp