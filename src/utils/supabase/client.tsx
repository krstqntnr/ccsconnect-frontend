import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserRole = 'student' | 'college' | 'company' | 'mentor' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  department?: string;
  year?: number;
  email_verified: boolean;
  resume_url?: string;
  badges: string[];
  skills: string[];
  company_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  company_code: string;
  verified: boolean;
  contact_email: string;
  logo_url?: string;
  website?: string;
  created_at: string;
}

export interface Internship {
  id: string;
  company_id: string;
  title: string;
  description: string;
  department: string;
  skills_required: string[];
  stipend_range: string;
  location: string;
  start_date: string;
  end_date: string;
  application_deadline: string;
  conversion_possible: boolean;
  created_by: string;
  created_at: string;
  company?: Company;
}

export interface Application {
  id: string;
  internship_id: string;
  student_id: string;
  status: 'applied' | 'shortlisted' | 'interview' | 'offered' | 'rejected' | 'accepted' | 'completed';
  applied_at: string;
  updated_at: string;
  internship?: Internship;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  type: string;
  pinned: boolean;
  start_date: string;
  end_date: string;
  created_by: string;
  created_at: string;
}

// Auth helper functions
export const signInWithProvider = async (provider: 'google' | 'github' | 'linkedin') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
};

export const signInWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithPassword = async (email: string, password: string, userData: Partial<Profile>) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getProfile = async (userId: string): Promise<{ profile: Profile | null; error: any }> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { profile, error };
};

export const createProfile = async (profile: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single();
  
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};