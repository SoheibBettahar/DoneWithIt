import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";

import ListingEditScreen from "../screens/ListingEditScreen";
import defaultStyles from "../config/styles";
import NewListingButton from "./NewListingButton";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import routes from "./routes";
import { useNotifications } from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: defaultStyles.colors.primary,
        inactiveTintColor: defaultStyles.colors.medium,
      }}
    >
      <Tab.Screen
        name={routes.FEED}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={routes.LISTING_DETAILS}
        component={ListingEditScreen}
        options={{
          tabBarButton: ({ onPress }) => <NewListingButton onPress={onPress} />,
        }}
      />

      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
