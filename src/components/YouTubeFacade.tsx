import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
}

const YouTubeFacade = ({ videoId, title }: YouTubeFacadeProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-navy">
        {loaded ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-navy-foreground"
            aria-label={`Lancer la vidéo : ${title}`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <Play className="h-7 w-7 ml-0.5" aria-hidden />
            </span>
            <span className="font-heading text-lg md:text-2xl uppercase tracking-tight">
              {title}
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground text-center">
        En lançant la vidéo, vous acceptez le dépôt de cookies par YouTube.
      </p>
    </div>
  );
};

export default YouTubeFacade;
