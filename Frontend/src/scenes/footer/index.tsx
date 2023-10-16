import Logo from "@/assets/HomePageText.png";

const Footer = () => {
  return (
    <footer className="bg-red-100 py-4">
      <div className="flex justify-center items-stretch gap-12 md:flex">
        <div className="basis-1/3 md:mt-0">
          <img className="bg-auto" alt="logo" src={Logo} />
          <p className="text-red-500 font-semibold">©Minics All Rights Reserved.</p>
        </div>
        <div className="md:mt-0">
          <h1 className="font-bold text-red-900">Presented By</h1>
          <li>Wongsadhorn Payungsakul</li>
          <li>Chonticha Vathayotha</li>
        </div>
        <div className="md:mt-0">
          <h1 className="font-bold text-red-900">Contact Us</h1>
          <p>Suranari University of Technology (SUT)</p>
          <p>111, ถนน มหาวิทยาลัย ตำบล สุรนารี อำเภอเมืองนครราชสีมา นครราชสีมา 30000</p>
          <p>โทรศัพท์: 044-223427, โทรสาร: 044-223420</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;