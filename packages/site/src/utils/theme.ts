import 'styled-components';
import { lightTheme } from '@ensdomains/thorin';

type ExtendedTheme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ExtendedTheme {}
}
