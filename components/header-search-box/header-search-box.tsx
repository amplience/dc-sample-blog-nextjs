import React, { ReactElement } from 'react';
import { SearchBox } from 'react-instantsearch-dom';
import theme from '../../common/styles/default/theme';

const HeaderSearchBox = ({ placeholderText }: { placeholderText: string }): ReactElement => {
  return (
    <>
      <SearchBox
        translations={{
          placeholder: placeholderText
        }}
        submit={
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.67"
              transform="translate(1 1)"
            >
              <circle cx="7.11" cy="7.11" r="7.11" />
              <path d="M16 16l-3.87-3.87" />
            </g>
          </svg>
        }
      />
      <style jsx global>
        {`
          /* clears the 'X' from Internet Explorer */
          input[type='search']::-ms-clear {
            display: none;
            width: 0;
            height: 0;
          }
          input[type='search']::-ms-reveal {
            display: none;
            width: 0;
            height: 0;
          }

          /* clears the 'X' from Chrome & Safari */
          input[type='search']::-webkit-search-decoration,
          input[type='search']::-webkit-search-cancel-button,
          input[type='search']::-webkit-search-results-button,
          input[type='search']::-webkit-search-results-decoration {
            display: none;
          }

          .ais-SearchBox-form {
            position: relative;
          }

          .ais-SearchBox {
            height: 57px;
            width: 460px;
            max-width: 100%;
          }

          .ais-SearchBox-input {
            height: 57px;
            background-color: #4a515a;
            color: ${theme.colors.silver};
            border-radius: 3px;
            font-size: 18px;
            width: 100%;
            border: none;
            padding-left: 56px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }

          .ais-SearchBox-input:focus,
          .ais-SearchBox-submit:focus,
          .ais-SearchBox-reset:focus {
            outline: none;
          }

          .ais-SearchBox .ais-SearchBox-input::placeholder {
            color: ${theme.colors.silver};
            font-style: italic;
            opacity: 1; /* Firefox */
          }

          .ais-SearchBox-input:-ms-input-placeholder {
            color: ${theme.colors.silver};
          }

          .ais-SearchBox-input::-ms-input-placeholder {
            color: ${theme.colors.silver};
          }

          .ais-SearchBox-input:focus {
            background-color: #fff;
            color: ${theme.colors.doveGray};
            border: 1px solid #039b35;
          }

          .ais-SearchBox-submit {
            align-items: center;
            display: flex;
            position: absolute;
            justify-content: center;
            transform: translateY(-50%);
            left: 0;
            top: 50%;
            height: 100%;
            color: ${theme.colors.silver};
            width: 64px;
          }

          .ais-SearchBox-reset {
            right: 0;
            color: ${theme.colors.silver};
          }

          .ais-SearchBox-reset,
          .ais-SearchBox-loadingIndicator,
          .ais-SearchBox-submit {
            align-items: center;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            display: flex;
            height: 100%;
            justify-content: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            border: 0;
            background: none;
          }

          @media (max-width: ${theme.layout.narrowPageWidth}) {
            .ais-SearchBox-input {
              padding-right: 42px;
              text-overflow: ellipsis;
            }
          }
        `}
      </style>
    </>
  );
};

export default HeaderSearchBox;
