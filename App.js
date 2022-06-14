import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import FindByName from "./src/view/FindByName";
import Alea from "./src/view/Alea";
import FavoriteList from "./src/view/FavoriteList";

export default function App() {

  const Tabs = createBottomTabNavigator();

  return (
      <NavigationContainer>
        <Tabs.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: '#282222'}}}>
          <Tabs.Screen name="home" component={Alea} options={{
            tabBarLabel: "Aléatoire",
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="view-list" color={color} size={size}/>
            ),
          }}/>
          <Tabs.Screen name="findByName" component={FindByName} initialParams={{ search: "Homer" }} options={{
            tabBarLabel: "Recherche",
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="magnify" color={color} size={size}/>
            ),
          }}/>
          <Tabs.Screen name="favorites" component={FavoriteList} options={{
            tabBarLabel: "Favoris",
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="heart" color={color} size={size}/>
            ),
          }}/>
        </Tabs.Navigator>
      </NavigationContainer>
  );
}
