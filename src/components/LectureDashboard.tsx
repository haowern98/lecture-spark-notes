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
  Users,
  FileText,
  Brain
} from "lucide-react";
import { LiveCapture } from "./LiveCapture";
import { AIChat } from "./AIChat";
import { Interview } from "./Interview";
import { SlidesReview } from "./SlidesReview";

export const LectureDashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeMode, setActiveMode] = useState<'lecture' | 'interview'>('lecture');
  const [lectureTab, setLectureTab] = useState<'live' | 'slides'>('live');

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start screen capture and audio recording
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

        {/* Mode Navigation */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeMode === 'lecture' ? 'default' : 'ghost'}
            onClick={() => setActiveMode('lecture')}
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            Lecture Mode
          </Button>
          <Button
            variant={activeMode === 'interview' ? 'default' : 'ghost'}
            onClick={() => setActiveMode('interview')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Interview Mode
          </Button>
        </div>

        {/* Lecture Mode Sub-tabs */}
        {activeMode === 'lecture' && (
          <div className="flex gap-2">
            <Button
              variant={lectureTab === 'live' ? 'default' : 'ghost'}
              onClick={() => setLectureTab('live')}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              Live Analysis
            </Button>
            <Button
              variant={lectureTab === 'slides' ? 'default' : 'ghost'}
              onClick={() => setLectureTab('slides')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Review Slides
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeMode === 'lecture' && lectureTab === 'live' && <LiveCapture isRecording={isRecording} />}
            {activeMode === 'interview' && <Interview isRecording={isRecording} />}
            {activeMode === 'lecture' && lectureTab === 'slides' && <SlidesReview />}
          </div>

          {/* Right Column - AI Chat */}
          <div className="space-y-6">
            <AIChat />
            
            {/* Recording Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Session Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Screen Capture</span>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={isRecording ? "default" : "secondary"}>
                      {isRecording ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Audio Capture</span>
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={isRecording ? "default" : "secondary"}>
                      {isRecording ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Session Time</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono">00:00:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};