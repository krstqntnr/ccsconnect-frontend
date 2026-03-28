import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Download, Eye, Heart, Star, Filter, Clock, User, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const resourceTypes = {
  guide: { icon: '📖', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  template: { icon: '📄', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  questions: { icon: '❓', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  papers: { icon: '📋', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  video: { icon: '🎥', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
  article: { icon: '📰', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
};

const categories = {
  interview: { icon: '🎯', color: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' },
  resume: { icon: '📝', color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' },
  coding: { icon: '💻', color: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' },
  communication: { icon: '💬', color: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' },
  aptitude: { icon: '🧠', color: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' },
  hr: { icon: '👥', color: 'bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-800' },
  technical: { icon: '⚙️', color: 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700' },
};

export function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [favorites, setFavorites] = useState(new Set());

  const resources = [
    { id: '1', title: 'Complete Interview Preparation Guide', description: 'Comprehensive guide covering technical interviews, behavioral questions, and negotiation strategies.', type: 'guide', category: 'interview', tags: ['interview', 'preparation', 'technical', 'behavioral'], author: 'Career Services', publishDate: new Date(2024, 10, 15), difficulty: 'intermediate', downloadCount: 1247, rating: 4.8, duration: '45 min read' },
    { id: '2', title: 'Modern Resume Template Collection', description: 'Professional resume templates optimized for ATS systems and various industries.', type: 'template', category: 'resume', tags: ['resume', 'template', 'ATS', 'design'], author: 'Design Team', publishDate: new Date(2024, 10, 20), difficulty: 'beginner', downloadCount: 2156, rating: 4.9, size: '2.3 MB' },
    { id: '3', title: 'Top 100 Data Structures Questions', description: 'Curated list of most frequently asked DSA questions with detailed solutions.', type: 'questions', category: 'coding', tags: ['DSA', 'algorithms', 'coding', 'practice'], author: 'Tech Alumni', publishDate: new Date(2024, 10, 10), difficulty: 'advanced', downloadCount: 3421, rating: 4.7 },
    { id: '4', title: 'Communication Skills Masterclass', description: 'Video series on effective communication, public speaking, and presentation skills.', type: 'video', category: 'communication', tags: ['communication', 'soft-skills', 'presentation'], author: 'Prof. Sarah Johnson', publishDate: new Date(2024, 9, 25), difficulty: 'intermediate', downloadCount: 987, rating: 4.6, duration: '2.5 hours' },
    { id: '5', title: 'Quantitative Aptitude Practice Papers', description: 'Previous year aptitude test papers from top companies with solutions.', type: 'papers', category: 'aptitude', tags: ['aptitude', 'quantitative', 'practice', 'placement'], author: 'Placement Cell', publishDate: new Date(2024, 9, 30), difficulty: 'intermediate', downloadCount: 1876, rating: 4.5, size: '5.7 MB' },
    { id: '6', title: 'HR Round Success Strategies', description: 'Article covering common HR questions, STAR method, and salary negotiation tips.', type: 'article', category: 'hr', tags: ['HR', 'behavioral', 'negotiation', 'STAR'], author: 'HR Expert', publishDate: new Date(2024, 11, 1), difficulty: 'beginner', downloadCount: 654, rating: 4.4, duration: '20 min read' },
  ];

  const toggleFavorite = (resourceId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(resourceId)) newFavorites.delete(resourceId);
    else newFavorites.add(resourceId);
    setFavorites(newFavorites);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase()) || resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.downloadCount - a.downloadCount;
      case 'rating': return b.rating - a.rating;
      default: return b.publishDate.getTime() - a.publishDate.getTime();
    }
  });

  const favoriteResources = resources.filter(r => favorites.has(r.id));

  const ResourceCard = ({ resource }) => (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -4 }} className="group">
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${resourceTypes[resource.type].color}`}><span className="text-lg">{resourceTypes[resource.type].icon}</span></div>
              <div>
                <CardTitle className="text-lg line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors dark:text-gray-100">{resource.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`${categories[resource.category].color} dark:bg-transparent`}>{categories[resource.category].icon} {resource.category}</Badge>
                  <Badge variant="secondary" className={resourceTypes[resource.type].color}>{resource.type}</Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toggleFavorite(resource.id)} className="opacity-0 group-hover:opacity-100 transition-opacity dark:text-gray-400 dark:hover:text-gray-200">
              <Heart className={`w-4 h-4 ${favorites.has(resource.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{resource.description}</p>
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300"><Tag className="w-3 h-3 mr-1" />{tag}</Badge>
            ))}
            {resource.tags.length > 3 && (
              <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">+{resource.tags.length - 3}</Badge>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1"><User className="w-4 h-4" />{resource.author}</div>
              {resource.duration && <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{resource.duration}</div>}
            </div>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{resource.rating}</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"><Download className="w-4 h-4" />{resource.downloadCount.toLocaleString()} downloads</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"><Eye className="w-4 h-4 mr-1" />Preview</Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"><Download className="w-4 h-4 mr-1" />Download</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-orange-500 dark:text-orange-400" />
          Resource Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Curated collection of guides, templates, and resources to help you succeed in your placement journey</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, guides, templates..."
            className="pl-10 h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(categories).map(([key, cat]) => (
                <SelectItem key={key} value={key}>{cat.icon} {key.charAt(0).toUpperCase() + key.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(resourceTypes).map(([key, t]) => (
                <SelectItem key={key} value={key}>{t.icon} {key.charAt(0).toUpperCase() + key.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Downloaded</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto dark:bg-gray-800 dark:text-gray-200">
          <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-700">All Resources</TabsTrigger>
          <TabsTrigger value="favorites" className="dark:data-[state=active]:bg-gray-700">My Favorites ({favorites.size})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(key)}
                className={`p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${
                  selectedCategory === key
                    ? 'border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/20'
                    : 'border-gray-200 hover:border-orange-300 bg-white dark:border-gray-700 dark:bg-gray-800'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium capitalize dark:text-gray-200">{key}</div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredResources.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
            </AnimatePresence>
          </div>
          {filteredResources.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No resources found</h3>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {favoriteResources.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
            </AnimatePresence>
          </div>
          {favoriteResources.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No favorites yet</h3>
              <p className="text-gray-500 dark:text-gray-500">Start adding resources to your favorites to see them here</p>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}