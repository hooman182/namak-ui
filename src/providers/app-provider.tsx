
import QueryProvider from './query-provider';
import CustomThemeProvider from './theme-provider';

// ----------------------------------------------------------------------


export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <CustomThemeProvider>
        {children}
      </CustomThemeProvider>
    </QueryProvider>
  );
}
