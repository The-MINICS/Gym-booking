import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { MemberInterface } from "@/interfaces/IMember";
import { GetMemberByMID } from "@/services/HttpClientService";
import { useEffect, useState } from "react";
import UserPhoto from '@/assets/UserProfile.png';
import AdminPhoto from '@/assets/AdministratorProfile.png';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

function Profile(){
    const navigate = useNavigate();
    const [members, setMembers] = useState<MemberInterface>({});
    const roles = localStorage.getItem("role");

    const GetMembers = async () => {
        let res = await GetMemberByMID();
        if (res) {
            setMembers(res);
        }
    };

    useEffect(() => {
        GetMembers();
    }, []);
    
    return (
    <div className="w-full">
        <motion.div className="mx-16 w-5/6 pt-10">
            {/* Header */}
            <motion.div
                className="md:w-3/5 mx-14"
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
                    <span className="text-red-500">Account Information</span>
                </HText>
            </motion.div>
        </motion.div>

        {/* Profile */}
        <motion.div
            className="mx-auto w-5/6 bg-pink-50 my-5 py-5 rounded-2xl"
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
                hidden: { opacity: 0, x:-50 },
                visible: { opacity: 1, x:-0 }
            }}
        >
            <div className="px-3 pt-3 flex items-center justify-center">
                {ImageOption()}
            </div>
            <h1 className="text-center text-base text-slate-500 font-semibold" >{members.Username} ({members.Role?.Role})</h1>
            <h1 className="font-medium text-slate-500 text-center text-base mb-2 italic">
                    Registration Date: {dayjs(members.Member_datetime).format('YYYY-MM-DD')}
            </h1>
            <div className="px-10 py-6 bg-slate-50 mx-40 rounded-3xl text-2xl">
                <div className="flex items-center justify-start">
                    <p className="px-3 py-2 font-semibold">FULL-NAME:</p>
                    <p className="px-3 py-2 font-base text-purple-800">{members.Firstname} {members.Lastname}</p>
                </div>
                <div className="flex items-center justify-start">
                    <p className="px-3 py-2 font-semibold">EMAIL:</p>
                    <p className="px-3 py-2 font-base text-purple-800">{members.Email}</p>
                </div>
                <div className="flex items-center justify-start">
                    <p className="px-3 py-2 font-semibold">GENDER:</p>
                    <p className="px-3 py-2 font-base text-purple-800">{members.Gender?.Gender}</p>
                </div>
                <div className="flex items-center justify-start">
                    <p className="px-3 py-2 font-semibold">AGE:</p>
                    <p className="px-3 py-2 font-base text-purple-800">{members.Age} years</p>
                </div>
                <div className="flex items-center justify-start">
                    <p className="px-3 py-2 font-semibold">WEIGHT:</p>
                    <p className="px-3 py-2 font-base text-purple-800">{members.Weight} kg.</p>
                </div>
                <div className="flex items-center justify-start">
                    <p className="px-3 py-2 font-semibold">HEIGHT:</p>
                    <p className="px-3 py-2 font-base text-purple-800">{members.Height} cm.</p>
                </div>
            </div>
            <div className="py-2 m-2 flex items-center justify-center gap-2">
                <button className="bg-yellow-500 text-white hover:bg-red-300 rounded p-2
                active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                    onClick={() => navigate({ pathname: `/account-setting` })}
                >
                    <EditIcon/> Account Settings
                </button>
            </div>
        </motion.div>
    </div>
  );

  function ImageOption() {
    if (roles === 'User') {
      return (
      <img className='w-36 h-36 mb-1' src={UserPhoto} alt='user-photo'/>
      )
    }
    if (roles === 'Admin') {
      return(
      <img className='w-36 h-36 mb-1' src={AdminPhoto} alt='admin-photo'/>
      )
    }
  }
}

export default Profile;