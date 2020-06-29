import React, { Component, ReactNode } from 'react';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest, { OnSuggestionSelected, InputProps, ChangeEvent, RenderInputComponent } from 'react-autosuggest';
import { Hit, AutocompleteProvided, BasicDoc } from 'react-instantsearch-core';

export interface AutoCompleteCallbacks {
  refine?: (input?: string) => string;
  onSuggestionSelected: OnSuggestionSelected<BasicDoc>;
  onSuggestionCleared: () => void;
}

export interface AutoCompleteProps {
  placeholder: string;
}

class AutoComplete extends Component<AutoCompleteProps & AutoCompleteCallbacks & AutocompleteProvided> {
  state = {
    value: this.props.currentRefinement
  };

  onChange = (_: unknown, { newValue }: ChangeEvent) => {
    if (!newValue) {
      this.props.onSuggestionCleared();
    }

    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit: Hit): string {
    return hit.title;
  }

  renderSuggestion(hit: Hit) {
    return <Highlight attribute="title" hit={hit} tagName="mark" />;
  }

  renderInputComponent : RenderInputComponent<BasicDoc> = (inputProps) => {
    return (
      <div>
        <input {...inputProps} />
        <div className={'searchIcon'}>
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
        </div>
      </div>
    );
  };

  render() {
    const { hits, onSuggestionSelected } = this.props;
    const { value } = this.state;

    const inputProps: InputProps<BasicDoc> = {
      placeholder: this.props.placeholder,
      onChange: this.onChange,
      value
    };

    return (
      <>
        <AutoSuggest
          suggestions={hits}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
        />
        <style jsx global>{`
          .searchIcon {
            align-items: center;
            display: flex;
            position: absolute;
            justify-content: center;
            transform: translateY(-50%);
            left: 0;
            top: 50%;
            height: 100%;
            color: #ccc;
            width: 64px;
          }

          .react-autosuggest__container {
            position: relative;
            width: 460px;
          }

          .react-autosuggest__input {
            width: 460px;
            height: 57px;
            background-color: #4a515a;
            color: #ccc;
            border-radius: 3px;
            box-shadow: 0 4px 48px 0 rgba(0, 0, 0, 0.2);
            font-size: 18px;
            width: 100%;
            border: none;
            padding-left: 56px;
          }

          .react-autosuggest__input--focused {
            outline: none;
          }

          .react-autosuggest__input--open {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          .react-autosuggest__suggestions-container {
            display: none;
          }

          .react-autosuggest__suggestions-container--open {
            display: block;
            position: absolute;
            top: 51px;
            width: 460px;
            border: 1px solid #aaa;
            background-color: #fff;
            font-family: Helvetica, sans-serif;
            font-weight: 300;
            font-size: 16px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            z-index: 2;
          }

          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 20px;
          }

          .react-autosuggest__suggestion--highlighted {
            background-color: #ddd;
          }
        `}</style>
      </>
    );
  }
}

export default connectAutoComplete(AutoComplete);
