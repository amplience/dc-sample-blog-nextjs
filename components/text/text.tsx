import React from 'react';

interface TextProps {
  children: string;
}

const Text = ({ children }: TextProps) => <>{children}</>;

export default Text;
