import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import {
    Stripe,
    TypographyStyled,
    StyledCard
} from './styles';

const ListCard = ({ name, desc, id, color, count }) => {

    const [themeMode, setThemeMode] = React.useState('light');

    React.useEffect(() => {
        setThemeMode(localStorage.getItem('theme'));
    }, [localStorage.getItem('theme')]);

    return (
        <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
            <StyledCard >
                <Stripe $bgcolor={color} />
                <CardContent>
                    <TypographyStyled gutterBottom variant="h5" component="div">
                        {name}
                    </TypographyStyled>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <TypographyStyled variant="body2" >
                            {desc}
                        </TypographyStyled>
                        <TypographyStyled variant="body2" >
                            {count} - tasks
                        </TypographyStyled>
                    </div>
                </CardContent>
            </StyledCard>
        </ThemeProvider>
    );
}

export default ListCard;
