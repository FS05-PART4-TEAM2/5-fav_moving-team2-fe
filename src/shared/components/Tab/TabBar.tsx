'use client';

import { colorChips } from '@/shared/styles/colorChips';
import styled from '@emotion/styled';
import { Tab, Tabs } from '@mui/material';
import React from 'react';

interface TabsProps {
  currentVal: string; // 현재 탭 고유 id
  firstVal: string; // 탭 고유 id
  firstLabel: string; // 탭 라벨
  secondVal: string;
  secondLabel: string;
  handleChange: (val: string) => void;
}

export const TabBar = ({ currentVal, firstVal, firstLabel, secondVal, secondLabel, handleChange }: TabsProps) => {
  return (
    <StyledTabs value={currentVal} onChange={(_, val) => handleChange(val)} variant="standard">
      <StyledTab value={firstVal} label={firstLabel}></StyledTab>
      <StyledTab value={secondVal} label={secondLabel}></StyledTab>
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)`
  width: fit-content;
  & .MuiTabs-indicator {
    background-color: transparent;
  }
  & .MuiTabs-flexContainer {
    gap: 32px;
  }
`;
const StyledTab = styled(Tab)`
  height: 54px;
  min-width: fit-content;
  padding: 0;
  font-family: 'pretendard';
  font-size: '14px';
  font-style: 'normal';
  font-weight: 700;
  line-height: '24px';
  color: ${colorChips.grayScale[400]};
  border-bottom: 2px solid transparent;

  &.Mui-selected {
    color: #2b2b2b;
    border-bottom: 2px solid ${colorChips.black[400]};
  }

  @media (min-width: 1200px) {
    font-size: 20px;
    line-height: 32px;
  }
`;
