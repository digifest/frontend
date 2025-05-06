'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider } from '../contexts/modal-context';
import { Toaster as SonnerToaster } from 'sonner';
import { useEffect } from 'react';
import { useTheme } from '../store/global.store';
<<<<<<< HEAD
=======
import { useAuth } from '../store/auth.store';
>>>>>>> 22f74281f4efbc32b528d8d5a0e495cc18412196

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {},
	},
});

const Providers = ({ children }: React.PropsWithChildren) => {
<<<<<<< HEAD
	const { isDark: isDarkMode } = useTheme();

	const styleOptions = isDarkMode
		? {
				backgroundColor: '#131921',
				color: 'white',
				fontSize: '14px',
				borderColor: '#181f29',
		  }
		: {};

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<QueryClientProvider client={queryClient}>
			<SonnerToaster
				toastOptions={{
					style: styleOptions,
				}}
			/>
			<ModalProvider>{children}</ModalProvider>
			<ReactQueryDevtools client={queryClient} />
		</QueryClientProvider>
	);
=======
  const { isDark: isDarkMode } = useTheme();
  const { fetchUser } = useAuth();

  const styleOptions = isDarkMode
    ? {
        backgroundColor: '#131921',
        color: 'white',
        fontSize: '14px',
        borderColor: '#181f29',
      }
    : {};

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SonnerToaster
        toastOptions={{
          style: styleOptions,
        }}
        // richColors={true}
      />
      <ModalProvider>{children}</ModalProvider>
      <ReactQueryDevtools client={queryClient} />
    </QueryClientProvider>
  );
>>>>>>> 22f74281f4efbc32b528d8d5a0e495cc18412196
};

export default Providers;
