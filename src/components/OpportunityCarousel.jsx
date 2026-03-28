import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign, Users, Building } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export const OpportunityCarousel = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpportunities([
        { id: "sample-1", title: 'Software Development Intern', company_id: 'comp-1', description: 'Join our engineering team to work on cutting-edge projects.', department: 'Computer Science', skills_required: ['React', 'Node.js', 'Python'], stipend_range: '₹80,000-1,00,000/month', location: 'Bangalore, India', start_date: '2024-06-01', end_date: '2024-08-31', application_deadline: '2024-03-15T23:59:59Z', conversion_possible: true },
        { id: "sample-2", title: 'Data Science Intern', company_id: 'comp-3', description: 'Analyze large datasets to drive business insights.', department: 'Data Science', skills_required: ['Python', 'Machine Learning', 'SQL'], stipend_range: '₹70,000-85,000/month', location: 'Chennai, India', start_date: '2024-06-15', end_date: '2024-08-15', application_deadline: '2024-03-20T23:59:59Z', conversion_possible: false },
        { id: "sample-3", title: 'Cloud Engineering Intern', company_id: 'comp-2', description: 'Work with Azure team to build scalable cloud solutions.', department: 'Computer Science', skills_required: ['C#', 'Azure', 'Docker'], stipend_range: '₹75,000-90,000/month', location: 'Hyderabad, India', start_date: '2024-05-15', end_date: '2024-08-31', application_deadline: '2024-03-01T23:59:59Z', conversion_possible: true },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleApply = async (internshipId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Loading Opportunities...</h2>
          </div>
          <div className="flex space-x-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-none w-80 bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const companyLogos = { 'comp-1': '🚀', 'comp-2': '💻', 'comp-3': '📦' };
  const companyNames = { 'comp-1': 'Google', 'comp-2': 'Microsoft', 'comp-3': 'Amazon' };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Recommended Opportunities</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Handpicked internships that match your skills and career aspirations</p>
        </motion.div>

        <div className="relative">
          <div className="flex overflow-x-auto pb-6 space-x-6 scrollbar-hide">
            {opportunities.map((opportunity, index) => {
              const logo = companyLogos[opportunity.company_id] || '🏢';
              const companyName = companyNames[opportunity.company_id] || 'Company';
              const isExpiringSoon = new Date(opportunity.application_deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

              return (
                <motion.div key={opportunity.id} className="flex-none w-80" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -8 }}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group dark:bg-gray-800 dark:border-gray-700">
                    {opportunity.conversion_possible && (
                      <div className="bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-500 dark:to-gray-600 text-white text-center py-2 text-sm font-medium">⭐ Conversion Possible</div>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl">{logo}</div>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">{opportunity.department}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors">{opportunity.title}</h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2"><Building className="w-4 h-4 mr-2" /><span>{companyName}</span></div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4"><MapPin className="w-4 h-4 mr-2" /><span>{opportunity.location}</span></div>
                      <div className="mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2"><DollarSign className="w-4 h-4 mr-2 text-green-500" /><span className="text-sm">{opportunity.stipend_range}</span></div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400"><Clock className="w-4 h-4 mr-2 text-blue-500" /><span className="text-sm">{new Date(opportunity.start_date).toLocaleDateString()} - {new Date(opportunity.end_date).toLocaleDateString()}</span></div>
                      </div>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {opportunity.skills_required?.slice(0, 3).map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">{skill}</Badge>
                          ))}
                          {opportunity.skills_required?.length > 3 && <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">+{opportunity.skills_required.length - 3} more</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Apply by {new Date(opportunity.application_deadline).toLocaleDateString()}</div>
                        {isExpiringSoon && <Badge variant="destructive" className="text-xs animate-pulse">Expires Soon</Badge>}
                      </div>
                      <Button className="w-full bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white group-hover:shadow-lg transition-all" size="sm" onClick={() => handleApply(opportunity.id)}>Apply Now</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {opportunities.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400 cursor-pointer transition-colors" />
              ))}
            </div>
          </div>
        </div>

        <motion.div className="text-center mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
          <Button variant="outline" size="lg" className="border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">View All Opportunities</Button>
        </motion.div>
      </div>
    </section>
  );
};