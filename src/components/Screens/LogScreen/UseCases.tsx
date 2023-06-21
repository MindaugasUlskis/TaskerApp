import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../utils/RootStackPrams";
import { validateInputs } from "../../../utils/helperFunctions/InputValidator";


/**
 * handleLogin function validates users inputs by using validator library.
 * And gives further options such as printing out errors or pushes user further in the navigation stack.
 */
interface LoginInput {
  email: string;
  password: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const handleLogin = ({ email, password }: LoginInput, navigation: NavigationProp): void => {
    const errors = validateInputs({ email, password });
  
    if (Object.keys(errors).length === 0) {
      // Login logic here
      console.log('Login successful!');
      navigation.navigate('Main');
    } else {
      console.log(errors);
      // Display validation errors to user
    }
  };
