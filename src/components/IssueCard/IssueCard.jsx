import { Link } from 'react-router';
import { CiLocationOn } from "react-icons/ci";
import { SlideUp } from '../../hooks/reveal_awesome_animation_custom/ReactAnimation';

const IssueCard = ({ issue }) => {

    const { _id, title, description, image, category, location } = issue;
    return (
        <SlideUp>
            <div key={_id} className='rounded-[12px] overflow-hidden border border-[#bfc9c1] hover:translate-y-[-4px] transition-all duration-300 relative'>
                <div >
                    <div>
                        <img className='max-h-[192px] w-full object-cover' src={image} alt={title} />
                        <span className='text-[12px] font-semibold px-3 py-[4px] bg-[#b1f0ce] rounded-full absolute right-4 top-4'>{category}</span>
                    </div>
                    <div className='p-6'>
                        <h3 className='font-semibold text-[24px] mb-[4px]'>{title}</h3>
                        <p className='mb-4'>{description}</p>
                        <div className='font-medium text-[14px] tracking-[0.01em] mb-4 flex items-center heading-font'><CiLocationOn className='text-[24px] ml-1' />
                            {location}</div>
                        <Link to={`/issueDetails/${_id}`} className='text-secondary border-secondary bg-transparent hover:bg-[#cde5ff] btn w-full text-[14px] rounded-[8px]'>See Details</Link>
                    </div>
                </div>
            </div>
        </SlideUp>

    );
};

export default IssueCard;