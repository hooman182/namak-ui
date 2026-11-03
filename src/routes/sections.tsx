import type { RouteObject } from 'react-router';

import { lazy } from 'react';

import { DashboardRouteContent } from 'src/routes/components/dashboard-route-content';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const LettersPage = lazy(() => import('src/pages/letters'));
export const LetterCreatePage = lazy(() => import('src/pages/letter-create'));
export const LetterDetailPage = lazy(() => import('src/pages/letter-detail'));
export const OrganizationsPage = lazy(() => import('src/pages/organizations'));
export const SignInPage = lazy(() => import('@/pages/auth/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <DashboardRouteContent />
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'letters', element: <LettersPage /> },
      { path: 'letters/new', element: <LetterCreatePage /> },
      { path: 'letters/:id', element: <LetterDetailPage /> },
      { path: 'organizations', element: <OrganizationsPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
