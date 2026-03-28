import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, DollarSign, Building, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

export const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (id) {
      const sampleOpportunity = {
        id,
        title: 'Software Development Intern',
        company_id: 'comp-1',
        company_name: 'Google',
        description: `Join Google's engineering team to work on cutting-edge projects that impact billions of users worldwide.\n\nAs a Software Development Intern, you'll be mentored by senior engineers and contribute to real products. This internship offers hands-on experience with large-scale systems, modern development practices, and the opportunity to work on projects that shape the future of technology.\n\nKey Responsibilities:\n• Design and develop software solutions for complex problems\n• Collaborate with cross-functional teams including product managers and designers\n• Write clean, efficient, and well-documented code\n• Participate in code reviews and technical discussions\n• Contribute to open-source projects and internal tools`,
        department: 'Computer Science',
        skills_required: ['JavaScript', 'Python', 'React', 'Node.js', 'Docker', 'Kubernetes'],
        stipend_range: '₹80,000-1,00,000/month',
        location: 'Bangalore, India',
        start_date: '2024-06-01',
        end_date: '2024-08-31',
        application_deadline: '2024-03-15T23:59:59Z',
        conversion_possible: true,
        requirements: ["Currently pursuing Bachelor's or Master's degree in Computer Science or related field", 'Strong programming skills in at least one language (Python, Java, C++, JavaScript)', 'Understanding of data structures and algorithms', 'Experience with web development frameworks', 'Good communication skills and ability to work in a team', 'CGPA of 7.5 or above'],
        benefits: ['Competitive stipend', 'Mentorship from senior engineers', "Access to Google's learning resources", 'Networking opportunities', 'Certificate of completion', 'Potential for full-time offer'],
      };
      setOpportunity(sampleOpportunity);
      setIsLoading(false);
    }
  }, [id]);

  const handleApply = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasApplied(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Opportunity Not Found</h1>
          <Button onClick={() => navigate('/opportunities')}><ArrowLeft className="w-4 h-4 mr-2" />Back to Opportunities</Button>
        </div>
      </div>
    );
  }

  const isExpired = new Date(opportunity.application_deadline) < new Date();
  const daysLeft = Math.ceil((new Date(opportunity.application_deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/opportunities')}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />Back to Opportunities
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{opportunity.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center"><Building className="w-5 h-5 mr-2" /><span className="font-medium">{opportunity.company_name}</span></div>
                    <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" /><span>{opportunity.location}</span></div>
                  </div>
                </div>
                <div className="text-4xl">🚀</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">{opportunity.department}</Badge>
                {opportunity.conversion_possible && <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300">Conversion Possible</Badge>}
                {daysLeft <= 7 && daysLeft > 0 && <Badge variant="destructive">Expires in {daysLeft} days</Badge>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3"><DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" /><div><div className="text-sm text-gray-500 dark:text-gray-400">Stipend</div><div className="font-semibold text-gray-800 dark:text-gray-200">{opportunity.stipend_range}</div></div></div>
                <div className="flex items-center space-x-3"><Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" /><div><div className="text-sm text-gray-500 dark:text-gray-400">Duration</div><div className="font-semibold text-gray-800 dark:text-gray-200">{new Date(opportunity.start_date).toLocaleDateString()} - {new Date(opportunity.end_date).toLocaleDateString()}</div></div></div>
                <div className="flex items-center space-x-3"><Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" /><div><div className="text-sm text-gray-500 dark:text-gray-400">Apply by</div><div className="font-semibold text-gray-800 dark:text-gray-200">{new Date(opportunity.application_deadline).toLocaleDateString()}</div></div></div>
              </div>
              <Separator className="dark:bg-gray-700" />
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">About this Internship</h3>
                {opportunity.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Requirements</h3>
              <ul className="space-y-3">
                {opportunity.requirements.map((req, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">What You'll Get</h3>
              <ul className="space-y-3">
                {opportunity.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="sticky top-32">
              <Card className="border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-gray-100">Apply Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills_required.map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator className="dark:bg-gray-700" />
                  <div className="text-center">
                    {hasApplied ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-semibold">Application Submitted</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">You have successfully applied for this internship. We'll notify you about the next steps.</p>
                      </div>
                    ) : isExpired ? (
                      <div className="text-center">
                        <p className="text-red-600 dark:text-red-400 font-semibold mb-2">Application Deadline Passed</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This internship is no longer accepting applications.</p>
                      </div>
                    ) : (
                      <Button onClick={handleApply} className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white h-12" size="lg">
                        Apply for this Internship
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">By applying, you agree to our terms and conditions</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};