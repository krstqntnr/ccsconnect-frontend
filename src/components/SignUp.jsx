import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Building, GraduationCap, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

const departments = ['Computer Science', 'Electronics and Communication', 'Mechanical Engineering', 'Civil Engineering', 'Information Technology', 'Electrical Engineering', 'Chemical Engineering', 'Biotechnology', 'MBA', 'Other'];
const years = ['1', '2', '3', '4', 'Final Year', 'Graduate'];

export const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', fullName: '', department: '', year: '', companyName: '', companyCode: '', collegeName: '' });

  const roles = [
    { id: 'student', label: 'Student', icon: User, color: 'from-blue-400 to-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/30', description: 'Find internships and build your career' },
    { id: 'college', label: 'College', icon: GraduationCap, color: 'from-green-400 to-green-500', bgColor: 'bg-green-50 dark:bg-green-900/30', description: 'Manage students and placement activities' },
    { id: 'company', label: 'Company', icon: Building, color: 'from-purple-400 to-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/30', description: 'Post opportunities and hire talent' },
  ];

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (formData.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Account created successfully! Please check your email for verification.');
    } catch (error) {
      toast.error(error.message || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const currentRole = roles.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Create Your Account</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Join CCSconnect and start your journey</p>
        </motion.div>

        <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="flex space-x-4 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            {roles.map(role => {
              const Icon = role.icon;
              const isActive = selectedRole === role.id;
              return (
                <motion.button key={role.id} onClick={() => setSelectedRole(role.id)} className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${isActive ? `${role.bgColor} shadow-md` : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`} />
                  <div className="text-left">
                    <div className={`font-semibold ${isActive ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>{role.label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">{role.description}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={selectedRole} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-md mx-auto">
            <Card className="border-0 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentRole.color} flex items-center justify-center mx-auto mb-4`}>
                  <currentRole.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">{currentRole.label} Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="fullName" className="dark:text-gray-300">Full Name</Label><Input id="fullName" type="text" placeholder="Enter your full name" className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="email" className="dark:text-gray-300">Email</Label><div className="relative"><Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" /><Input id="email" type="email" placeholder="Enter your email" className="pl-10 h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required /></div></div>

                  {selectedRole === 'student' && (
                    <>
                      <div className="space-y-2"><Label className="dark:text-gray-300">Department</Label><Select onValueChange={(v) => handleInputChange('department', v)}><SelectTrigger className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue placeholder="Select your department" /></SelectTrigger><SelectContent className="dark:bg-gray-800 dark:border-gray-700">{departments.map(d => <SelectItem key={d} value={d} className="dark:text-gray-200">{d}</SelectItem>)}</SelectContent></Select></div>
                      <div className="space-y-2"><Label className="dark:text-gray-300">Year</Label><Select onValueChange={(v) => handleInputChange('year', v)}><SelectTrigger className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue placeholder="Select your year" /></SelectTrigger><SelectContent className="dark:bg-gray-800 dark:border-gray-700">{years.map(y => <SelectItem key={y} value={y} className="dark:text-gray-200">{y}</SelectItem>)}</SelectContent></Select></div>
                    </>
                  )}
                  {selectedRole === 'company' && (
                    <>
                      <div className="space-y-2"><Label htmlFor="companyName" className="dark:text-gray-300">Company Name</Label><Input id="companyName" type="text" placeholder="Enter company name" className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} required /></div>
                      <div className="space-y-2"><Label htmlFor="companyCode" className="dark:text-gray-300">Company Code</Label><Input id="companyCode" type="text" placeholder="Enter company code" className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.companyCode} onChange={(e) => handleInputChange('companyCode', e.target.value)} required /></div>
                    </>
                  )}
                  {selectedRole === 'college' && (
                    <div className="space-y-2"><Label htmlFor="collegeName" className="dark:text-gray-300">College/Institution Name</Label><Input id="collegeName" type="text" placeholder="Enter college name" className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.collegeName} onChange={(e) => handleInputChange('collegeName', e.target.value)} required /></div>
                  )}

                  <div className="space-y-2"><Label htmlFor="password" className="dark:text-gray-300">Password</Label><div className="relative"><Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" /><Input id="password" type="password" placeholder="Create a password" className="pl-10 h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} required /></div></div>
                  <div className="space-y-2"><Label htmlFor="confirmPassword" className="dark:text-gray-300">Confirm Password</Label><div className="relative"><Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" /><Input id="confirmPassword" type="password" placeholder="Confirm your password" className="pl-10 h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} required /></div></div>

                  <Button type="submit" className="w-full h-12 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 mt-6" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Account'}</Button>
                </form>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">Already have an account?{' '}<button type="button" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 font-medium">Sign in here</button></p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};