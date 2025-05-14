import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'MedplumComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `medplum-components.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [
        'react', 
        'react-dom', 
        '@medplum/core', 
        '@medplum/react',
        '@mantine/core',
        'react-router',
        'react-router-dom'  // Add this line to fix the build error
      ],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@medplum/core': 'MedplumCore',
          '@medplum/react': 'MedplumReact',
          '@mantine/core': 'Mantine',
          'react-router': 'ReactRouter',
          'react-router-dom': 'ReactRouterDOM'  // Add this line
        }
      }
    }
  }
});