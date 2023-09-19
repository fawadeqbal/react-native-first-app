import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import CustomIcon from './src/components/Icon/Icon'; // Import the custom icon component
import { routes } from './src/routes/routes';

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate({ name: route.name }),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              const routeConfig = routes.find((r) => r.name === route.name);
              if (routeConfig && routeConfig.iconName) {
                // Use the custom icon component with the specified icon name
                return <CustomIcon name={routeConfig.iconName} size={24} color={color} />;
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const routeConfig = routes.find((r) => r.name === route.name);
              if (routeConfig && routeConfig.label) {
                return routeConfig.label;
              }

              return routeConfig ? routeConfig.title : route.title;
            }}
          />
        )}
      >
        {routes.map((route) => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              tabBarLabel: route.label,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
