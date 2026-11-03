import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export type SparkleProps = {
  top: number;
  insetInlineStart: number | string;
  size: number;
  duration: number;
  delay: number;
};

export function Sparkle({ top, insetInlineStart, size, duration, delay }: SparkleProps) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={(theme) => ({
        position: 'absolute',
        top,
        insetInlineStart,
        width: size,
        height: size,
        pointerEvents: 'none',
        color: theme.vars.palette.primary.light,
        animation: `sparkle ${duration}s ease-in-out ${delay}s infinite`,
        '@keyframes sparkle': {
          '0%, 100%': { opacity: 0, transform: 'translate3d(0, 0, 0) scale(0.4) rotate(0deg)' },
          '25%': { opacity: 1, transform: 'translate3d(1px, -2px, 0) scale(1) rotate(45deg)' },
          '50%': { opacity: 0.9, transform: 'translate3d(3px, -4px, 0) scale(0.85) rotate(90deg)' },
          '75%': { opacity: 0.6, transform: 'translate3d(5px, -6px, 0) scale(0.6) rotate(135deg)' },
        },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0.6 },
      })}
    >
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
      </svg>
    </Box>
  );
}
