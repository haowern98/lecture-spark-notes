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
  FileText,
  Brain
} from "lucide-react";
import { TopBar } from "./TopBar";
import { LiveCapture } from "./LiveCapture";
import { RealtimeSummary } from "./RealtimeSummary";
import { Interview } from "./Interview";
import { SlidesReview } from "./SlidesReview";

export const LectureDashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentMode, setCurrentMode] = useState<'lecture' | 'interview'>('lecture');
  const [activeTab, setActiveTab] = useState<'live' | 'slides'>('live');

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start screen capture and audio recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop recording and save the session
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <TopBar 
        currentMode={currentMode} 
        onModeChange={setCurrentMode} 
        isRecording={isRecording}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Recording Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {currentMode === 'lecture' ? 'Lecture Analysis' : 'Interview Session'}
              </h2>
              <p className="text-muted-foreground">
                {currentMode === 'lecture' 
                  ? 'Real-time analysis and slide review' 
                  : 'Interactive interview session'
                }
              </p>
            </div>
            
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

          {currentMode === 'lecture' && (
            <>
              {/* Navigation Tabs for Lecture Mode */}
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'live' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('live')}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  Live Analysis
                </Button>
                <Button
                  variant={activeTab === 'slides' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('slides')}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Review Slides
                </Button>
              </div>

              {/* Lecture Mode Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {activeTab === 'live' && <LiveCapture isRecording={isRecording} />}
                  {activeTab === 'slides' && <SlidesReview />}
                </div>

                {/* Right Column - AI Chat */}
                <div className="space-y-6">
                  <RealtimeSummary isRecording={isRecording} />
                  
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
            </>
          )}

          {currentMode === 'interview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Interview Content */}
              <div className="lg:col-span-2 space-y-6">
                <Interview isRecording={isRecording} />
              </div>

              {/* Right Column - AI Chat */}
              <div className="space-y-6">
                <RealtimeSummary isRecording={isRecording} />
                
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
          )}
        </div>
      </div>
    </div>
  );
};