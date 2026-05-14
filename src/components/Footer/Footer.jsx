import { Link } from "react-router";
import { FaMedal, FaGlobe, FaEnvelope } from "react-icons/fa";


const Footer = () => {
    const links = <>
        <li> <Link to="/privacy-policy" className="color-nav">Privacy Policy</Link> </li>
        <li> <Link to="/terms-of-service" className="color-nav">Terms of Service</Link> </li>
        <li> <Link to="/contact-city-hall" className="color-nav">Contact City Hall</Link> </li>
        <li> <Link to="/accessibility" className="color-nav">Accessibility</Link> </li>
    </>

    const links2 = <>
        <li> <Link to="/help-center" className="color-nav">Help Center</Link> </li>
        <li> <Link to="/report-app-bug" className="color-nav">Report App Bug</Link> </li>
        <li> <Link to="/api-access" className="color-nav">Api Access</Link> </li>
    </>

    return (
        <footer className="bg-base-200 mt-14 md:mt-20">
            <div className="main-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-4">
                        <h3
                            className="text-xl font-bold heading-font">
                            CivicCare
                        </h3>
                        <p
                            className="text-sm leading-relaxed max-w-xs">
                            Empowering citizens to take charge of their environment.
                            CivicCare is a digital bridge between community needs and
                            administrative actions, fostering a cleaner, safer world for
                            everyone.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-2">
                            <FaMedal
                                className="text-xl cursor-pointer hover:text-primary transition-colors"
                            />
                            <FaGlobe
                                className="text-xl cursor-pointer hover:text-primary transition-colors"
                            />
                            <FaEnvelope
                                className="text-xl cursor-pointer hover:text-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Middle — Useful Links */}
                    <div className="flex flex-col gap-4">
                        <h6
                            className="text-xs font-bold tracking-widest uppercase heading-font"
                        >
                            Useful Links
                        </h6>
                        <ul className="flex flex-col gap-3">
                            {links}
                        </ul>
                    </div>

                    {/* Right — Support */}
                    <div className="flex flex-col gap-4">
                        <h6
                            className="text-xs font-bold tracking-widest uppercase heading-font">
                            Support
                        </h6>
                        <ul className="flex flex-col gap-3">
                            {links2}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div
                className="bottom_footer py-6">
                <p className="text-center text-sm">
                    © 2024 CivicCare Portal. All rights reserved. Built for community stewardship.
                </p>
            </div>

        </footer>
    );
};

export default Footer;