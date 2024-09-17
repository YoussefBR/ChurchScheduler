"use client";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Home() {
  return (<div>
    <StyledButton variant="contained">Test</StyledButton>
  </div>)
}

const StyledButton = styled(Button)`
  padding: 5px
  color: blue
  '&:hover': {
    backgroundColor: '#ADD8E6',  // Custom hover color
  },
`