import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { MemberInterface } from "@/interfaces/IMember";
import { GetMemberByMID } from "@/services/HttpClientService";
import UserPhoto from '@/assets/UserProfile.png';
import AdminPhoto from '@/assets/AdministratorProfile.png';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


function AccountSettings(){
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
    <>
    <div className="w-full">
        <motion.div className="w-full py-3 my-2 mx-16 pl-3">
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
                    <span className="text-red-500">ACCOUNT SETTINGS</span>
                </HText>
            </motion.div>
        </motion.div>
        <div className="bg-slate-50 mx-20 my-2 pl-3 py-2 shadow rounded flex flex-col ">
            {/* Image located on left side */}
            <div className="bg-white w-1/4">
                {ImageOption()}
                <h1 className="text-center font-semibold text-2xl">{members.Firstname} {members.Lastname}</h1>
                <h1 className="text-center font-medium text-base text-slate-300">{members.Username}</h1>
                <div>
                    <ul>
                        <li className="p-1 my-2 mx-2 px-2 cursor-pointer hover:bg-yellow-500 rounded">
                            <Link className="flex items-center justify-normal font-semibold text-lg" to="">
                                <ManageAccountsIcon/> Account Informaion
                            </Link>  
                        </li>
                        <li className="p-1 my-2 mx-2 px-2 cursor-pointer hover:bg-yellow-500 rounded">
                            <Link className="flex items-center justify-normal font-semibold text-lg" to="">
                                <KeyIcon/> Change My Password
                            </Link>   
                        </li>
                        <li className="p-1 my-2 mx-2 px-2 cursor-pointer hover:bg-yellow-500 rounded">
                            <Link className="flex items-center justify-normal font-semibold text-lg" to="">
                                <HeartBrokenIcon/> Deactivation Account
                            </Link>   
                        </li>
                        <li className="p-1 my-2 mt-44 mx-2 px-2 cursor-pointer hover:bg-yellow-500 rounded">
                            <Link className="flex items-center justify-normal font-semibold text-lg" to="">
                                <LogoutIcon/> Sign Out
                            </Link>   
                        </li>
                    </ul>
				</div>
            </div>
            <div className="bg-white w-3/4 mt-10 hover:bg-yellow-500">
                <p>Information</p>
            </div>
        </div>
    </div>
    </>
    );

    function ImageOption() {
        if (roles === 'User') {
          return (
          <img className='w-36 h-36 ml-20 mb-2 mt-4' src={UserPhoto} alt='user-photo'/>
          )
        }
        if (roles === 'Admin') {
          return(
          <img className='w-36 h-36 ml-20 mb-2 mt-4' src={AdminPhoto} alt='admin-photo'/>
          )
        }
      }
}

export default AccountSettings; 