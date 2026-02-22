import React, { useState, useRef } from "react";
import bg1 from "@/assets/bgs/9088083.jpg";
import bg2 from "@/assets/bgs/snowy-summit-landscape.jpg";
import bg3 from "@/assets/bgs/thomas-griesbeck-BS-Uxe8wU5Y-unsplash.jpg";
import bg4 from "@/assets/bgs/wallhaven-qrz8pl.jpg";
import bg5 from "@/assets/bgs/wallpaperflare.com_wallpaper.jpg";
import { Plus, Image as ImageIcon } from "lucide-react";

interface Props {
  onBackgroundSelect: (bg: string) => void;
}

const ToolBar: React.FC<Props> = ({ onBackgroundSelect }) => {
  const [backgrounds, setBackgrounds] = useState<string[]>([
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addMoreBgHandler = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBackgrounds((prev) => [result, ...prev]);
        onBackgroundSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border/50 bg-card/50 backdrop-blur-xl p-6 shrink-0 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-1">Tools</h2>
          <p className="text-xs text-muted-foreground">Select a background</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Upload Button */}
        <button
          onClick={addMoreBgHandler}
          className="group relative w-full h-24 rounded-2xl border-2 border-dashed border-border/50 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="p-2 rounded-xl bg-muted group-hover:bg-violet-500/10 group-hover:scale-110 transition-all duration-300">
              <Plus className="w-5 h-5 text-muted-foreground group-hover:text-violet-500" />
            </div>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
              Upload Custom
            </span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </button>

        {/* Background List */}
        {backgrounds.map((bg, i) => (
          <div
            key={i}
            className="group relative w-full h-28 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ring-offset-background hover:ring-2 hover:ring-violet-500 hover:ring-offset-2 shadow-sm"
            onClick={() => onBackgroundSelect(bg)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <ImageIcon className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-2xl border border-border/50 bg-muted/30 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-colors" />
        <h3 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-2">
          Coming Soon
        </h3>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Advanced editing tools, filters, and dynamic layouts are currently
          under development.
        </p>
      </div>
    </div>
  );
};

export default ToolBar;
