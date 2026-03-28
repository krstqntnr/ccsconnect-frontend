import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building, ExternalLink, MapPin, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCompanies([
      { id: 'comp-1', name: 'Google', company_code: 'GOOGL', verified: true, contact_email: 'careers@google.com', logo_url: 'https://logo.clearbit.com/google.com', website: 'https://google.com', description: 'A multinational technology company that specializes in Internet-related services and products.', headquarters: 'Mountain View, CA', employees: '100,000+', founded: '1998' },
      { id: 'comp-2', name: 'Microsoft', company_code: 'MSFT', verified: true, contact_email: 'university@microsoft.com', logo_url: 'https://logo.clearbit.com/microsoft.com', website: 'https://microsoft.com', description: 'An American multinational technology corporation that develops computer software, consumer electronics, and related services.', headquarters: 'Redmond, WA', employees: '200,000+', founded: '1975' },
      { id: 'comp-3', name: 'Amazon', company_code: 'AMZN', verified: true, contact_email: 'university-recruiting@amazon.com', logo_url: 'https://logo.clearbit.com/amazon.com', website: 'https://amazon.com', description: 'An American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.', headquarters: 'Seattle, WA', employees: '1,500,000+', founded: '1994' },
    ]);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16"><h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Loading Companies...</h1></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Partner Companies</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Discover amazing companies offering internships and career opportunities</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="text-center"><div className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">{companies.length}+</div><div className="text-gray-600 dark:text-gray-400">Partner Companies</div></div>
          <div className="text-center"><div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div><div className="text-gray-600 dark:text-gray-400">Verified Partners</div></div>
          <div className="text-center"><div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div><div className="text-gray-600 dark:text-gray-400">Active Openings</div></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <motion.div key={company.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -8 }} className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {company.logo_url ? <img src={company.logo_url} alt={`${company.name} logo`} className="w-12 h-12 object-contain" onError={(e) => { e.target.style.display = 'none'; }} /> : <Building className="w-8 h-8 text-gray-400 dark:text-gray-500" />}
                  </div>
                  <CardTitle className="text-xl group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors dark:text-gray-100">{company.name}</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge className={company.verified ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}>{company.verified ? '✓ Verified' : 'Pending'}</Badge>
                    <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">{company.company_code}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{company.description || 'Leading technology company offering exciting internship opportunities.'}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400"><MapPin className="w-4 h-4 mr-2" /><span>{company.headquarters || 'Global'}</span></div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400"><Users className="w-4 h-4 mr-2" /><span>{company.employees || '10,000+'} employees</span></div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400"><Briefcase className="w-4 h-4 mr-2" /><span>Founded in {company.founded || '1990s'}</span></div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700" onClick={() => window.open(company.website, '_blank')}><ExternalLink className="w-4 h-4 mr-2" />Visit Website</Button>
                    <Button size="sm" className="flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600">View Openings</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want to Partner With Us?</h3>
            <p className="text-lg mb-6 opacity-90">Join our network of leading companies and connect with talented students</p>
            <Button variant="outline" className="bg-white text-gray-700 border-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">Contact Partnership Team</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};