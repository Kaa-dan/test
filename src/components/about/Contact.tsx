import en from "../../locals/en.json";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const { store } = en;

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">{store.title}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-primary-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-6">{store.locationTitle}</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-1">{store.name}</h4>
              <p className="text-primary-black">{store.address}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{store.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{store.email}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">{store.socialTitle}</h4>
              <div>
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="text-primary-black hover:text-primary-orange transition"
                  >
                    <FaFacebookF className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-primary-black hover:text-primary-orange transition"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-primary-black hover:text-primary-orange transition"
                  >
                    <FaYoutube className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-primary-black hover:text-primary-orange transition"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-white rounded-lg shadow-md overflow-hidden h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.5678!2d115.1234!3d-8.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sid!4v1234567890"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
