import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TUTORIAL_VIDEOS, TutorialVideo, getTutorialVideoUrl } from "@/lib/tutorials-data";
import { BUSINESS } from "@/lib/business-config";
import { Play, Film, Clock, Server, AlertCircle } from "lucide-react";

interface TutorialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialVideoId?: string;
}

export function TutorialModal({ open, onOpenChange, initialVideoId }: TutorialModalProps) {
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo>(() => {
    if (initialVideoId) {
      const found = TUTORIAL_VIDEOS.find((v) => v.id === initialVideoId);
      if (found) return found;
    }
    return TUTORIAL_VIDEOS[0];
  });

  const [hasError, setHasError] = useState(false);

  const videoUrl = getTutorialVideoUrl(selectedVideo.fileName);

  const handleSelectVideo = (video: TutorialVideo) => {
    setSelectedVideo(video);
    setHasError(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#131314] text-white border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl">
        <DialogHeader className="p-4 sm:p-6 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand animate-pulse" />
            <DialogTitle className="text-lg sm:text-xl font-black text-white tracking-tight">
              KhanaBook Video Tutorials
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-gray-400">
            Step-by-step guides for offline billing, printer setup, and multi-terminal mesh sync.
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-0">
          {/* Main Video Player Area */}
          <div className="p-4 sm:p-6 flex flex-col justify-between bg-black/40">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#1E1F20] border border-white/10 flex items-center justify-center">
              {!hasError ? (
                <video
                  key={videoUrl}
                  src={videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                  onError={() => setHasError(true)}
                >
                  Your browser does not support HTML5 video streaming.
                </video>
              ) : (
                <div className="p-6 text-center max-w-md space-y-3">
                  <div className="h-12 w-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mx-auto">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Video Upload Pending on CDN</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This video will stream automatically as soon as it is placed in your VPS
                    tutorial directory:
                  </p>
                  <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 break-all select-all flex items-center gap-2 justify-center">
                    <Server className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span>
                      {BUSINESS.tutorialsVpsPath}
                      {selectedVideo.fileName}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono">URL: {videoUrl}</div>
                </div>
              )}
            </div>

            {/* Video Meta Info */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand/20 text-brand border border-brand/30 uppercase tracking-wider">
                  {selectedVideo.tag}
                </span>
                {selectedVideo.duration && (
                  <span className="flex items-center gap-1 text-[11px] text-gray-400 font-mono">
                    <Clock className="h-3 w-3" />
                    {selectedVideo.duration}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">{selectedVideo.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{selectedVideo.description}</p>
            </div>
          </div>

          {/* Chapters / Playlist Sidebar */}
          <div className="p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#18191A] flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-400">
              <span className="flex items-center gap-1.5">
                <Film className="h-3.5 w-3.5 text-brand" />
                All Tutorial Chapters
              </span>
              <span>{TUTORIAL_VIDEOS.length} Videos</span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {TUTORIAL_VIDEOS.map((video) => {
                const isActive = video.id === selectedVideo.id;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleSelectVideo(video)}
                    className={`w-full text-left p-3 rounded-xl transition-all border flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? "bg-brand/15 border-brand/40 text-white shadow-sm"
                        : "bg-surface-soft/40 border-white/5 text-gray-300 hover:bg-surface-soft hover:text-white"
                    }`}
                  >
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive
                          ? "bg-brand text-white shadow-sm shadow-brand/30"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold leading-snug line-clamp-2">
                        {video.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                        <span className="text-[10px] uppercase tracking-wider">{video.tag}</span>
                        {video.duration && <span>• {video.duration}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* VPS Server Note */}
            <div className="mt-auto pt-4 border-t border-white/10 text-[11px] text-gray-400 flex items-center gap-2">
              <Server className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <span className="truncate">
                Host: <code className="text-gray-200">cdn.kbook.iadv.cloud</code>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
