import React, { ReactElement } from 'react';

interface TextProps {
  children: string;
}

const Text = ({ children }: TextProps): ReactElement => <>{children}</>;

export default Text;
