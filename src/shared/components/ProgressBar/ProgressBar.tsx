'use client';

import { useEffect, useState } from 'react';
import { LinearProgress, linearProgressClasses } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { colorChips } from '@/shared/styles/colorChips';

type ProgressBarProps =
  | {
      type: 'request';
      step: 1 | 2 | 3 | 4;
    }
  | {
      type: 'review';
      percentage: number;
    };

export default function ProgressBar(props: ProgressBarProps) {
  const isRequest = props.type === 'request';

  const targetValue = isRequest ? props.step * 25 : props.percentage;
  const filledColor = isRequest ? colorChips.primary[300] : colorChips.secondary.yellow[100];
  const emptyColor = isRequest ? colorChips.line['e6e6e6'] : colorChips.background['efefef'];
  const borderRadius = isRequest ? '30px' : '15px';
  const height: SxProps<Theme> = isRequest ? { height: { xs: '6px', md: '8px' } } : { height: '8px' };

  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!isRequest) return;

    let animationFrame: number;
    const speed = 1; // 속도 조절

    const animate = () => {
      setAnimatedValue((prev) => {
        const diff = targetValue - prev;
        if (Math.abs(diff) < 0.5) return targetValue; // 거의 도달하면 종료
        const next = prev + Math.sign(diff) * speed;
        return next;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue]);

  const value = isRequest ? animatedValue : targetValue;

  return (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        ...height,
        borderRadius: borderRadius,
        backgroundColor: emptyColor, // 비어있는 부분 색상
        [`& .${linearProgressClasses.bar}`]: {
          backgroundColor: filledColor, // 채워지는 부분 색상
          transition: 'width 0.4s ease',
          borderRadius: borderRadius,
        },
      }}
    />
  );
}
