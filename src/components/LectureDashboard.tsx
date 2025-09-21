import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Mic, 
  Play, 
  Square, 
  Clock, 
  MessageSquare,
  FileText,
  Brain
} from "lucide-react";
import { LiveCapture } from "./LiveCapture";
import { RealtimeSummary } from "./RealtimeSummary";
import { AIChat } from "./AIChat";
import { SlidesReview } from "./SlidesReview";

export const LectureDashboard = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start screen capture
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop recording and save the session
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LectureAI
            </h1>
            <p className="text-muted-foreground mt-2">
              Intelligent lecture analysis and note-taking platform
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant={isRecording ? "destructive" : "secondary"}>
              {isRecording ? "Recording" : "Idle"}
            </Badge>
            
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              className="shadow-elegant"
            >
              {isRecording ? (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Recording
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Screen Share - Small */}
          <div className="lg:col-span-1">
            <LiveCapture isRecording={isRecording} />
          </div>

          {/* Summary - Medium */}
          <div className="lg:col-span-1">
            <RealtimeSummary isRecording={isRecording} />
          </div>

          {/* Slides Review - Large */}
          <div className="lg:col-span-2">
            <SlidesReview />
          </div>
        </div>
      </div>
    </div>
  );
};