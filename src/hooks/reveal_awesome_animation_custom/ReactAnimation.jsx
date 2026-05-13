// src/components/Reveal.jsx
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0)); }
`;

export const SlideUp = ({ children, delay = 0, cascade = false, damping = 0.3 }) => {
  return (
    <Reveal keyframes={slideUp} duration={300} delay={delay} triggerOnce fraction={0.2} cascade={cascade} damping={damping}>
      {children}
    </Reveal>
  );
};