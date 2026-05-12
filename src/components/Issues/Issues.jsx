import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
    const { _id, title, price_min, price_max, image } = product;

    return (
        <div className='rounded-[8px] hover:shadow-[0_10px_20px_-12px_rgba(0,0,0,0.10)] p-[15px] transition-all duration-300 bg-[#fff]'>
            <div>
                <figure><img src={image} alt={image} className='rounded-[8px]' /></figure>
                <div className='product_content'>
                    <h3 className='font-medium text-[24px] text-[#001931] mt-3'>{title}</h3>
                    <div className='font-semibold gradient-text text-[20px] mt-1.5 mb-2'>${price_min}-{price_max}</div>
                    <div className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] inline-block w-full rounded-[4px]">
                        <Link to={`/productDetails/${_id}`} className='font-semibold border border-primary text-primary rounded-[4px] flex justify-center py-2 bg-[#fff] rounded-[4px]'> View Details </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;