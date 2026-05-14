import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router";
import { SlideUp } from '../../hooks/reveal_awesome_animation_custom/ReactAnimation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <section>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative w-full h-[92vh] min-h-[580px] overflow-hidden">

                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1597668094841-6ed2b257d9d1?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Hero"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/55" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col
                      items-center justify-center text-center px-4">

                            {/* Eyebrow */}
                            <SlideUp delay={20} duration={250}>
                                <span className="inline-block border border-[#95d4b3] text-[#95d4b3]
                         bg-black/30 backdrop-blur-sm
                         text-[11px] font-semibold tracking-[0.2em] uppercase
                         px-5 py-2 rounded-full mb-8">
                                    Civic Engagement Platform
                                </span>
                            </SlideUp>

                            {/* Title */}
                            <SlideUp delay={50} duration={250}>
                                <h1 className="heading-font font-extrabold text-5xl md:text-7xl
                       leading-tight text-white mb-6">
                                    Clean Communities, <br />
                                    <span className="text-[#95d4b3]">Better Lives</span>
                                </h1>
                            </SlideUp>

                            {/* Description */}
                            <SlideUp delay={80} duration={250}>
                                <p className="text-white/75 text-base md:text-lg
                      max-w-2xl leading-relaxed mb-10">
                                    Join thousands of citizens reporting, tracking, and resolving
                                    local issues to build a more sustainable and beautiful
                                    neighborhood together.
                                </p>
                            </SlideUp>

                            {/* Buttons */}
                            <SlideUp delay={110} duration={250}>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <Link
                                        to="/report"
                                        className="bg-neutral text-neutral-content
                       rounded-xl px-8 py-3 text-sm font-semibold
                       hover:opacity-90 transition-all duration-200"
                                    >
                                        ⊕ Report an Issue
                                    </Link>

                                    <Link
                                        to="/map"
                                        className="bg-white/10 text-white
                       border border-white/30 backdrop-blur-sm
                       rounded-xl px-8 py-3 text-sm font-semibold
                       hover:bg-white/20 transition-all duration-200"
                                    >
                                        🗺 View Active Map
                                    </Link>
                                </div>
                            </SlideUp>

                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[92vh] min-h-[580px] overflow-hidden">

                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1638519930507-d1d809d7c949?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Hero"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/55" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col
                      items-center justify-center text-center px-4">

                            {/* Eyebrow */}
                            <span className="inline-block border border-[#95d4b3] text-[#95d4b3]
                         bg-black/30 backdrop-blur-sm
                         text-[11px] font-semibold tracking-[0.2em] uppercase
                         px-5 py-2 rounded-full mb-8">
                                Garbage & Waste Management
                            </span>

                            {/* Title */}
                            <h1 className="heading-font font-extrabold text-5xl md:text-7xl
                       leading-tight text-white mb-6">
                                Report Garbage <br />
                                <span className="text-[#95d4b3]">Clean Streets</span>
                            </h1>

                            {/* Description */}
                            <p className="text-white/75 text-base md:text-lg
                      max-w-2xl leading-relaxed mb-10">
                                Overflowing bins, illegal dumping, and missed collections are harming your neighborhood. Report garbage issues instantly and help keep Dhaka's streets clean and healthy for everyone.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    to="/report"
                                    className="bg-neutral text-neutral-content
                       rounded-xl px-8 py-3 text-sm font-semibold
                       hover:opacity-90 transition-all duration-200"
                                >
                                    ⊕ Report an Issue
                                </Link>

                                <Link
                                    to="/map"
                                    className="bg-white/10 text-white
                       border border-white/30 backdrop-blur-sm
                       rounded-xl px-8 py-3 text-sm font-semibold
                       hover:bg-white/20 transition-all duration-200"
                                >
                                    🗺 View Active Map
                                </Link>
                            </div>

                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[92vh] min-h-[580px] overflow-hidden">

                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1625314563148-572c6af9e9d5?q=80&w=1146&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Hero"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/55" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col
                      items-center justify-center text-center px-4">

                            {/* Eyebrow */}
                            <span className="inline-block border border-[#95d4b3] text-[#95d4b3]
                         bg-black/30 backdrop-blur-sm
                         text-[11px] font-semibold tracking-[0.2em] uppercase
                         px-5 py-2 rounded-full mb-8">
                                Sustainability Action
                            </span>

                            {/* Title */}
                            <h1 className="heading-font font-extrabold text-5xl md:text-7xl
                       leading-tight text-white mb-6">
                                Small Actions <br />
                                <span className="text-[#95d4b3]">Big Impact</span>
                            </h1>

                            {/* Description */}
                            <p className="text-white/75 text-base md:text-lg
                      max-w-2xl leading-relaxed mb-10">
                                Every report you make drives real environmental change. Reduce waste, protect green spaces, fix drainage issues, and help build a cleaner, greener, more sustainable Dhaka for future generations.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    to="/report"
                                    className="bg-neutral text-neutral-content
                       rounded-xl px-8 py-3 text-sm font-semibold
                       hover:opacity-90 transition-all duration-200"
                                >
                                    ⊕ Report an Issue
                                </Link>

                                <Link
                                    to="/map"
                                    className="bg-white/10 text-white
                       border border-white/30 backdrop-blur-sm
                       rounded-xl px-8 py-3 text-sm font-semibold
                       hover:bg-white/20 transition-all duration-200"
                                >
                                    🗺 View Active Map
                                </Link>
                            </div>

                        </div>

                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Banner;