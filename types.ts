import React from 'react';

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
  email?: string;
}

export interface SocialLink {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'Email';
  url: string;
  icon?: React.ReactNode;
}