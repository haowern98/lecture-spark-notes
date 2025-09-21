import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  FileText, 
  Sparkles, 
  ChevronRight,
  Brain,
  Zap
} from "lucide-react";

interface RealtimeSummaryProps {
  isRecording: boolean;
}

interface SummaryEntry {
  timestamp: string;
  content: string;
  type: 'summary' | 'key-point' | 'question';
}

export const RealtimeSummary = ({ isRecording }: RealtimeSummaryProps) => {
  const [summaries, setSummaries] = useState<SummaryEntry[]>([
    {
      timestamp: "00:00:30",
      content: "Introduction to machine learning fundamentals and basic concepts",
      type: "summary"
    },
    {
      timestamp: "00:01:45",
      content: "Neural networks process information through interconnected nodes",
      type: "key-point"
    },
    {
      timestamp: "00:02:30",
      content: "What are the main types of machine learning algorithms?",
      type: "question"
    }
  ]);

  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    if (isRecording) {
      // Simulate real-time updates
      const interval = setInterval(() => {
        const now = new Date();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        setCurrentTime(`00:${minutes}:${seconds}`);
        
        // Simulate new summary every minute (for demo)
        if (seconds === '00' && Math.random() > 0.5) {
          const newSummary: SummaryEntry = {
            timestamp: `00:${minutes}:${seconds}`,
            content: "New key concept identified and summarized automatically",
            type: Math.random() > 0.6 ? 'key-point' : 'summary'
          };
          setSummaries(prev => [newSummary, ...prev]);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'summary':
        return <FileText className="h-4 w-4" />;
      case 'key-point':
        return <Sparkles className="h-4 w-4" />;
      case 'question':
        return <Brain className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'summary':
        return 'default' as const;
      case 'key-point':
        return 'secondary' as const;
      case 'question':
        return 'outline' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <Card className="shadow-card h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Real-time Summary
          </div>
          {isRecording && (
            <Badge variant="default" className="animate-pulse">
              <Clock className="mr-1 h-3 w-3" />
              {currentTime}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!isRecording && (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">
                Start recording to see real-time summaries generated every minute
              </p>
            </div>
          )}
          
          {isRecording && (
            <div className="bg-gradient-accent rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">AI Analysis Active</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Generating summaries every minute based on visual and audio content
              </p>
            </div>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {summaries.map((summary, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 space-y-2 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <Badge variant={getVariant(summary.type)} className="text-xs">
                    {getIcon(summary.type)}
                    <span className="ml-1 capitalize">{summary.type.replace('-', ' ')}</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {summary.timestamp}
                  </span>
                </div>
                
                <p className="text-sm leading-relaxed">{summary.content}</p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-xs h-8"
                >
                  View Details
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          {summaries.length > 0 && (
            <Button variant="outline" className="w-full" size="sm">
              Export All Summaries
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};