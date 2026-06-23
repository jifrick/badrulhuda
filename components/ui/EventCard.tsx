import React from "react";
import { ArrowRight } from "lucide-react";
import { EventItem } from "@/lib/constants";

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate().toString().padStart(2, "0");
  const month = eventDate.toLocaleString("default", { month: "short" });
  const year = eventDate.getFullYear();

  // Color-coded mapping based on Category
  const getBadgeColors = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-900/30";
      case "Community":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/30";
      case "Religious":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/30";
      case "Open":
      default:
        return "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/20 dark:text-purple-300 dark:border-purple-900/30";
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 hover:border-accent hover:shadow-lg transition-all duration-300 flex items-start gap-4 group">
      {/* Calendar Date Block */}
      <div className="flex flex-col items-center justify-center bg-surface-alt border border-border/80 rounded-xl p-2 w-16 h-20 flex-shrink-0 text-center shadow-sm">
        <span className="text-2xl font-bold font-amiri text-primary dark:text-primary-light leading-none">
          {day}
        </span>
        <span className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">
          {month}
        </span>
        <span className="text-[9px] text-textColor-muted font-medium mt-0.5">
          {year}
        </span>
      </div>

      {/* Details Column */}
      <div className="flex flex-col justify-between min-h-[80px] flex-grow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span 
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeColors(
                event.category
              )}`}
            >
              {event.category}
            </span>
          </div>
          <h3 className="font-amiri text-body-lg font-bold text-textColor-primary group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-body-sm text-textColor-secondary line-clamp-2 mt-1 leading-relaxed font-inter">
            {event.description}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-caption font-bold text-primary dark:text-primary-light group-hover:text-accent transition-colors">
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
