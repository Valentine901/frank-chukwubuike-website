import { BASE_IMAGE_URL } from "../../constants/Api";
import { FolderGit2, Quote, Star } from "lucide-react";

const Testimonialcard = ({ testimonial }) => {
  return (
    <div className="group relative flex flex-col justify-between p-6 md:p-8 w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30 dark:hover:border-blue-500/20 mx-auto">
      
      
      <Quote className="absolute right-6 top-6 h-10 w-10 text-gray-100 dark:text-gray-800/40 group-hover:text-blue-500/10 transition-colors duration-300 pointer-events-none" />

      
      <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800/60 pb-4">
        
       
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100 dark:ring-gray-800 group-hover:ring-blue-500/20 transition-all duration-300">
          {testimonial.client_image ? (
            <img
              src={`${BASE_IMAGE_URL}/${testimonial?.client_image}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              alt={testimonial.client_name || "Client avatar"}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
              <FolderGit2 className="w-5 h-5 stroke-[1.5]" />
            </div>
          )}
        </div>

        
        <div className="flex flex-col min-w-0">
          <cite className="font-body text-base font-bold text-gray-900 dark:text-gray-100 not-italic truncate">
            {testimonial.client_name}
          </cite>

          <span className="text-sm font-body font-semibold text-blue-600 dark:text-blue-400 mt-0.5 truncate">
            {testimonial.project_type || "Graphics Client"}
          </span>
        </div>
      </div>

      
      <div className="mt-4 flex-1">
        
        <div className="flex items-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        
        <blockquote className="font-body text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
          "{testimonial.description || "No description"}"
        </blockquote>
      </div>

    </div>
  );
};

export default Testimonialcard;
