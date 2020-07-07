import React, { ReactElement } from 'react';
import { MenuProvided } from 'react-instantsearch-core';
import { connectMenu } from 'react-instantsearch-dom';
import { useRouter } from 'next/router';

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
          margin-right: 20px;
          width: 320px;
          background-color: #2d3640;
          border: 1px solid #4e555e;
          color: #999;
          padding: 5px;
        }

        select.selected {
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default connectMenu(MenuSelect);
