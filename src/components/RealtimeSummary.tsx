import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  FileText, 
  Sparkles, 
  ChevronRight,
  Brain,
  Zap,
  MessageSquare,
  Send,
  Bot,
  User
} from "lucide-react";

interface RealtimeSummaryProps {
  isRecording: boolean;
}

interface SummaryEntry {
  timestamp: string;
  content: string;
  type: 'summary' | 'key-point' | 'question';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
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
  
  // AI Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI lecture assistant. I can help you understand concepts, clarify doubts, and provide additional insights based on the current lecture content. What would you like to know?",
      sender: 'ai',
      timestamp: '10:30'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

  // AI Chat functions
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Based on the current lecture content, I can explain that concept in more detail. Machine learning algorithms learn from data patterns to make predictions or decisions without being explicitly programmed for each specific task.",
      "That's a great question! From what I've analyzed in the lecture, neural networks are inspired by biological neurons and consist of interconnected nodes that process information through weighted connections.",
      "I can help clarify that point. The lecture mentioned several key algorithms including supervised learning (like linear regression), unsupervised learning (like clustering), and reinforcement learning (like Q-learning).",
      "Excellent observation! The slide content suggests that this relates to the backpropagation algorithm, which is how neural networks learn by adjusting weights based on prediction errors."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="shadow-card h-[700px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Lecture Assistant
          </div>
          {isRecording && (
            <Badge variant="default" className="animate-pulse">
              <Clock className="mr-1 h-3 w-3" />
              {currentTime}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <Tabs defaultValue="summaries" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
            <TabsTrigger value="summaries" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Summaries
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summaries" className="flex-1 px-4 pb-4 m-0">
            <div className="space-y-4 h-full">
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
          </TabsContent>
          
          <TabsContent value="chat" className="flex-1 flex flex-col px-4 pb-4 m-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-12'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="h-3 w-3 opacity-50" />
                      <span className="text-xs opacity-50">{message.timestamp}</span>
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about the lecture content..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage("Can you explain the main concepts from this slide?")}
                >
                  Explain slide
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage("What are the key takeaways so far?")}
                >
                  Key takeaways
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage("Generate practice questions")}
                >
                  Practice questions
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};