import React, { ReactElement } from 'react';
import { CurrentRefinementsProvided, RefinementValue } from 'react-instantsearch-core';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import theme from '../../common/styles/default/theme';

const resetMenuSelectClasses = () =>
  Array.from(document.getElementsByClassName('MenuSelect')).forEach(el => el.classList.remove('selected'));

const ClearRefinements = ({ items, refine }: CurrentRefinementsProvided): ReactElement => (
  <>
    <button
      onClick={() => {
        resetMenuSelectClasses();
        refine((items as unknown) as RefinementValue[]);
      }}
      disabled={!items.length}
    >
      Clear filters
    </button>
    <style jsx>{`
      button[disabled] {
        background-color: ${theme.colors.mirage95};
        color: #2d3640;
      }

      button {
        background-color: #039be5;
        color: #fff;
        border-radius: 5px;
        border: none;
        padding: 10px 14px;
      }
    `}</style>
  </>
);

export default connectCurrentRefinements(ClearRefinements);
