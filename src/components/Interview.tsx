import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Play, 
  Square, 
  Clock,
  Mic,
  MicOff,
  Video,
  VideoOff,
  UserCheck,
  Briefcase
} from "lucide-react";

interface InterviewProps {
  isRecording: boolean;
}

export const Interview = ({ isRecording }: InterviewProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  
  const questions = [
    "Tell me about yourself and your background.",
    "What interests you most about this position?",
    "Describe a challenging project you've worked on.",
    "How do you handle working under pressure?",
    "Where do you see yourself in 5 years?"
  ];

  const interviewStats = [
    { label: "Questions Asked", value: "3/5" },
    { label: "Speaking Time", value: "4:32" },
    { label: "Confidence Score", value: "8.5/10" },
    { label: "Eye Contact", value: "Good" }
  ];

  return (
    <Card className="shadow-card h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Interview Mode
          <Badge variant={isRecording ? "destructive" : "secondary"} className="ml-auto">
            {isRecording ? "Live" : "Ready"}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Interview Controls */}
        <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Button
            variant={!isVideoOn ? "destructive" : "outline"}
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>
          
          <Button variant="outline" size="sm">
            <Briefcase className="h-4 w-4 mr-2" />
            Technical Interview
          </Button>
        </div>

        {/* Current Question */}
        <div className="bg-gradient-accent rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Question {currentQuestion} of {questions.length}</span>
            {isRecording && (
              <Badge variant="default" className="animate-pulse ml-auto">
                <Clock className="mr-1 h-3 w-3" />
                Recording
              </Badge>
            )}
          </div>
          <p className="text-sm leading-relaxed font-medium mb-4">
            {questions[currentQuestion - 1]}
          </p>
          
          {isRecording && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, questions.length))}
                disabled={currentQuestion >= questions.length}
              >
                Next Question
              </Button>
              <Button variant="outline" size="sm">
                Skip
              </Button>
            </div>
          )}
        </div>

        {/* Interview Stats */}
        <div className="grid grid-cols-2 gap-4">
          {interviewStats.map((stat, index) => (
            <div key={index} className="border rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-sm font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Question List */}
        <div className="flex-1 overflow-y-auto">
          <h4 className="text-sm font-medium mb-3">Interview Questions</h4>
          <div className="space-y-2">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                  index + 1 === currentQuestion 
                    ? 'bg-primary/10 border-primary' 
                    : index + 1 < currentQuestion 
                    ? 'bg-muted/50 text-muted-foreground' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setCurrentQuestion(index + 1)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono">Q{index + 1}</span>
                  {index + 1 < currentQuestion && (
                    <UserCheck className="h-3 w-3 text-green-500" />
                  )}
                </div>
                <p className="leading-relaxed">{question}</p>
              </div>
            ))}
          </div>
        </div>

        {!isRecording && (
          <div className="text-center py-4 text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Start recording to begin your interview session</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};