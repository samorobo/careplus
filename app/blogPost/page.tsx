"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const blogs = [
  { question: "What Causes Cancer?", link: "https://stanfordhealthcare.org/medical-conditions/cancer/cancer/cancer-causes.html" },
  { question: "Symptoms of Malaria", link: "https://my.clevelandclinic.org/health/diseases/15014-malaria" },
  { question: "Hepatitis B", link: "https://my.clevelandclinic.org/health/diseases/4246-hepatitis-b" },
  { question: "Strategies to prevent heart disease", link: "https://www.mayoclinic.org/diseases-conditions/heart-disease/in-depth/heart-disease-prevention/art-20046502" },
  { question: "How to perform CPR", link: "https://www.medicalnewstoday.com/articles/324712" },
  { question: "Causes of Ulcer", link: "https://www.mayoclinic.org/diseases-conditions/peptic-ulcer/symptoms-causes/syc-20354223" },
  { question: "5 benefits of detoxing", link: "https://www.selahmedispa.com/blog/5-benefits-of-detoxing" },
  { question: "6 reasons why prenatal care is important", link: "https://ntmconline.net/6-reasons-why-prenatal-care-is-important/" },
  { question: "Blood sugar testing: Why, When, and How", link: "https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/blood-sugar/art-20046628" },
  { question: "Diabetes Management", link: "https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/diabetes-management/art-20047963" },
];

const BlogPost: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (link: string) => {
    if (link.startsWith("https")) {
      window.location.href = link;
    } else {
      router.push(link);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="relative flex items-center justify-between bg-gray-400 shadow px-4 py-4 rounded-lg mb-8">
          <Image 
            src="/assets/icons/logo-full.svg" 
            height={1000} width={1000} 
            alt="patient" 
            className="h-10 w-auto" 
          />
          <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
            <Link className="text-gray-700 hover:text-red-500" href='/'>Home</Link>
            <Link className="text-gray-700 hover:text-red-500" href='/'>Prev page</Link>
          </div>

          {/* Menu Button for Mobile View */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-14 right-4 bg-white shadow-lg rounded-lg p-4 w-40 z-10 sm:hidden">
              <Link
                href='/'
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href='/'
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Prev page
              </Link>
            </div>
          )}
        </header>

        <h3 className="text-center text-2xl font-semibold mb-6 text-gray-800">Get Your Latest, Helpful Health Tips</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white border p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2 text-gray-900">{blog.question}</h3>
              </div>
              <div className="flex justify-end mt-auto">
                <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => handleClick(blog.link)}>
                  Read Article
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
