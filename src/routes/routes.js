import { HomeScreen } from '../screens/Home';
import Todo from '../screens/Todo';
import Profile from '../screens/Profile';

export const routes = [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    iconName: 'home',
  },
  {
    name: 'Todo',
    component: Todo,
    label: 'Todos',
    iconName: 'list', // Use the name of the icon you want from the library
  },
  {
    name: 'Profile',
    component: Profile,
    label: 'Profile',
    iconName: 'account-circle',
  },
  // Add more routes as needed
];
