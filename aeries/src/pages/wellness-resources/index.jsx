import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ResourceCard from './components/ResourceCard';
import CategoryTabs from './components/CategoryTabs';
import FeaturedContent from './components/FeaturedContent';
import InteractiveTools from './components/InteractiveTools';
import SearchAndFilter from './components/SearchAndFilter';
import ResourceViewer from './components/ResourceViewer';

const WellnessResources = () => {
  const videoLink =
  "https://www.youtube.com/embed/VpHz8Mb13_Y";
  console.log("Video link in WellnessResources:", videoLink);

;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('stress-management');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    contentType: 'all',
    duration: 'all',
    difficulty: 'all',
    sortBy: 'relevance'
  });
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());
  const [completedResources, setCompletedResources] = useState(new Set());
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceViewer, setShowResourceViewer] = useState(false);

  const categories = [
    { id: 'stress-management', name: 'Stress Management' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'coping-strategies', name: 'Coping Strategies' },
    { id: 'crisis-support', name: 'Crisis Support' },
    { id: 'breathing-exercises', name: 'Breathing' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'sleep-wellness', name: 'Sleep' },
    { id: 'anxiety-relief', name: 'Anxiety Relief' }
  ];

  const mockResources = [
    {
      id: 1,
      title: "5-Minute Stress Relief Meditation",
      description: "Quick guided meditation to reduce stress and anxiety in just 5 minutes. Perfect for busy schedules.",
      category: "meditation",
      type: "video",
      duration: "5 min",
      durationInSeconds: 300,
      difficulty: "beginner",
      rating: 4.8,
      completions: 1247,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      fullDescription: `This guided meditation is designed to help you quickly release stress and tension from your body and mind. Using proven breathing techniques and mindfulness practices, you'll learn to find calm even in the busiest moments of your day.\n\nPerfect for beginners, this session requires no prior meditation experience and can be done anywhere - at your desk, in your car, or at home.`,
      keyPoints: [
        "Learn basic breathing techniques for instant stress relief",
        "Practice mindfulness in just 5 minutes",
        "Suitable for complete beginners",
        "Can be done anywhere, anytime"
      ],
      transcript: `Welcome to this 5-minute stress relief meditation. Find a comfortable position, either sitting or lying down. Close your eyes gently and take a deep breath in through your nose... hold for a moment... and slowly exhale through your mouth. Let's begin by focusing on your breath...`,
      relatedResources: [
        { id: 2, title: "10-Minute Morning Meditation", duration: "10 min", thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop" },
        { id: 3, title: "Breathing Exercises for Anxiety", duration: "7 min", thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" }
      ]
    },
    {
      id: 2,
      title: "Understanding Anxiety: A Complete Guide",
      description: "Comprehensive article explaining anxiety symptoms, triggers, and evidence-based coping strategies.",
      category: "anxiety-relief",
      type: "article",
      duration: "12 min read",
      durationInSeconds: 720,
      difficulty: "intermediate",
      rating: 4.6,
      completions: 892,
      thumbnail: "https://media.gettyimages.com/id/635960240/photo/unhappy-housewife-sitting-near-the-window.jpg?s=612x612&w=0&k=20&c=DpkBRm_DS6M2DQ8CHkrMlJwP_7LOgt9D_lf-9UDZk_c=",
      fullDescription: `Anxiety is one of the most common mental health challenges, affecting millions of people worldwide. This comprehensive guide will help you understand what anxiety is, how it manifests in your body and mind, and most importantly, what you can do about it.\n\nYou'll learn about different types of anxiety, common triggers, and evidence-based strategies that have helped countless individuals manage their anxiety effectively.`,
      keyPoints: [
        "Understand the difference between normal worry and anxiety disorders",
        "Identify your personal anxiety triggers",
        "Learn cognitive behavioral techniques",
        "Discover lifestyle changes that reduce anxiety"
      ]
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      description: "Audio-guided session to release physical tension and promote deep relaxation throughout your body.",
      category: "coping-strategies",
      type: "audio",
      duration: "9 min",
      durationInSeconds: 900,
      difficulty: "beginner",
      rating: 4.9,
      completions: 2156,
      thumbnail: "https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg",
      fullDescription: `Progressive Muscle Relaxation (PMR) is a powerful technique that involves tensing and then relaxing different muscle groups in your body. This audio session will guide you through the entire process, helping you release physical tension and achieve a state of deep relaxation.\n\nRegular practice of PMR can help reduce stress, improve sleep quality, and increase your overall sense of well-being.`,
      keyPoints: [
        "Learn to identify and release muscle tension",
        "Improve your sleep quality",
        "Reduce physical symptoms of stress",
        "Develop body awareness"
      ]
    },
    {
      id: 4,
      title: "Crisis Support Resources",
      description: "Essential information and immediate support resources for mental health crises and emergencies.",
      category: "crisis-support",
      type: "article",
      duration: "8 min read",
      durationInSeconds: 480,
      difficulty: "beginner",
      rating: 4.7,
      completions: 543,
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      fullDescription: `If you're experiencing a mental health crisis, you're not alone. This resource provides immediate support information, crisis hotlines, and step-by-step guidance on what to do when you or someone you know is in crisis.\n\nRemember: Crisis support is available 24/7, and seeking help is a sign of strength, not weakness.`,
      keyPoints: [
        "24/7 crisis hotline numbers",
        "How to recognize a mental health emergency",
        "Steps to take during a crisis",
        "Supporting someone else in crisis"
      ]
    },
    {
      id: 5,
      title: "Mindful Breathing Techniques",
      description: "Learn various breathing exercises to calm your mind and reduce stress in any situation.",
      category: "breathing-exercises",
      type: "video",
      duration: "12 min",
      durationInSeconds: 720,
      difficulty: "beginner",
      rating: 4.5,
      completions: 1834,
      thumbnail: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?w=400&h=300&fit=crop",
      fullDescription: `Breathing is something we do automatically, but when done mindfully, it becomes a powerful tool for managing stress and anxiety. This video teaches you several breathing techniques that you can use anywhere, anytime.\n\nFrom the simple 4-7-8 technique to box breathing used by Navy SEALs, you'll have a toolkit of breathing exercises to help you stay calm and centered.`,
      keyPoints: [
        "Master the 4-7-8 breathing technique",
        "Learn box breathing for focus",
        "Practice belly breathing for relaxation",
        "Use breath work for instant calm"
      ]
    },
    {
      id: 6,
      title: "Sleep Hygiene for Better Mental Health",
      description: "Discover how quality sleep impacts your mental well-being and learn practical tips for better rest.",
      category: "sleep-wellness",
      type: "article",
      duration: "10 min read",
      durationInSeconds: 600,
      difficulty: "intermediate",
      rating: 4.4,
      completions: 967,
      thumbnail: "https://images.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg?w=400&h=300&fit=crop",
      fullDescription: `Quality sleep is fundamental to good mental health. Poor sleep can worsen anxiety, depression, and stress, while good sleep hygiene can significantly improve your emotional well-being.\n\nThis comprehensive guide covers everything you need to know about creating the perfect sleep environment and developing habits that promote restorative rest.`,
      keyPoints: [
        "Understand the sleep-mental health connection",
        "Create an optimal sleep environment",
        "Develop a consistent bedtime routine",
        "Address common sleep disruptors"
      ]
    }
  ];

  const featuredResources = [
    {
      id: 1,
      title: "5-Minute Stress Relief Meditation",
      description: "Quick guided meditation for busy schedules",
      duration: "5 min",
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      matchReason: "Based on recent stress patterns"
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      description: "Release physical tension and promote relaxation",
      duration: "15 min",
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop",
      matchReason: "Matches your mood journal"
    },
    {
      id: 5,
      title: "Mindful Breathing Techniques",
      description: "Breathing exercises for instant calm",
      duration: "12 min",
      rating: 4.5,
      thumbnail: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?w=300&h=200&fit=crop",
      matchReason: "Popular this week"
    }
  ];

  const interactiveTools = [
    {
      id: 1,
      name: "4-7-8 Breathing Exercise",
      description: "Calming breathing technique to reduce anxiety and promote relaxation",
      type: "breathing",
      duration: 5.31,
      difficulty: "beginner",
      rating: 4.8,
      completions: 234,
      hasAudio: true,
      audioUrl: "/assets/audio/breathing_478.mp3"
    },
    {
      id: 2,
      name: "Body Scan Meditation",
      description: "Progressive relaxation technique to release tension throughout your body",
      type: "meditation",
      duration: 3,
      difficulty: "intermediate",
      rating: 4.7,
      completions: 189,
      hasAudio: true,
      audioUrl: "/assets/audio/body_scan.mp3"
    },
    {
      id: 3,
      name: "5-4-3-2-1 Grounding Technique",
      description: "Mindfulness exercise to bring you back to the present moment",
      type: "grounding",
      duration: 2.45,
      difficulty: "beginner",
      rating: 4.6,
      completions: 312,
      hasAudio: true,
      audioUrl: "/assets/audio/grounding_54321.mp3"
    },
    {
      id: 4,
      name: "Loving-Kindness Meditation",
      description: "Cultivate compassion and positive emotions towards yourself and others",
      type: "mindfulness",
      duration: 9.31,
      difficulty: "intermediate",
      rating: 4.9,
      completions: 156,
      hasAudio: true,
      audioUrl: "/assets/audio/love_kindness.mp3"
    },
    {
      id: 5,
      name: "Quick Stress Relief",
      description: "Rapid relaxation technique for immediate stress reduction",
      type: "relaxation",
      duration: 5.10,
      difficulty: "beginner",
      rating: 4.5,
      completions: 445,
      hasAudio: true,
      audioUrl: "/assets/audio/stress_relief.mp3"
    },
    {
      id: 6,
      name: "Mindful Walking Guide",
      description: "Transform your daily walk into a mindfulness practice",
      type: "mindfulness",
      duration: 6.47,
      difficulty: "beginner",
      rating: 4.4,
      completions: 98,
      hasAudio: true,
      audioUrl: "/assets/audio/mindful_walking.mp3"
    }
  ];

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('wellnessBookmarks');
    if (savedBookmarks) {
      setBookmarkedResources(new Set(JSON.parse(savedBookmarks)));
    }

    const savedCompleted = localStorage.getItem('completedResources');
    if (savedCompleted) {
      setCompletedResources(new Set(JSON.parse(savedCompleted)));
    }

    const categoryParam = searchParams?.get('category');
    if (categoryParam && categories?.some(cat => cat?.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const handleBookmark = (resourceId) => {
    const newBookmarks = new Set(bookmarkedResources);
    if (newBookmarks?.has(resourceId)) {
      newBookmarks?.delete(resourceId);
    } else {
      newBookmarks?.add(resourceId);
    }
    setBookmarkedResources(newBookmarks);
    localStorage.setItem('wellnessBookmarks', JSON.stringify([...newBookmarks]));
  };

  const handleResourceComplete = (resource) => {
    const newCompleted = new Set(completedResources);
    newCompleted?.add(resource?.id);
    setCompletedResources(newCompleted);
    localStorage.setItem('completedResources', JSON.stringify([...newCompleted]));

    const today = new Date()?.toDateString();
    const currentActivity = parseInt(localStorage.getItem(`resourceActivity_${today}`) || '0');
    localStorage.setItem(`resourceActivity_${today}`, (currentActivity + 1)?.toString());

    setShowResourceViewer(false);
  };

  
const handleResourceView = (resource) => {
  setSelectedResource(resource);
  setShowResourceViewer(true);
};


  const handleToolStart = (tool) => {
    console.log(`Starting interactive tool: ${tool?.name}`);
  };

  const getFilteredResources = () => {
    let filtered = mockResources;

    if (activeCategory !== 'all') {
      filtered = filtered?.filter(resource => resource?.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered?.filter(resource =>
        resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filters?.contentType !== 'all') {
      filtered = filtered?.filter(resource => resource?.type === filters?.contentType);
    }

    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(resource => resource?.difficulty === filters?.difficulty);
    }

    if (filters?.duration !== 'all') {
      filtered = filtered?.filter(resource => {
        const duration = resource?.durationInSeconds || 0;
        switch (filters?.duration) {
          case 'short': return duration < 300;
          case 'medium': return duration >= 300 && duration <= 900;
          case 'long': return duration > 900;
          default: return true;
        }
      });
    }

    switch (filters?.sortBy) {
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.completions - a?.completions);
        break;
      case 'duration':
        filtered?.sort((a, b) => (a?.durationInSeconds || 0) - (b?.durationInSeconds || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const getResourceCounts = () => {
    const counts = {};
    categories?.forEach(category => {
      counts[category.id] = mockResources?.filter(resource => resource?.category === category?.id)?.length;
    });
    return counts;
  };

  const filteredResources = getFilteredResources();
  const resourceCounts = getResourceCounts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Icon name="Heart" size={28} className="mr-3 text-primary" />
              Wellness Resources
            </h1>
            <p className="text-muted-foreground mt-2">
              Curated mental health content and interactive tools for your well-being journey
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={16} />
              <span>{mockResources?.length} resources</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Bookmark" size={16} />
              <span>{bookmarkedResources?.size} bookmarked</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={16} />
              <span>{completedResources?.size} completed</span>
            </div>
          </div>
        </div>

        <FeaturedContent
          featuredResources={featuredResources}
          onResourceSelect={handleResourceView}
          videoLink={videoLink}
        />

        <InteractiveTools
          tools={interactiveTools}
          onToolStart={handleToolStart}
        />

        <div className="space-y-6">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            resourceCounts={resourceCounts}
          />

          <SearchAndFilter
            onSearch={setSearchQuery}
            onFilter={setFilters}
            filters={filters}
            searchQuery={searchQuery}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {activeCategory === 'all' ? 'All Resources' : 
                 categories?.find(cat => cat?.id === activeCategory)?.name || 'Resources'}
              </h2>
              <div className="text-sm text-muted-foreground">
                {filteredResources?.length} {filteredResources?.length === 1 ? 'resource' : 'resources'} found
              </div>
            </div>

            {filteredResources?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      contentType: 'all',
                      duration: 'all',
                      difficulty: 'all',
                      sortBy: 'relevance'
                    });
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredResources?.map((resource) =>
    resource.type === "video" ? (
      <a
        key={resource.id}
        href={videoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <ResourceCard
          resource={resource}
          onBookmark={handleBookmark}
          isBookmarked={bookmarkedResources?.has(resource?.id)}
        />
      </a>
    ) : (
      <ResourceCard
        key={resource.id}
        resource={resource}
        onBookmark={handleBookmark}
        onView={() => handleResourceView(resource)}
        isBookmarked={bookmarkedResources?.has(resource?.id)}
      />
    )
  )}
</div>

            )}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 therapeutic-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-card-foreground mb-2">
                Need More Support?
              </h2>
              <p className="text-muted-foreground">
                Connect with our AI companion for personalized guidance and support
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => navigate('/chat-interface')}
              className="micro-feedback"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Start Chat
            </Button>
          </div>
        </div>
      </main>
      {showResourceViewer && selectedResource && (
  <ResourceViewer
    resource={selectedResource}
    videoLink={selectedResource.type === "video" ? videoLink : null}
    onClose={() => setShowResourceViewer(false)}
    onBookmark={handleBookmark}
    onComplete={handleResourceComplete}
    isBookmarked={bookmarkedResources?.has(selectedResource?.id)}
  />
)}
    </div>
  );
};

export default WellnessResources;