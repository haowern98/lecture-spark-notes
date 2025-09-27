import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Monitor, 
  Mic, 
  Brain,
  GraduationCap,
  Users
} from "lucide-react";

interface TopBarProps {
  currentMode: 'lecture' | 'interview';
  onModeChange: (mode: 'lecture' | 'interview') => void;
  isRecording: boolean;
}

export const TopBar = ({ currentMode, onModeChange, isRecording }: TopBarProps) => {
  return (
    <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Left side - Logo and Mode Switcher */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">AI Analysis Suite</span>
          <span className="text-sm text-muted-foreground">Screen & Audio Intelligence</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={currentMode === 'lecture' ? 'default' : 'ghost'}
            onClick={() => onModeChange('lecture')}
            className="flex items-center gap-2"
            size="sm"
          >
            <GraduationCap className="h-4 w-4" />
            Lecture Mode
          </Button>
          <Button
            variant={currentMode === 'interview' ? 'default' : 'ghost'}
            onClick={() => onModeChange('interview')}
            className="flex items-center gap-2"
            size="sm"
          >
            <Users className="h-4 w-4" />
            Interview Mode
          </Button>
        </div>
      </div>

      {/* Right side - Status and Theme Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Screen</span>
            <Badge variant={isRecording ? "default" : "secondary"} className="text-xs">
              {isRecording ? "Active" : "Inactive"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Audio</span>
            <Badge variant={isRecording ? "default" : "secondary"} className="text-xs">
              {isRecording ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
        
        <ThemeToggle />
      </div>
    </div>
  );
};