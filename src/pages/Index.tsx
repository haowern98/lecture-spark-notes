import { LectureDashboard } from "@/components/LectureDashboard";
import heroImage from "@/assets/lecture-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern lecture hall with students and technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Intelligent Lecture
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Analysis Platform
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Revolutionize your learning experience with AI-powered real-time analysis 
            of lectures, automatic summarization, and interactive chat assistance.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium">Live Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">AI Chat Assistant</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-medium">Slide Annotations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <LectureDashboard />
    </div>
  );
};

export default Index;