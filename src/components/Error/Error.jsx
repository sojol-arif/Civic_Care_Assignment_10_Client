import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';

const Error = () => {
    // Dynamically set the document title
    useDocumentTitle("404 Error Page");

    return (
        <div>
            <div className='flex items-center justify-center py-15 sm:py-20 md:py-40 px-5 mx-auto'>
                <div className='text-center'>
                    <h1 className='text-[48px] md:text-[56px] lg:text-[72px] font-bold mb-4'>404 - Page Not Found</h1>
                    <p className='text-lg'>The page you are looking for does not exist.</p>
                </div>
            </div>
        </div>
    );
};

export default Error;