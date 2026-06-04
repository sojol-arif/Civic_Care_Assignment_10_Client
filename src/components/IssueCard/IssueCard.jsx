import { Link } from 'react-router';
import { CiLocationOn } from "react-icons/ci";
import { SlideUp } from '../../hooks/reveal_awesome_animation_custom/ReactAnimation';

const IssueCard = ({ issue }) => {

    const { _id, title, description, image, category, location } = issue;
    return (
        <SlideUp>
            <div key={_id} className='issue_card rounded-[12px] overflow-hidden border border-[#bfc9c1] hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 relative'>
                <div >
                    <div>
                        <img className='max-h-[192px] w-full object-cover' src={image} alt={title} />
                        <span className='card-tag text-[12px] font-semibold px-3 py-[4px] card-tag-border-color card-tag-bg rounded-full absolute right-4 top-4'>{category}</span>
                    </div>
                    <div className='p-6'>
                        <h3 className='font-semibold text-[20px] mb-[4px]'>{title}</h3>
                        <p className='mb-4 text-[14px]'>{description}</p>
                        <div className='font-medium text-[14px] tracking-[0.01em] mb-4 flex items-center heading-font text-[14px]'><CiLocationOn className='text-[20px] mr-1' />
                            {location}</div>
                        <Link to={`/issueDetails/${_id}`} className='text-secondary border-secondary bg-card-btn btn w-full text-[14px] rounded-[8px] py-6'>See Details</Link>
                    </div>
                </div>
            </div>
        </SlideUp>

    );
};

export default IssueCard;