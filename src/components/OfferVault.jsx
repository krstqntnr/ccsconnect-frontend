import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Eye, Upload, Shield, GitCompare, MapPin, DollarSign, Building, Calendar, Star, Filter, Search, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

const domains = ['Technology', 'Finance', 'Consulting', 'Marketing', 'Design', 'Operations', 'Research', 'Sales'];
const companiesList = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook', 'Netflix', 'Uber', 'Airbnb', 'Other'];

export function OfferVault() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [sortBy, setSortBy] = useState('salary');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState(new Set());

  const offers = [
    { id: '1', company: 'Google', role: 'Software Engineer Intern', type: 'internship', salary: 8000, currency: 'USD', location: 'Mountain View, CA', startDate: new Date(2024, 5, 1), duration: '12 weeks', benefits: ['Health Insurance', 'Free Meals', 'Transportation'], perks: ['Gym Access', 'Learning Budget', 'Team Events'], domain: 'Technology', ppoChance: 85, workMode: 'hybrid', uploadDate: new Date(2024, 10, 15), status: 'approved', studentName: 'Anonymous', description: 'Work on core infrastructure team focusing on distributed systems', companyRating: 4.8, growthOpportunity: 9, workLifeBalance: 7 },
    { id: '2', company: 'Microsoft', role: 'Product Manager Intern', type: 'internship', salary: 7500, currency: 'USD', location: 'Seattle, WA', startDate: new Date(2024, 5, 15), duration: '10 weeks', benefits: ['Health Insurance', 'Housing Stipend', 'Transportation'], perks: ['Microsoft Store Discount', 'Mentorship Program'], domain: 'Technology', ppoChance: 75, workMode: 'hybrid', uploadDate: new Date(2024, 10, 20), status: 'verified', studentName: 'Anonymous', description: 'Work with Microsoft Teams on new collaboration features', companyRating: 4.6, growthOpportunity: 8, workLifeBalance: 8 },
    { id: '3', company: 'Goldman Sachs', role: 'Investment Banking Analyst', type: 'full-time', salary: 150000, currency: 'USD', location: 'New York, NY', startDate: new Date(2024, 6, 1), benefits: ['Health Insurance', 'Dental', 'Vision', '401k Matching'], perks: ['Gym Membership', 'Meal Allowance', 'Transportation'], domain: 'Finance', workMode: 'onsite', uploadDate: new Date(2024, 9, 30), status: 'approved', studentName: 'Anonymous', description: 'Analyst position in Technology, Media & Telecom group', companyRating: 4.2, growthOpportunity: 9, workLifeBalance: 4 },
    { id: '4', company: 'Uber', role: 'Data Science Intern', type: 'internship', salary: 7000, currency: 'USD', location: 'San Francisco, CA', startDate: new Date(2024, 5, 1), duration: '12 weeks', benefits: ['Health Insurance', 'Free Rides', 'Meals'], perks: ['Learning Budget', 'Conference Attendance'], domain: 'Technology', ppoChance: 70, workMode: 'hybrid', uploadDate: new Date(2024, 11, 1), status: 'pending', studentName: 'Anonymous', description: 'Work on rider experience optimization using ML', companyRating: 4.3, growthOpportunity: 8, workLifeBalance: 6 },
  ];

  const toggleOfferSelection = (offerId) => {
    const newSelection = new Set(selectedOffers);
    if (newSelection.has(offerId)) newSelection.delete(offerId);
    else if (newSelection.size < 2) newSelection.add(offerId);
    setSelectedOffers(newSelection);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'verified': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'full-time': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'part-time': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.company.toLowerCase().includes(searchQuery.toLowerCase()) || offer.role.toLowerCase().includes(searchQuery.toLowerCase()) || offer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || offer.domain === selectedDomain;
    const matchesType = selectedType === 'all' || offer.type === selectedType;
    const matchesCompany = selectedCompany === 'all' || offer.company === selectedCompany;
    return matchesSearch && matchesDomain && matchesType && matchesCompany;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'salary': return b.salary - a.salary;
      case 'company': return a.company.localeCompare(b.company);
      case 'recent': return b.uploadDate.getTime() - a.uploadDate.getTime();
      default: return 0;
    }
  });

  const ComparisonView = () => {
    const selectedOffersList = Array.from(selectedOffers).map(id => offers.find(o => o.id === id)).filter(Boolean);
    if (selectedOffersList.length !== 2) return null;
    const [offer1, offer2] = selectedOffersList;

    const CompareField = ({ label, value1, value2, type = 'text' }) => {
      const formatValue = (value) => {
        switch (type) {
          case 'currency': return `$${value?.toLocaleString()}`;
          case 'rating': return `${value}/10`;
          default: return value?.toString() || 'N/A';
        }
      };
      const getBetter = () => {
        if (type === 'number' || type === 'currency' || type === 'rating') {
          if (value1 > value2) return 'left';
          if (value2 > value1) return 'right';
        }
        return 'equal';
      };
      const better = getBetter();
      return (
        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="font-medium text-gray-700 dark:text-gray-300">{label}</div>
          <div className={`text-center p-2 rounded ${better === 'left' ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800' : ''}`}>{formatValue(value1)}</div>
          <div className={`text-center p-2 rounded ${better === 'right' ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800' : ''}`}>{formatValue(value2)}</div>
        </div>
      );
    };

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Offer Comparison</h2>
          <p className="text-gray-600 dark:text-gray-400">Side-by-side comparison of your selected offers</p>
        </div>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div></div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{offer1.company}</h3>
                <p className="text-gray-600 dark:text-gray-400">{offer1.role}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{offer2.company}</h3>
                <p className="text-gray-600 dark:text-gray-400">{offer2.role}</p>
              </div>
            </div>
            <div className="space-y-0">
              <CompareField label="Salary" value1={offer1.salary} value2={offer2.salary} type="currency" />
              <CompareField label="Location" value1={offer1.location} value2={offer2.location} />
              <CompareField label="Work Mode" value1={offer1.workMode} value2={offer2.workMode} />
              <CompareField label="Company Rating" value1={offer1.companyRating} value2={offer2.companyRating} type="rating" />
              <CompareField label="Growth Opportunity" value1={offer1.growthOpportunity} value2={offer2.growthOpportunity} type="rating" />
              <CompareField label="Work-Life Balance" value1={offer1.workLifeBalance} value2={offer2.workLifeBalance} type="rating" />
              <CompareField label="Benefits Count" value1={offer1.benefits.length} value2={offer2.benefits.length} type="number" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[offer1, offer2].map((offer, i) => (
                <div key={i}>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Benefits & Perks</h4>
                  <div className="space-y-1">
                    {[...offer.benefits, ...offer.perks].map(item => (
                      <Badge key={item} variant="outline" className="mr-1 mb-1 text-xs dark:border-gray-600 dark:text-gray-300">{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <Shield className="w-8 h-8 text-orange-500 dark:text-orange-400" />
            Offer Letter Vault
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Secure storage and comparison of your offer letters</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={selectedOffers.size !== 2} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                <GitCompare className="w-4 h-4 mr-2" />Compare ({selectedOffers.size}/2)
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
              <DialogHeader><DialogTitle className="dark:text-gray-100">Offer Comparison</DialogTitle></DialogHeader>
              <ComparisonView />
            </DialogContent>
          </Dialog>
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                <Upload className="w-4 h-4 mr-2" />Upload Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700">
              <DialogHeader><DialogTitle className="dark:text-gray-100">Upload New Offer Letter</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Company name" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <Input placeholder="Role/Position" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="number" placeholder="Salary" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <Input placeholder="Location" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <Textarea placeholder="Additional details..." rows={3} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-600 dark:text-gray-400">Drop your offer letter here or click to browse</p>
                  <Button variant="outline" className="mt-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Choose File</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">Upload Offer</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[{ label: 'Total Offers', value: offers.length, icon: FileText }, { label: 'Avg Salary', value: '$85K', icon: DollarSign }, { label: 'Companies', value: new Set(offers.map(o => o.company)).size, icon: Building }, { label: 'Verified', value: offers.filter(o => o.status === 'verified').length, icon: Shield }].map((stat, index) => (
          <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <stat.icon className="w-8 h-8 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search offers by company, role, or location..."
              className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue placeholder="All Domains" /></SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Domains</SelectItem>
                {domains.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue placeholder="All Types" /></SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue placeholder="All Companies" /></SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Companies</SelectItem>
                {companiesList.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="salary">Highest Salary</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredOffers.map(offer => (
            <motion.div key={offer.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -4 }} className="group">
              <Card className={`h-full hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 ${selectedOffers.has(offer.id) ? 'ring-2 ring-orange-500 dark:ring-orange-400' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Checkbox
                          checked={selectedOffers.has(offer.id)}
                          onCheckedChange={() => toggleOfferSelection(offer.id)}
                          disabled={!selectedOffers.has(offer.id) && selectedOffers.size >= 2}
                          className="dark:border-gray-600"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{offer.company}</h3>
                      </div>
                      <p className="text-orange-600 dark:text-orange-400 font-medium">{offer.role}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className={getTypeColor(offer.type)}>{offer.type}</Badge>
                        <Badge variant="secondary" className={getStatusColor(offer.status)}>{offer.status}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">${offer.salary.toLocaleString()}/{offer.type === 'full-time' ? 'year' : 'month'}</span>
                      </div>
                      {offer.companyRating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{offer.companyRating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />{offer.location} • {offer.workMode}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />Starts {offer.startDate.toLocaleDateString()}{offer.duration && ` • ${offer.duration}`}
                    </div>
                    {offer.ppoChance && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-700 dark:text-gray-300">PPO Chance:</span> {offer.ppoChance}%
                      </div>
                    )}
                  </div>
                  {offer.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{offer.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {offer.benefits.slice(0, 3).map(b => (
                      <Badge key={b} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">{b}</Badge>
                    ))}
                    {offer.benefits.length > 3 && (
                      <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">+{offer.benefits.length - 3}</Badge>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Button variant="outline" size="sm" className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                      <Eye className="w-4 h-4 mr-1" />View
                    </Button>
                    <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                      <Download className="w-4 h-4 mr-1" />Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredOffers.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No offer letters found</h3>
          <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
}