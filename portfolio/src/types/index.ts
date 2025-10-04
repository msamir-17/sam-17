export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
  level: number;
  icon?: string;
}

export interface Internship {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description?: string;
  certificateUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  avatar?: string;
}

export interface Interest {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  description?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}