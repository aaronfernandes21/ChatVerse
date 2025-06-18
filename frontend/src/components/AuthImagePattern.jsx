import { MessageCircle } from "lucide-react";

const ChatVerseBrandPattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* ChatVerse Grid Pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl flex items-center justify-center ${
                i === 4
                  ? "bg-primary/20 text-primary shadow-md"
                  : "bg-primary/10"
              } ${i % 2 === 0 ? "animate-pulse" : ""}`}
            >
              {i === 4 && <MessageCircle className="w-5 h-5" />}
            </div>
          ))}
        </div>

        {/* Brand Title */}
        <h2 className="text-3xl font-playfair font-bold mb-3 tracking-wide">
          {title}
        </h2>
        <p className="text-base-content/60 font-poppins text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default ChatVerseBrandPattern;
