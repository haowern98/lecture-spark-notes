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
    <div className="space-y-6">
      {/* Screen Capture Preview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Screen Capture
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            {isRecording ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Eye className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Capturing Screen</p>
                  <p className="text-sm text-muted-foreground">
                    Analyzing visual content in real-time
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Monitor className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-lg font-semibold text-muted-foreground">
                    Screen Capture Ready
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start recording to begin screen analysis
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {isRecording && (
            <div className="mt-4 flex items-center gap-4">
              <Badge variant="default" className="animate-pulse">
                <Activity className="mr-1 h-3 w-3" />
                Live
              </Badge>
              <span className="text-sm text-muted-foreground">
                Resolution: 1920x1080 • FPS: 30
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audio Capture */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Audio Analysis
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Audio Visualization */}
            <div className="bg-gradient-muted rounded-lg p-6">
              {isRecording ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Transcribing...</span>
                  </div>
                  
                  {/* Simulated Audio Waveform */}
                  <div className="flex items-center gap-1 h-12">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary rounded-full animate-pulse"
                        style={{
                          width: '2px',
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Latest Transcription */}
                  <div className="bg-card rounded-md p-3 border">
                    <p className="text-sm text-muted-foreground mb-1">Latest transcription:</p>
                    <p className="text-sm">
                      "Today we'll be discussing the fundamentals of machine learning 
                      and how neural networks process information..."
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Audio capture ready - waiting for recording to start
                  </p>
                </div>
              )}
            </div>
            
            {isRecording && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Quality: High</Badge>
                  <Badge variant="outline">Sample Rate: 44.1kHz</Badge>
                </div>
                <span className="text-muted-foreground">
                  Confidence: 94%
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};