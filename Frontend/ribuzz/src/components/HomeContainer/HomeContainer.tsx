import React from 'react';
import Image from 'next/image';
import { FaHome, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { PiCalendarStarFill } from 'react-icons/pi';
import { GiPencil, GiReceiveMoney, GiSandsOfTime } from 'react-icons/gi';
import { BsBuildings } from 'react-icons/bs';
import NewsletterSection from '../Newsletter/NewsLetterSection';

const HomeContainer: React.FC = () => {
  return (
    <div className="relative p-8">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/10.png"
          alt="Fondo de página"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      
      {/* Primera Sección */}
      <section className="flex flex-col md:flex-row items-center justify-center mb-16">
        <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center relative">
          {/* Imagen de fondo */}
          <Image
            src="/3.png"
            alt="Imagen descriptiva"
            width={600}
            height={500}
            className="rounded-lg shadow-lg"
          />
          {/* Imagen de tarjeta */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/card.png"
              alt="Imagen superpuesta"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center items-center">
          <div className="w-full flex justify-center mb-4">
            <Image
              src="/9.png"
              alt="Imagen descriptiva"
              width={600}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <p className="text-gray-300 text-center mb-6 text-2xl">
            Escalabilidad y acceso al mercado <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Entorno para hacer negocios <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Errores en gestión <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Acceso a capital
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center h-36 mb-16">
        <h2 className="text-center text-2xl md:text-4xl font-extralight mb-5" style={{ fontFamily: 'Moonhouse, sans-serif', color: '#DADDE8' }}>
          Conectando <span style={{ color: '#00e1d4' }}>Emprendedores</span> Apasionados con Oportunidades
        </h2>
        <p className="text-center text-lg md:text-2xl mt-4 mb-8" style={{ color: '#DADDE8' }}>
          Tu tarea es contar la historia detrás de tu sonrisa,<br />
          RiBuzz <span style={{ color: '#00e1d4' }}>conecta y crea para ti</span>
        </p>
      </section>
      <div className="my-10">
        <h1 className="text-center text-4xl md:text-7xl font-semibold mt-20" style={{ color: '#DADDE8' }}>
          Plataforma <span style={{ color: '#00e1d4' }}>integral</span>
        </h1>
      </div>
      {/* Segunda Sección */}
      <section className="text-2xl grid grid-cols-3 gap-4 mb-12 font-extralight hidden md:grid" style={{ color: '#DADDE8' }}>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center">
          <p className="text-[#00e1d4] text-center font-bold mb-4">Marketplace:</p>
          <p className="text-gray-300 text-center mb-4">Escalar ventas</p>
          <p className="text-gray-300 text-center mb-4">Unir emprendedor con clientes.</p>
        </div>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center mb-20">
          <div className="w-36 h-36 flex items-center justify-center border-4 border-white rounded-full">
            <FaHome className="text-8xl text-gray-100" />
          </div>
        </div>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center">
          <p className="text-[#00e1d4] text-center font-bold mb-4">Mentorías y asesorías:</p>
          <p className="text-gray-300 text-center">Errores de gestión</p>
        </div>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center pt-16">
          <div className="w-36 h-36 flex items-center justify-center border-4 border-white rounded-full">
            <PiCalendarStarFill className="text-8xl text-gray-100" />
          </div>
        </div>
        <div className="relative bg-transparent p-6 rounded-lg flex flex-col items-center">
          {/* Flechas */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10">
            <FaArrowUp className="text-white text-4xl" />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full z-10">
            <FaArrowDown className="text-white text-4xl" />
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 z-10">
            <FaArrowLeft className="text-white text-4xl" />
          </div>
          <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 z-10">
            <FaArrowRight className="text-white text-4xl" />
          </div>
          {/* Imagen */}
          <img
            src="/5.png"
            alt="Imagen descriptiva"
            className="my-10 w-44 flex items-center justify-center border-4 border-transparent rounded-full z-20 ml-4"
          />
        </div>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center pt-16">
          <div className="w-36 h-36 flex items-center justify-center border-4 border-white rounded-full">
            <GiPencil className="text-8xl text-gray-100" />
          </div>
        </div>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center">
          <p className="text-[#00e1d4] text-center font-bold mb-4">Eventos</p>
          <p className="text-gray-300 text-center">Fomentar entorno de negocios y networking</p>
        </div>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center mt-20">
          <div className="w-36 h-36 flex items-center justify-center border-4 border-white rounded-full">
            <FaPeopleGroup className="text-8xl text-gray-100" />
          </div>
        </div>
        <div className="bg-transparent p-6 rounded-lg flex flex-col items-center">
          <p className="text-[#00e1d4] text-center font-bold mb-4">Red de alto valor:</p>
          <p className="text-gray-300 text-center">Fomentar alianzas, inversiones y oportunidades</p>
        </div>
      </section>
      {/* Tercera Sección */}
      <section className="flex flex-col items-center justify-center bg-transparent py-2 px-4 md:px-10 lg:px-16">
        <div className="flex flex-row items-center justify-center space-x-10 mb-4 mt-10">
          <BsBuildings className="text-4xl md:text-8xl lg:text-9xl text-white" />
          <GiSandsOfTime className="text-4xl md:text-8xl lg:text-9xl text-white" />
          <GiReceiveMoney className="text-4xl md:text-8xl lg:text-9xl text-white" />
        </div>
        <p className="text-center text-sm md:text-base lg:text-3xl font-light text-[#DADDE8]">
          Empresa - <span className="text-[#00e1d4]">Valoración</span> - Inversores
        </p>
      </section>
      {/* Cuarta Sección */}
      <section className="flex flex-col justify-center items-center h-36 mb-16">
        <h2 className="text-center text-2xl md:text-4xl font-extralight mb-5" style={{ fontFamily: 'Moonhouse, sans-serif', color: '#DADDE8' }}>
          Regístrate
        </h2>
        <p className="text-center text-lg md:text-2xl mt-4 mb-8" style={{ color: '#DADDE8' }}>
          Inicia tu viaje para descubrir, conectar, y aprender con RiBuzz.<br />
          Accede a oportunidades para transformar tus ideas en negocios exitosos.
        </p>
        <NewsletterSection />
      </section>
    </div>
  );
};

export default HomeContainer;
