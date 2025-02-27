import Link from "next/link";

const Home = () => (
  <section className="w-full flex-col bg-gray-900 min-h-screen p-8 mt-16">
    {/* Hero Section */}
    <section className="text-center mb-12">
      <h1 className="head_text text-5xl font-bold text-white mb-4">
        <span className="text-white"> Welcome to </span>
        <span className="blue_gradient">Dern Security</span>
      </h1>
      <p className="desc text-lg text-gray-300 max-w-2xl mx-auto">
        At Dern Security, we specialize in providing top-notch security
        solutions and PC repair services. Our expert technicians are dedicated
        to ensuring your devices are safe and running smoothly. Whether you need
        virus removal, hardware upgrades, or complete system overhauls, we've
        got you covered. Trust Dern Security for all your PC repair needs!
      </p>
    </section>

    {/* Services Section */}
    <section className="services grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white p-8 bg-gray-800 rounded-lg shadow-xl mb-12">
      <h2 className="sub_head_text text-2xl font-bold mb-4 text-blue-400 col-span-full">
        Our Services
      </h2>
      <ul className="list-none col-span-full">
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">Virus Removal</h3>
          <p className="text-gray-300">
            Our advanced virus detection tools and expert technicians ensure
            your system is free from malware, spyware, and ransomware. We
            provide a thorough cleanup and preventive measures to keep your
            devices secure.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mt-4">
          <h3 className="text-xl font-semibold mb-2">Hardware Upgrades</h3>
          <p className="text-gray-300">
            Boost your system's performance with our hardware upgrade services.
            From installing faster SSDs to adding more RAM, we ensure your
            device runs at peak efficiency.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mt-4">
          <h3 className="text-xl font-semibold mb-2">
            Complete System Overhauls
          </h3>
          <p className="text-gray-300">
            Is your system running slow or crashing frequently? We offer full
            system diagnostics, optimization, and restoration services to bring
            your device back to life.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mt-4">
          <h3 className="text-xl font-semibold mb-2">
            24/7 Security Monitoring
          </h3>
          <p className="text-gray-300">
            Our round-the-clock monitoring ensures your systems are protected
            from threats at all times. We provide real-time alerts and rapid
            response to any security breaches.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mt-4">
          <h3 className="text-xl font-semibold mb-2">Consultation Services</h3>
          <p className="text-gray-300">
            Not sure what your system needs? Our experts will assess your setup
            and provide tailored recommendations to enhance your security and
            performance.
          </p>
        </li>
      </ul>
    </section>

    {/* Why Choose Us Section */}
    <section className="why-choose-us text-white mb-12 p-8 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="sub_head_text text-2xl font-bold mb-4 text-blue-400">
        Why Choose Us?
      </h2>
      <p className="text-lg text-gray-300 mb-4">
        At Dern Security, we understand that your devices and data are critical
        to your personal and professional life. That's why we go above and
        beyond to deliver exceptional service. Here's what sets us apart:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-300">
        <li className="mb-2">
          <strong>Expert Technicians</strong>: Our team consists of certified
          professionals with years of experience in cybersecurity and PC repair.
        </li>
        <li className="mb-2">
          <strong>Cutting-Edge Technology</strong>: We use the latest tools and
          techniques to ensure your systems are secure and optimized.
        </li>
        <li className="mb-2">
          <strong>Personalized Solutions</strong>: Every client is unique, and
          we tailor our services to meet your specific needs.
        </li>
        <li className="mb-2">
          <strong>24/7 Support</strong>: We're always here to help, no matter
          the time or day.
        </li>
        <li className="mb-2">
          <strong>Affordable Pricing</strong>: We offer competitive rates
          without compromising on quality.
        </li>
      </ul>
    </section>

    {/* Contact Us Section */}
    <section className="contact-us text-white p-8 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="sub_head_text text-2xl font-bold mb-4 text-blue-400">
        Contact Us
      </h2>
      <p className="text-lg text-gray-300 mb-4">
        Ready to take the next step in securing your devices? Contact us today!
        Our team is here to answer your questions, assess your needs, and
        provide the best solutions for your security and repair requirements.
      </p>
      <p className="text-lg text-gray-300 mt-4">
        We look forward to assisting you and ensuring your peace of mind with
        our reliable and professional services.
      </p>
      <div className="mt-4">
        <Link
          href="/contact"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
        >
          Contact Us
        </Link>
      </div>
    </section>
  </section>
);

export default Home;
