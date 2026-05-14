// src/components/CleanDrive.jsx
import { Link } from "react-router";
import { SlideUp } from "../../hooks/reveal_awesome_animation_custom/ReactAnimation";

export default function CallToAction() {
    return (
        <section className="section-space-sm pb-0">
            <div className="main-container">
                <div className="bg-[#2d6a4f] text-primary-content p-6 sm:p-10 md:p-14 rounded-3xl">
                    <div className="clean-drive-card grid grid-cols-1 md:grid-cols-2
                        gap-0 overflow-hidden gap-6 md:gap-10">

                        {/* Left — Image */}
                        <div className="clean-drive-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800"
                                alt="Volunteers"
                                className="w-full h-full object-cover object-center rounded-3xl"
                            />
                        </div>

                        {/* Right — Content */}
                        <div className="flex flex-col justify-center gap-6">

                            {/* Eyebrow */}
                            <SlideUp>
                                <p className="clean-drive-eyebrow">
                                    Make a Difference
                                </p>
                            </SlideUp>

                            {/* Title */}
                            <SlideUp delay={150}>
                                <h2 className="clean-drive-title text-primary-content">
                                    Join the Clean Drive
                                </h2>
                            </SlideUp>

                            {/* Description */}
                            <SlideUp delay={250}>
                                <p className="clean-drive-desc">
                                    Become a CivicCare steward. Join local clean-up events,
                                    organize neighborhood drives, and earn community
                                    recognition badges for your contributions.
                                </p>
                            </SlideUp>

                            {/* Buttons */}
                            <SlideUp delay={350}>
                                <div className="flex flex-wrap gap-4 mt-4">

                                    {/* Primary — dark green filled */}
                                    <Link
                                        to="/volunteer"
                                        className="bg-neutral text-neutral-content btn border-none shadow-none"
                                    >
                                        Sign Up as Volunteer
                                    </Link>

                                    {/* Secondary — outline */}
                                    <Link
                                        to="/volunteer"
                                        className="bg-transparent border border-primary-content text-primary-content btn shadow-none"
                                    >
                                        Learn More
                                    </Link>

                                </div>
                            </SlideUp>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}