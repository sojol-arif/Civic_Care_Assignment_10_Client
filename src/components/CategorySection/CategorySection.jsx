import { Link } from "react-router";
import { FaTrash, FaRoad, FaWrench, FaHardHat } from "react-icons/fa";
import { SlideUp } from '../../hooks/reveal_awesome_animation_custom/ReactAnimation';

const categories = [
    {
        id: 1,
        icon: <FaTrash />,
        name: "Garbage",
        ongoing: 124,
        to: "/issues?category=garbage",
    },
    {
        id: 2,
        icon: <FaHardHat />,
        name: "Illegal Construction",
        ongoing: 89,
        to: "/issues?category=illegal-construction",
    },
    {
        id: 3,
        icon: <FaWrench />,
        name: "Broken Public Property",
        ongoing: 42,
        to: "/issues?category=broken-public-property",
    },
    {
        id: 4,
        icon: <FaRoad />,
        name: "Road Damage",
        ongoing: 15,
        to: "/issues?category=road-damage",
    },
];


const CategorySection = () => {
    return (
        // src/components/IssueCategories.jsx

        <section className="section-space">
            <div className="main-container">

                {/* Header Row */}
                <SlideUp>
                    <div className="flex items-start justify-between mb-10 flex-wrap gap-3">

                        {/* Left */}
                        <div>
                            <h2 className="font-bold heading-font">
                                Issue Categories
                            </h2>
                            <p className="text-sm mt-1">
                                Select a category to view active reports or file a new one.
                            </p>
                        </div>

                        {/* Right */}
                        <Link
                            to="/issues"
                            className="text-sm font-semibold link-view-all-color
                         hover:opacity-80 transition-all duration-200
                         flex items-center gap-1 whitespace-nowrap mt-1"
                        >
                            View all categories →
                        </Link>

                    </div>
                </SlideUp>

                {/* Cards Grid */}
                <SlideUp cascade damping={0.12}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={cat.to}
                                className="category-card_custom"
                            >
                                {/* Icon Box */}
                                <div className="category-icon-box max-w-max bg-primary/20 inline-flex items-center justify-center rounded p-2">
                                    <span className="text-xl">{cat.icon}</span>
                                </div>

                                {/* Text */}
                                <div className="mt-4">
                                    <h3 className="text-base font-semibold mb-1">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm font-[12px]">
                                        {cat.ongoing} ongoing
                                    </p>
                                </div>

                            </Link>
                        ))}
                    </div>
                </SlideUp>

            </div>
        </section>
    );
};

export default CategorySection;