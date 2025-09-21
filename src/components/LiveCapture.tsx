import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Mic, 
  Settings, 
  Eye,
  Volume2,
  Activity
} from "lucide-react";

interface LiveCaptureProps {
  isRecording: boolean;
}

export const LiveCapture = ({ isRecording }: LiveCaptureProps) => {
  return (
    <Card className="shadow-card h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-primary" />
            Screen Share
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          {isRecording ? (
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Eye className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold">Live Screen</p>
                <p className="text-xs text-muted-foreground">
                  Capturing content
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <Monitor className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Ready to Share
                </p>
                <p className="text-xs text-muted-foreground">
                  Start recording
                </p>
              </div>
            </div>
          )}
        </div>
        
        {isRecording && (
          <div className="mt-3 text-center">
            <Badge variant="default" className="animate-pulse text-xs">
              <Activity className="mr-1 h-3 w-3" />
              Live
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};