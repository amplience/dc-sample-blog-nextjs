import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './default.scss';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#dd1a5b' },
    secondary: { main: '#039be5' }
  }
});

interface DefaultLayoutProps {
  children: JSX.Element[];
  title: string;
  description?: string;
}

export default ({ children, title, description }: DefaultLayoutProps) => {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <ThemeProvider theme={theme}>
        <main>{children}</main>
      </ThemeProvider>
    </>
  );
};
