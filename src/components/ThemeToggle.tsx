import { ActionIcon, useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { IconPalette } from '@tabler/icons-react';
import { useThemeContext } from '../ThemeContext';

export function ThemeToggle() {
  const { toggleTheme, isOrangeTheme } = useThemeContext();
  const theme = useMantineTheme();

  return (
    <ActionIcon
      onClick={toggleTheme}
      variant="subtle"
      size="md"
      aria-label="Toggle theme"
      color={isOrangeTheme ? 'primary' : 'gray'}
    >
      <IconPalette size="1.2rem" />
    </ActionIcon>
  );
}