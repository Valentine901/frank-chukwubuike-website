import { useQueryContext } from "../Context/GeneralQueryContext";
import { BASE_IMAGE_URL } from "../constants/Api";
import { Quote, Star, FolderGit2 } from "lucide-react";

const TestimonialsPg = () => {
    const { testimonials } = useQueryContext();

    if (testimonials === null) return;

    return (
        <section
            id="testimonials"
            className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-4 md:px-8 lg:px-12 py-24 transition-colors duration-300 font-body"
        >
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="max-w-2xl mb-12">

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Client Feedback
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        What Clients{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            Say
                        </span>
                    </h2>

                    <p className="mt-4 text-sm md:text-base leading-7 text-gray-600 dark:text-gray-400">
                        A few words from people I've had the opportunity to
                        work with.
                    </p>
                </div>

                {/* TESTIMONIALS */}
                {testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {testimonials.map((testimonial) => (
                            <article
                                key={testimonial.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-lg hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300"
                            >

                                {/* QUOTE ICON */}
                                <Quote
                                    className="absolute right-5 top-5 w-9 h-9 text-gray-100 dark:text-gray-800 group-hover:text-blue-500/10 transition-colors duration-300 pointer-events-none"
                                />

                                {/* CLIENT */}
                                <div className="flex items-center gap-3 pr-10">

                                    {/* CLIENT IMAGE */}
                                    <div className="w-12 h-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100 dark:ring-gray-800 group-hover:ring-blue-500/20 transition-all duration-300">
                                        {testimonial?.client_image ? (
                                            <img
                                                src={testimonial?.image}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                alt={
                                                    testimonial.client_name ||
                                                    "Client avatar"
                                                }
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex w-full h-full items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
                                                <FolderGit2 className="w-5 h-5" />
                                            </div>
                                        )}

                                    </div>

                                    {/* CLIENT INFO */}
                                    <div className="min-w-0">

                                        <cite className="block truncate font-body text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 not-italic">
                                            {testimonial.client_name}
                                        </cite>

                                        <span className="block truncate mt-0.5 text-xs md:text-sm font-body font-semibold text-blue-600 dark:text-blue-400">
                                            {testimonial.project_type ||
                                                "Graphics Client"}
                                        </span>

                                    </div>

                                </div>

                                {/* RATING */}
                                <div className="mt-5 flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>

                                {/* TESTIMONIAL */}
                                <blockquote className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 line-clamp-4">
                                    "{testimonial.description ||
                                        "No description"}"
                                </blockquote>

                                {/* BOTTOM ACCENT */}
                                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">

                                    <div className="w-8 h-1 rounded-full bg-blue-600 group-hover:w-14 transition-all duration-300"></div>

                                </div>

                            </article>
                        ))}

                    </div>
                ) : (
                    /* EMPTY STATE */
                    <div className="py-16 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            No testimonials available yet.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default TestimonialsPg;