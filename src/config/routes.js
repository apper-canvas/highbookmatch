import Discover from '@/components/pages/Discover';
import Matches from '@/components/pages/Matches';
import Library from '@/components/pages/Library';
import Profile from '@/components/pages/Profile';
import Chat from '@/components/pages/Chat';

export const routes = [
  {
    id: 'discover',
    label: 'Discover',
    path: '/',
    icon: 'Heart',
    component: Discover
  },
  {
    id: 'matches',
    label: 'Matches',
    path: '/matches',
    icon: 'Users',
    component: Matches
  },
  {
    id: 'library',
    label: 'Library',
    path: '/library',
    icon: 'BookOpen',
    component: Library
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    component: Profile
  },
  {
    id: 'chat',
    label: 'Chat',
    path: '/chat/:matchId',
    icon: 'MessageCircle',
    component: Chat,
    hidden: true
  }
];