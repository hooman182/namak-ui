import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import { mergeClasses } from 'minimal-shared/utils';

import GlobalStyles from '@mui/material/GlobalStyles';
import { styled, useColorScheme } from '@mui/material/styles';

import { layoutClasses } from './classes';
import { resolveSchemeMode, layoutSectionVars, layoutBackgroundSelectors } from './css-vars';

// ----------------------------------------------------------------------

export type LayoutSectionProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
};

export function LayoutSection({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  sidebarSection,
  className,
  ...other
}: LayoutSectionProps) {
  const { colorScheme } = useColorScheme();

  const inputGlobalStyles = (
    <GlobalStyles
      styles={(theme) => ({
        body: { ...layoutSectionVars(theme, resolveSchemeMode(theme, colorScheme)), ...cssVars },
        ...layoutBackgroundSelectors,
      })}
    />
  );

  return (
    <>
      {inputGlobalStyles}

      <LayoutRoot
        id="root__layout"
        className={mergeClasses([layoutClasses.root, className])}
        sx={sx}
        {...other}
      >
        {sidebarSection ? (
          <>
            {sidebarSection}
            <LayoutSidebarContainer className={layoutClasses.sidebarContainer}>
              {headerSection}
              {children}
              {footerSection}
            </LayoutSidebarContainer>
          </>
        ) : (
          <>
            {headerSection}
            {children}
            {footerSection}
          </>
        )}
      </LayoutRoot>
    </>
  );
}

// ----------------------------------------------------------------------

const LayoutRoot = styled('div')(() => ({
  background: 'var(--layout-background)',
}));

const LayoutSidebarContainer = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
}));
