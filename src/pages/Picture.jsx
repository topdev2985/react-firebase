import React from 'react';
import { Link } from 'react-router-dom';

export default function Picture(props) {
    return (
        <div className="relative flex flex-col items-center bg-white rounded m-4 mb-res">
            <div className=" md:w-60 md:max-w-60 mb-5  sm:max-w-52  sm:w-52  mb-h w-52">
                <Link to={`picdetail/${props.id}`} className="h-full w-full block">

                    <img src={props.item.imgurl} alt="/src/images/3.jpg" className="w-auto h-auto shadow-lg shadow-gray-500 absolute left-2/4 top-2/4" style={{ transform: 'translate(-50%,-60%)' }} data-aos="zoom-y-out" />

                </Link>
            </div>
            <h5 className="text-xl font-bold leading-snug tracking-tight mb-1" style={{ fontSize: '16px' }}><a href="#">{props.item.name}</a></h5>
            <p className="text-orange text-center">Canvas from <span className='text-linethrough text-dark'>${props.item.oldprice}</span> ${props.item.price}</p>
        </div>
    );
}