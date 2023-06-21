import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../utils/RootStackPrams";



type NavigationProp = StackNavigationProp<RootStackParamList, 'TaskHistory'>;

export const handleHistoryButtonPress = (navigation: NavigationProp): void => {
      navigation.navigate('TaskHistory');
    
  };
