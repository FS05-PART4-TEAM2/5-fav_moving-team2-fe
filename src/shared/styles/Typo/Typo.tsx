import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { typographyStyles } from './TypoStyles';

export type TypoClassName =
  | 'text_B_32'
  | 'text_SB_32'
  | 'text_B_24'
  | 'text_SB_24'
  | 'text_M_24'
  | 'text_R_24'
  | 'text_B_20'
  | 'text_SB_20'
  | 'text_M_20'
  | 'text_B_18'
  | 'text_SB_18'
  | 'text_M_18'
  | 'text_R_18'
  | 'text_B_16'
  | 'text_SB_16'
  | 'text_M_16'
  | 'text_R_16'
  | 'text_B_14'
  | 'text_SB_14'
  | 'text_M_14'
  | 'text_R_14'
  | 'text_SB_13'
  | 'text_M_13'
  | 'text_SB_12'
  | 'text_M_12'
  | 'text_R_12'
  | 'modal_header';

interface CreateTypographyComponent extends TypographyProps {
  className: TypoClassName;
  content?: string;
  children?: React.ReactNode;
  customStyle?: React.CSSProperties;
}

export const Typo = (props: CreateTypographyComponent) => {
  const { content, className, children, customStyle, ...typographyProps } = props;
  const typoType = () => {
    // 기본
    return typographyStyles[className];
  };
  return (
    <Typography
      sx={typoType()}
      style={{
        ...customStyle,
      }}
      {...typographyProps}
    >
      {content}
      {children}
    </Typography>
  );
};
