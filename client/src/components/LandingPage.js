import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse, faClock, faBookmark } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[url('https://www.hospitalitynet.org/picture/153089023.jpg')] bg-cover bg-center text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4 text-shadow font-cursive">Welcome to Wema Hotel</h1>
        <p className="text-xl mb-8 text-shadow">Your next vacation starts here</p>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 font-cursive text-#9e4f4f">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Deluxe rooms",
                description: "",
                imgUrl: 'https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg', // Add the path to your images
                spec: [
                  { label: "Spacious Accommodations", value: "Enjoy larger rooms with luxurious furnishings and amenities." },
                  
                 
                ]
              },
              {
                title: "24-HR Room service",
                description: "Built with high-quality service for a lasting stay!",
                imgUrl: 'https://th.bing.com/th/id/OIP.Kdhel8ttIKL0d59I8D76HAHaE8?rs=1&pid=ImgDetMain', // Add the path to your images
                spec: [
                  { label: "Room Service", value: "Available 24/7 for all your dining and hospitality needs" },
                 
                ]
              },
              {
                title: "Perfect Fit",
                description: "Exceptional spas suited for couples",
                imgUrl: 'https://i.pinimg.com/originals/53/bf/fc/53bffc774772840dc0992d589e3e6e60.jpg', // Add the path to your images
                spec: [
                  { label: "Relaxation Suites", value: "Unwind in tranquil suites designed for ultimate comfort and peace." },
                 
                ]
              },
            ].map(({ title, description, imgUrl, spec }, index) => (
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105" key={index}>
                <img src={imgUrl} alt={title} className="w-full h-60 object-cover rounded-md mb-4" />
                <h3 className="font-semibold text-xl mb-2">{title}</h3>
                <p className="mb-4">{description}</p>
                <ul className="text-left">
                  {spec.map(({ label, value }) => (
                    <li key={label} className="mb-2">
                      <span className="font-bold">{label}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


    {/* Blog Section */}
<section className="py-20 bg-[#b44a4a]">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-10 text-white">From the Blog</h2>
    <p className="mb-8 text-white">Learn how to make the most of your vacation with expert advice.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { 
          date: 'Oct 20, 2023', 
          author: 'Michael Foster', 
          title: 'Maximize Your Vacation Experience', 
          imgUrl: 'https://th.bing.com/th/id/OIP.bf1Zl7crVOuGkIMTTIUjEQHaEo?rs=1&pid=ImgDetMain',
          url: 'https://www.allianztravelinsurance.com/travel/planning/plan-to-maximizing-vacation-time.htm'  // Add blog URLs
        },
        { 
          date: 'Oct 15, 2023', 
          author: 'Lindsay Walton', 
          title: 'Top 10 Tips for Finding Hidden Gems', 
          imgUrl: 'https://th.bing.com/th/id/OIP.QfYXVF-VMO1iDxX48Gta_gHaE8?w=3840&h=2560&rs=1&pid=ImgDetMain',
          url: 'https://www.offthebeatentravel.com/travel'  // Add blog URLs
        },
        { 
          date: 'Oct 10, 2023', 
          author: 'Tom Cook', 
          title: 'How to Get the Best Deals on Villa Rentals', 
          imgUrl: 'https://th.bing.com/th/id/OIP.IOuyDhdMmAQ_SGnfWWIM7wHaHa?rs=1&pid=ImgDetMain',
          url: 'https://www.igms.com/can-you-negotiate-airbnb/#:~:text=Guests%20are%20allowed%20to%20contact,top%20of%20a%20special%20offer.'  // Add blog URLs
        },
      ].map(({ date, author, title, imgUrl, url }) => (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105" key={title}>
          <img src={imgUrl} alt={title} className="w-full h-80 object-cover" />
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{date} · {author}</p>
            <h3 className="font-semibold text-xl mb-4">{title}</h3>

            {/* "Read More" anchor link */}
            <a href={url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Testimonials Section */}
<section className="py-20 bg-[url('https://img.freepik.com/premium-photo/modern-bedroom-interior-design-apartment-house-with-furniture-luxury-bedroom-scandinavian_326694-11434.jpg')]">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-10 text-white">We have worked with thousands of amazing people</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          quote: "Enjoyed every moment in my stay thank you Wema",
          author: "Leslie Alexander",
          username: "@lesliealexander",
          imgUrl: "https://media.istockphoto.com/id/1789982911/photo/office-professional-face-and-thinking-black-woman-bank-consultant-and-brainstorming-plan.webp?a=1&b=1&s=612x612&w=0&k=20&c=fH4yCyZA7O72IXhjGsEWfjoc7c-Pe0Y3sGvuLbcUXYQ=",
        },
        {
          quote: "Needed time with my husband away from the kids and work and the cottages at villabnb made the experience way better",
          author: "Lindsay Walton",
          username: "@lindsaywalton",
          imgUrl: "https://media.istockphoto.com/id/2158946263/photo/studio-shine-and-portrait-of-woman-touch-and-treatment-of-skincare-soft-and-glow-of-body-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=4-OWem1eIkEKsynrVjZVDywsMpR32J7-Rk_VAXXTDg8=",
        },
        {
          quote: "Got a break from work at villa and my it was amazing!!.",
          author: "Whitney Francis",
          username: "@whitneyfrancis",
          imgUrl: "https://randomuser.me/api/portraits/women/46.jpg",
        },
        {
          quote: "Not the vacay type but villa exceeded my expectations :).",
          author: "John Smith",
          username: "@johnsmith",
          imgUrl: "https://randomuser.me/api/portraits/men/47.jpg",
        },
        {
          quote: "Awesome services.",
          author: "Emily Johnson",
          username: "@emilyjohnson",
          imgUrl: "https://randomuser.me/api/portraits/women/48.jpg",
        },
        {
          quote: "Amazing experiences.",
          author: "Leonard Krasner",
          username: "@leonardkrasner",
          imgUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMGZhY2UlMjBibGFja3xlbnwwfHwwfHx8MA%3D%3D",
        },
      ].map(({ quote, author, username, imgUrl }) => (
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105" key={author}>
          <img src={imgUrl} alt={author} className="w-16 h-16 rounded-full mx-auto mb-4" />
          <p className="italic text-gray-600 mb-4">"{quote}"</p>
          <h4 className="font-semibold text-lg text-blue-600">{author}</h4>
          <p className="text-sm text-gray-500">{username}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Footer Section */}
<footer className="bg-[#b44a4a] text-white py-12">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* Logo and Tagline */}
    <div className="mb-6">
      <div className="flex items-center mb-4">
        {/* Logo */}
        <span className="text-4xl text-blue-400">
          <img 
          src={`${process.env.PUBLIC_URL}/wema.png`}
          alt="villabnb logo"
          
          />
        </span>
      </div>
      <p className="text-gray-400">Wema Hotel Mahali Pema</p>
    </div>
    
    {/* Solutions */}
    <div>
      <h5 className="text-lg font-semibold mb-4">Solutions</h5>
      <ul>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Marketing</a></li>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Analytics</a></li>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Commerce</a></li>
        <li><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Insights</a></li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h5 className="text-lg font-semibold mb-4">Support</h5>
      <ul>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Pricing</a></li>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Documentation</a></li>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Guides</a></li>
        <li><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">API Status</a></li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h5 className="text-lg font-semibold mb-4">WemaHotel</h5>
      <ul>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">About</a></li>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Blog</a></li>
        <li className="mb-2"><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Jobs</a></li>
        <li><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Press</a></li>
        <li><a href="https://www.instagram.com/airbnb/" className="hover:text-blue-400">Partners</a></li>
      </ul>
    </div>

    {/* Legal */}
    
  </div>

  {/* Social Media Links */}
  <div className="container mx-auto text-center mt-10">
    <div className="flex justify-center space-x-6">
      <a href="https://www.instagram.com/airbnb/" aria-label="Instagram" className="text-gray-400 hover:text-blue-400"><i className="fab fa-instagram">Wema_hotel</i></a>
      <a href="https://www.instagram.com/airbnb/" aria-label="X" className="text-gray-400 hover:text-blue-400"><i className="fab fa-x-twitter"></i></a>
     
      <a href="https://www.instagram.com/airbnb/" aria-label="YouTube" className="text-gray-400 hover:text-blue-400"><i className="fab fa-youtube"></i></a>
    </div>
  </div>

  <div className="container mx-auto text-center mt-8 text-gray-500">
    <p>© 2024 WemaHotel. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default LandingPage;
