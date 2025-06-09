import {assets, footerLinks} from "../assets/assets";
const Footer = () => {
    
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
           <div className="max-w-md text-gray-700">
  <img className="w-28 md:w-32 mb-4" src={assets.logo} alt="Logo" />
  <p className="text-sm md:text-base leading-relaxed">
    We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
  </p>
</div>


                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        <p className="py-6 text-center text-sm md:text-base text-gray-800 font-medium">
  &copy; {new Date().getFullYear()} Sujit. All rights reserved.
</p>


        </div>
    );
};
export default Footer;