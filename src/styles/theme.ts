import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      900: "#07060e",
      800: "#121223",
      700: "#202037",
      600: "#2f2f4a",
      500: "#3e405c",
      400: "#6a6e86",
      300: "#979cae",
      200: "#c6cad4",
      100: "#dfe2e7",
      50: "#f7f8f9",
    },
    primary: {
      100: "#f5f7fb",
      200: "#bbc5e0",
      300: "#8591c0",
      400: "#545c9c",
      500: "#272a74",
      600: "#1a1960",
      700: "#0f0c4b",
      800: "#080531",
      900: "#020113"
    }
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900'
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        rounded: 'none'
      },
      defaultProps: {
        colorScheme: 'primary'
      }
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 0,
          rounded: 'none'
        }
      },
      defaultProps: {
        focusBorderColor: 'blue.500',
        size: 'lg'
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 0,
          rounded: 'none'
        }
      },
      defaultProps: {
        focusBorderColor: 'blue.500',
        size: 'lg'
      }
    },
    Textarea: {
      baseStyle: {
        borderRadius: 0,
        rounded: 'none'
      },
      defaultProps: {
        focusBorderColor: 'blue.500',
        size: 'lg'
      }
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'primary'
      }
    },
    Radio: {
      defaultProps: {
        colorScheme: 'primary'
      }
    },
    Switch: {
      defaultProps: {
        colorScheme: 'primary'
      }
    }
  }
});