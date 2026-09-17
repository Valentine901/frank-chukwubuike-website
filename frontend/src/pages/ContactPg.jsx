import {
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowUpRight
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useState, useRef, useEffect } from "react";
import ScrollReveal from "../components/ScrollReveal";


const ContactPg = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderSubject, setSenderSubject] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const websocket = useRef(null);



  const { user } = useAuth();
  useEffect(() => {
    websocket.current = new WebSocket("ws://127.0.0.1:8000/api/ws/create-message");

    websocket.current.onmessage = (e) => {
      const response = JSON.parse(e.data);
      if (response.status === "error") {
        setErrorMessage(response.message || "Message not sent");
      }
    };

    return () => {
      if (websocket.current) websocket.current.close();
    }
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccess("");
    if (!websocket.current) return;

    const payload = {
      "sender_name": senderName,
      "sender_email": senderEmail,
      "sender_subject": senderSubject,
      "sender_message": senderMessage
    };

    websocket.current.send(JSON.stringify(payload));
    setSuccess("Your message has been received");
    setSenderName("");
    setSenderEmail("");
    setSenderSubject("");
    setSenderMessage("");
    setLoading(false)

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (success || errorMessage) {
        setSuccess("");
        setErrorMessage("");
      }
    }, (3000))
    return () => clearTimeout(timer);
  }, [success, errorMessage])


  if (user === null) return;
  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-white px-4 md:px-8 lg:px-12 py-24 transition-colors duration-300 font-body"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="max-w-2xl mb-12">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Get In Touch
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Let's Work{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Together
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-4 text-sm md:text-base leading-7 text-gray-600 dark:text-gray-400 max-w-xl">
              Have a project in mind or want to discuss an idea?
              Send me a message and let's create something meaningful
              together.
            </p>
          </ScrollReveal>
        </div>

        {/* CONTACT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            <div className="relative overflow-hidden h-full min-h-100 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 md:p-8">

              {/* Decorative circle */}
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-600/10 blur-2xl"></div>
              <ScrollReveal>
                <div className="relative z-10">

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Let's talk
                  </h3>

                  <p className="mt-3 text-sm md:text-base leading-7 text-gray-600 dark:text-gray-400">
                    I'm always open to discussing new projects,
                    creative ideas, or opportunities to work
                    together.
                  </p>

                  {/* CONTACT DETAILS */}
                  <div className="mt-8 space-y-5">

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                        <Mail size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Email
                        </p>

                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                          hello@example.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                        <Phone size={20} />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Phone
                        </p>

                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          +234 000 000 0000
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                        <MapPin size={20} />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Location
                        </p>

                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          Nigeria
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* AVAILABILITY */}
                  <div className="mt-10 flex items-center gap-3">

                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Available for new projects
                    </span>

                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <form onSubmit={sendMessage} className="p-6 md:p-8 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

                {success && <div className="text-center transition-all duration-300 items-center flex justify-center p-4 mx-auto">
                  <span className="text-green-500 font-body text-lg font-semibold">
                    {success}
                  </span>
                </div>}

                {errorMessage && <div className="text-center items-center transition-all duration-300 flex justify-center p-4 mx-auto">
                  <span className="text-red-500 font-body text-lg font-semibold">
                    {errorMessage}
                  </span>
                </div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={senderName}
                      required
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={senderEmail}
                      required
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                    />
                  </div>

                </div>

                {/* SUBJECT */}
                <div className="mt-5">
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="Project inquiry"
                    value={senderSubject}
                    onChange={(e) => setSenderSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>

                {/* MESSAGE */}
                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows="6"
                    required
                    placeholder="Tell me about your project..."
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  ></textarea>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Send Message
                  <Send size={18} />

                </button>

              </form>
            </ScrollReveal>
          </div>

        </div>

        <ScrollReveal>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-blue-600 text-white">

            <div>
              <h3 className="font-bold text-lg">
                Have a project in mind?
              </h3>

              <p className="text-sm text-blue-100 mt-1">
                Let's turn your idea into something great.
              </p>
            </div>


            <a
              href={`mailto:${user.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-300"
            >
              Email Me
              <ArrowUpRight size={17} />
            </a>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactPg;