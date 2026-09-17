import { Trash2 } from 'lucide-react'
import { useQueryContext } from '../../Context/GeneralQueryContext'

const MessageCard = ({ message }) => {
  const { handleDeleteMessage } = useQueryContext();


const formatTimeAgo = (utcString) => {
  if (!utcString) return "";
  
  const now = new Date();
  const past = new Date(utcString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  
  const elapsed = now - past;
  
  if (elapsed < msPerMinute) {
     return 'Just now';   
  } else if (elapsed < msPerHour) {
     const mins = Math.round(elapsed / msPerMinute);
     return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;   
  } else if (elapsed < msPerDay) {
     const hours = Math.round(elapsed / msPerHour);
     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;   
  } else {
     return past.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
};



  const initialLetter = message?.sender_name ? message.sender_name[0] : "?";

  return (
    <div className='relative w-full max-w-5xl p-4 rounded-xl shadow-sm bg-gray-200/20 dark:bg-gray-700/20 font-body text-lg flex justify-between items-center'>
      <div className='flex space-x-5'>
        {/* profile icon "letter" */}
        <div className='min-w-20 min-h-20 w-20 h-20 rounded-full flex items-center bg-gray-200 dark:bg-gray-700/60'>
          <span className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-100 capitalize mx-auto">
            {initialLetter}
          </span>
        </div>

        {/* message body */}
        <div className='flex flex-col gap-1 py-2'>
          {/* email */}
          <span className='font-semibold text-base text-gray-500/50'>{message?.sender_email}</span>
          {/* username */}
          <span className='text-xl font-semibold text-gray-700 dark:text-gray-100'>
            {message?.sender_name}
          </span>

          {/* subject */}
          <span className='mt-2 font-semibold text-gray-700/50 dark:text-gray-500'>{message?.sender_subject}</span>
          {/* message */}
          <p className='text-md text-gray-700/50 dark:text-gray-100/50'>{message?.sender_message}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2 items-end self-stretch justify-between py-2'>
        {/* Timestamp */}
        <span className='text-gray-500 dark:text-gray-400 font-semibold text-sm'>{formatTimeAgo(message.sent_at)}</span>

        <div className="relative group inline-block">
          <button
            onClick={() => handleDeleteMessage(message.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <Trash2 size={18} />
          </button>

          {/* The Custom Styled Tooltip Box */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom pointer-events-none whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow-md dark:bg-gray-100 dark:text-gray-900">
            Delete Message

            {/* Optional Little Arrow Tip */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default MessageCard;
