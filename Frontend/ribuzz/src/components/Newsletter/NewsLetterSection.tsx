'use client'
import React from 'react';

const NewsletterSection = () => {
    return (
        <section 
            className="bg-black bg-opacity-90 p-8 border-t border-gray-600 mx-auto" 
            style={{ 
                borderTopLeftRadius: '5rem', 
                borderTopRightRadius: '0.5rem', 
                borderBottomLeftRadius: '0.5rem', 
                borderBottomRightRadius: '5rem',
                fontFamily: 'Poppins, sans-serif' 
            }}
        >
            <div className="max-w-sm mx-auto text-center"> 
                <p className="text-[#DADDE8] text-lg mb-5"> 
                    Suscríbete a nuestro canal de información para obtener las últimas noticias de Ribuzz
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <input 
                        type="email" 
                        placeholder="tucorreo@mail.com" 
                        className="p-2 rounded-lg outline-none w-full md:w-auto bg-black border border-pink-400 border-opacity-50" 
                    />
                    <button 
                        className="p-3 md:p-3 text-sm md:text-base text-white font-light rounded-full bg-gradient-to-r from-[#C87DAB] to-[#C12886] shadow-md hover:shadow-lg transition-shadow"
                    >
                        <span className="inline-block transition duration-300 hover:scale-110">
                        Suscribirse
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;

