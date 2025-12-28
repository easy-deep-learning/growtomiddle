'use client';

import React from 'react';
import { Typography as OriginTypography } from 'antd';
import type { LinkProps } from 'antd/es/typography/Link';
import type { ParagraphProps } from 'antd/es/typography/Paragraph';
import type { TextProps } from 'antd/es/typography/Text';
import type { TitleProps } from 'antd/es/typography/Title';

const Title = React.forwardRef<HTMLElement, TitleProps & React.RefAttributes<HTMLElement>>(
  (props, ref) => <OriginTypography.Title ref={ref} {...props} />
);
Title.displayName = 'Title';

const Paragraph = React.forwardRef<HTMLElement, ParagraphProps & React.RefAttributes<HTMLElement>>(
  (props, ref) => <OriginTypography.Paragraph ref={ref} {...props} />
);
Paragraph.displayName = 'Paragraph';

const Link = React.forwardRef<HTMLElement, LinkProps & React.RefAttributes<HTMLElement>>(
  (props, ref) => <OriginTypography.Link ref={ref} {...props} />
);
Link.displayName = 'Link';
const Text = React.forwardRef<HTMLElement, TextProps & React.RefAttributes<HTMLElement>>(
  (props, ref) => <OriginTypography.Text ref={ref} {...props} />
);
Text.displayName = 'Text';

export { Title, Paragraph, Link, Text };
