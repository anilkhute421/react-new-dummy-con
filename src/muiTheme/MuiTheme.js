import {  createTheme } from '@mui/material/styles'

export const  theme = createTheme({

  palette:{
    primary:{
      main:'#145DA0'
    },
    seconday:{
main:'#2e8bc0'
    }
  },
  typography: {
    "fontFamily": `'Montserrat', sans-serif`,
  },
    components: {
      MuiButton: {
    
        variants: [
            {
              props: { variant: 'contained', color:'primary' },
         
                style: {
                    fontSize: '14px',
                    fontWeight:'600',
                    borderRadius:'10px',
                    boxShadow:'box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);',
                    background:'#145DA0',
                    color:'#fff',
                    padding:'12px 30px',
                    maxHeight:'40px',
                    textTransform:"none",
                },
            },
            {
              props: { variant: 'contained',color:'secondary' },
              style: {
                fontSize: '14px',
                fontWeight:'600',
                borderRadius:'10px',
                boxShadow:'box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);',
                background:'#2e8bc0',
                color:'#fff',
                padding:'12px 30px',
                maxHeight:'40px',
                textTransform:"none",
                '&:hover':{
                  background:'#2e8bd2',
                }
              },
                            
            },
          ],
      },
    
    },
    
  });
