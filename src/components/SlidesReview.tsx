import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Eye,
  Download,
  Star,
  Clock,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

interface SlideData {
  id: string;
  title: string;
  timestamp: string;
  annotations: number;
  keywords: string[];
  thumbnail: string;
  content: string;
}

export const SlidesReview = () => {
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const slides: SlideData[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      timestamp: '00:02:15',
      annotations: 3,
      keywords: ['ML', 'algorithms', 'data'],
      thumbnail: '/placeholder.svg',
      content: 'Overview of machine learning fundamentals including supervised, unsupervised, and reinforcement learning approaches.'
    },
    {
      id: '2',
      title: 'Neural Network Architecture',
      timestamp: '00:05:30',
      annotations: 5,
      keywords: ['neural networks', 'layers', 'neurons'],
      thumbnail: '/placeholder.svg',
      content: 'Deep dive into neural network structure, including input layers, hidden layers, and output layers with activation functions.'
    },
    {
      id: '3',
      title: 'Training Algorithms',
      timestamp: '00:08:45',
      annotations: 2,
      keywords: ['backpropagation', 'gradient descent', 'optimization'],
      thumbnail: '/placeholder.svg',
      content: 'Explanation of how neural networks learn through backpropagation and various optimization techniques.'
    },
    {
      id: '4',
      title: 'Practical Applications',
      timestamp: '00:12:20',
      annotations: 4,
      keywords: ['applications', 'computer vision', 'NLP'],
      thumbnail: '/placeholder.svg',
      content: 'Real-world applications of machine learning in computer vision, natural language processing, and recommendation systems.'
    }
  ];

  const filteredSlides = slides.filter(slide =>
    slide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    slide.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Slide Library
            <Badge variant="secondary" className="ml-auto">
              {slides.length} slides
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search slides by title or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Star className="mr-2 h-4 w-4" />
              Favorites
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Most Annotated
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSlides.map((slide) => (
          <Card 
            key={slide.id} 
            className={`shadow-card cursor-pointer transition-all hover:shadow-elegant ${
              selectedSlide === slide.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedSlide(selectedSlide === slide.id ? null : slide.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{slide.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {slide.timestamp}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      {slide.annotations} notes
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Slide Thumbnail */}
              <div className="aspect-video bg-gradient-muted rounded-lg border mb-4 flex items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
              
              {/* Content Preview */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {slide.content}
              </p>
              
              {/* Keywords */}
              <div className="flex flex-wrap gap-1 mb-3">
                {slide.keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
              
              {/* Expanded Content */}
              {selectedSlide === slide.id && (
                <div className="border-t pt-4 mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">AI Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      This slide introduces fundamental machine learning concepts with clear explanations 
                      of different learning paradigms. Key technical terms are well-defined and examples 
                      are provided for practical understanding.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Your Annotations</h4>
                    <div className="space-y-2">
                      <div className="bg-muted rounded-md p-2">
                        <p className="text-sm">Important: Focus on supervised vs unsupervised learning differences</p>
                        <span className="text-xs text-muted-foreground">Added at 00:02:30</span>
                      </div>
                      <div className="bg-muted rounded-md p-2">
                        <p className="text-sm">Question: How does reinforcement learning differ from the other two?</p>
                        <span className="text-xs text-muted-foreground">Added at 00:02:45</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <Star className="mr-2 h-4 w-4" />
                      Favorite
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground px-4">
          Page 1 of 1
        </span>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};