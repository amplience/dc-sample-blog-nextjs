import React, { ReactElement } from 'react';
import React, { ReactElement } from 'react';
import AutoComplete, { AutoCompleteCallbacks } from '../auto-complete/auto-complete';

const HeaderSearchBox = ({ placeholderText, onSuggestionSelected, onSuggestionCleared }: { placeholderText: string } & AutoCompleteCallbacks): ReactElement => {
  return (
    <>
      <AutoComplete placeholder={placeholderText} onSuggestionSelected={onSuggestionSelected} onSuggestionCleared={onSuggestionCleared} />=
    </>
  );
};

export default HeaderSearchBox;
