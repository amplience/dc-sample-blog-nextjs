import React, { ReactElement } from 'react';
import { MenuProvided } from 'react-instantsearch-core';
import { connectMenu } from 'react-instantsearch-dom';
import { useRouter } from 'next/router';
import theme from '../../common/styles/default/theme';

const attributeSelected = (el: HTMLSelectElement) => {
  if (!el.value) {
    el.classList.remove('selected');
  } else {
    el.classList.add('selected');
  }
};

const MenuSelect = ({
  items,
  currentRefinement,
  refine,
  attribute
}: MenuProvided & { attribute: string }): ReactElement => {
  const router = useRouter();
  const isSelected = router.query[`menu[${attribute}]`] || false;
  return (
    <>
      <select
        className={isSelected ? 'selected' : ''}
        value={currentRefinement || ''}
        onChange={event => {
          attributeSelected(event.currentTarget);
          refine(event.currentTarget.value);
        }}
      >
        <option value="">See all options</option>
        {items.map(item => (
          <option key={item.label} value={item.isRefined ? currentRefinement : item.value}>
            {item.label} ({item.count})
          </option>
        ))}
      </select>
      <style jsx>{`
        select {
          font-family: 'Roboto', Arial, sans-serif;
          font-weight: ${theme.fonts.weight.regular};
          font-size: ${theme.fonts.size.small};
          margin: 6px 0;
          margin-right: 20px;
          width: 320px;
          background-color: #2d3640;
          border: 1px solid #4e555e;
          color: #999;
          padding: 5px;
          -webkit-appearance: none;
          background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' fill='%23999'><polygon points='0,0 80,0 40,40'/></svg>")
            no-repeat;
          background-size: 12px;
          background-position: calc(100% - 8px) 12px;
          background-repeat: no-repeat;
        }

        select.selected {
          background-color: #fff;
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          select {
            width: 180px;
          }
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          select {
            width: 220px;
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
};

export default connectMenu(MenuSelect);
