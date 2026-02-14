import { Scissors, Type, Palette, Music, Layers } from "lucide-react";
import Bg1 from "/home/devpalwar/Dropbox/me/wallpapers/wallhaven-21y32m.jpg";
import Bg2 from "/home/devpalwar/Dropbox/me/wallpapers/9088083.jpg";
import Bg3 from "/home/devpalwar/Dropbox/me/wallpapers/pexels-sergei-a-1322276-2589456.jpg";

const tools = [
  { icon: Scissors, label: "Trim", description: "Cut and trim clips" },
  { icon: Type, label: "Text", description: "Add text overlays" },
  { icon: Palette, label: "Filters", description: "Apply color filters" },
  { icon: Music, label: "Audio", description: "Add background audio" },
  { icon: Layers, label: "Layers", description: "Manage layers" },
];

interface Props {
  onBackgroundSelect: (bg: string) => void;
}

const ToolBar: React.FC<Props> = ({ onBackgroundSelect }) => {
  return (
    <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border/50 bg-card/50 backdrop-blur-xl p-6 shrink-0 overflow-y-auto">
      <h2 className="text-sm font-semibold text-foreground mb-1">Tools</h2>
      <p className="text-xs text-muted-foreground mb-6">
        Editing tools coming soon
      </p>

      <div className="space-y-2">
        {[Bg1, Bg2, Bg3].map((bg, i) => (
          <div
            key={i}
            className="w-full h-24 bg-cover bg-center rounded-xl cursor-pointer"
            style={{ backgroundImage: `url(${bg})` }}
            onClick={() => onBackgroundSelect(bg)}
          />
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl border border-dashed border-border/70 bg-muted/20">
        <p className="text-xs text-muted-foreground text-center">
          More editing features will appear here
        </p>
      </div>
    </div>
  );
};

export default ToolBar;
