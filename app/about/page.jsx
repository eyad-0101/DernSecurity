import Link from "next/link";

const AboutUs = () => (
  <section className="w-full flex-col bg-gray-900 min-h-screen p-8 mt-16">
    {/* Hero Section */}
    <section className="text-center mb-12">
      <h1 className="head_text text-5xl font-bold text-white mb-4">
        <span className="text-white">About </span>
        <span className="blue_gradient">Dern security</span>
      </h1>
      <p className="desc text-lg text-gray-300 max-w-2xl mx-auto">
        At Dern security, we are more than just a PC repair company. We are your
        trusted partner in ensuring your devices are secure, efficient, and
        reliable. With years of experience and a commitment to ethical
        practices, we provide top-notch services tailored to your needs.
      </p>
    </section>

    {/* Mission Section */}
    <section className="mission text-white p-8 bg-gray-800 rounded-lg shadow-xl mb-12">
      <h2 className="sub_head_text text-2xl font-bold mb-4 text-blue-400">
        Our Mission
      </h2>
      <p className="text-lg text-gray-300">
        Our mission is to deliver exceptional PC repair services while upholding
        the highest standards of integrity, transparency, and customer
        satisfaction. We believe in empowering our clients with secure,
        optimized, and reliable systems.
      </p>
    </section>

    {/* Core Values Section */}
    <section className="core-values text-white p-8 bg-gray-800 rounded-lg shadow-xl mb-12">
      <h2 className="sub_head_text text-2xl font-bold mb-4 text-blue-400">
        Our Core Values
      </h2>
      <ul className="list-none">
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          <h3 className="text-xl font-semibold mb-2">Integrity</h3>
          <p className="text-gray-300">
            We operate with honesty and transparency in all our dealings. Your
            trust is our top priority.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
          <p className="text-gray-300">
            Your satisfaction drives everything we do. We listen, understand,
            and deliver solutions tailored to your needs.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          <h3 className="text-xl font-semibold mb-2">Expertise</h3>
          <p className="text-gray-300">
            Our team consists of certified professionals with years of
            experience in PC repair and cybersecurity.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          <h3 className="text-xl font-semibold mb-2">Security</h3>
          <p className="text-gray-300">
            We prioritize the safety and privacy of your data. Your information
            is always protected.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
          <p className="text-gray-300">
            We promote eco-friendly practices in our repairs and operations to
            contribute to a greener future.
          </p>
        </li>
      </ul>
    </section>

    {/* Team Section */}
    <section className="team text-white p-8 bg-gray-800 rounded-lg shadow-xl mb-12">
      <h2 className="sub_head_text text-2xl font-bold mb-4 text-blue-400">
        Our Team
      </h2>
      <p className="text-lg text-gray-300 mb-4">
        Our team of skilled technicians is the backbone of Security Com. With a
        passion for technology and a commitment to excellence, we work
        tirelessly to diagnose and repair your PC issues efficiently. We stay
        updated with the latest advancements to provide you with the best
        solutions.
      </p>
      <ul className="list-none">
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Certified Professionals
          </h3>
          <p className="text-gray-300">
            Each member of our team holds industry-recognized certifications and
            undergoes regular training to stay ahead of the curve.
          </p>
        </li>
        <li className="service-item p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
          <p className="text-gray-300">
            We are here for you 24/7, ready to assist with any issues or
            questions you may have.
          </p>
        </li>
      </ul>
    </section>

    {/* Call to Action Section */}
    <section className="contact-us text-white p-8 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="sub_head_text text-2xl font-bold mb-4 text-blue-400">
        Ready to Get Started?
      </h2>
      <p className="text-lg text-gray-300 mb-4">
        Whether you need a quick repair or a complete system overhaul, Security
        Com is here to help. Contact us today to schedule a consultation or
        learn more about our services.
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

export default AboutUs;
