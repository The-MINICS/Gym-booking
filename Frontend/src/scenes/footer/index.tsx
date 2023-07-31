import Logo from "@/assets/HomePageText.png";

const Footer = () => {
  return (
    <footer className="bg-red-100 py-4">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img className="bg-auto" alt="logo" src={Logo} />
          {/* <p className="my-5">
          The MINICS Gym. The Place where you're gonna have a perfect body and sexy body, 
          The Place where you're gonna be healthy, 
          The Place where you're gonna be happy in everyday life.
          </p> */}
          <p className="text-red-500">©Minics All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h1 className="font-bold text-red-900">Links</h1>
          <li>Wongsadhorn Payungsakul</li>
          <li>Minighan Minic</li>
          <p>Suranari University of Technology (SUT)</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h1 className="font-bold text-red-900">Contact Us</h1>
          <p>111, ถนน มหาวิทยาลัย ตำบล สุรนารี อำเภอเมืองนครราชสีมา นครราชสีมา 30000</p>
          <p>โทรศัพท์: 044-223427, โทรสาร: 044-223420</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;