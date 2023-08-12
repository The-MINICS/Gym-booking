import Logo from "@/assets/HomePageText.png";

const Footer = () => {
  return (
    <footer className="bg-red-100 py-4 bottom-0">
      <div className="justify-content mx-auto w-5/6 gap-12 md:flex">
        <div className="mt-3 basis-1/2 md:mt-0">
          <img className="bg-auto" alt="logo" src={Logo} />
          {/* <p className="my-5">
          The MINICS Gym. The Place where you're gonna have a perfect body and sexy body, 
          The Place where you're gonna be healthy, 
          The Place where you're gonna be happy in everyday life.
          </p> */}
          <p className="text-red-500">©Minics All Rights Reserved.</p>
        </div>
        <div className="mt-3 md:mt-0">
          <h1 className="font-bold text-red-900">Presented By</h1>
          <p>Suranari University of Technology (SUT)</p>
        </div>
        <div className="mt-3 md:mt-0">
          <h1 className="font-bold text-red-900">Contact Us</h1>
          <p>111, ถนน มหาวิทยาลัย ตำบล สุรนารี อำเภอเมืองนครราชสีมา นครราชสีมา 30000</p>
          {/* <p>โทรศัพท์: 044-223427, โทรสาร: 044-223420</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;