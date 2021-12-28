import React from "react"
import styled from "styled-components"
import { IoMdSearch, IoMdClose } from "react-icons/io"
import { breakpoints, theme } from "../../styles/globalStyle"
import { useState } from "react"
import { useFilterContext } from "../../context/filterContext"

export default function SearchForm() {
  const { searchProducts } = useFilterContext()

  const [searchActive, setSearchActive] = useState(false)
  const [formValue, setformValue] = useState(null)

  const openSearch = () => {
    setSearchActive(true)
  }
  const closeSearch = () => {
    setSearchActive(false)
  }

  return (
    <SearchFormWrap className={searchActive && "opened"}>
      <div className="label-wrap">
        <IoMdSearch className="icon search" onClick={openSearch} />
        <label
          htmlFor="search"
          onClick={openSearch}
          className={formValue && !searchActive && "opened"}
        >
          {formValue && !searchActive
            ? `Search for "${formValue}"`
            : "Search something"}
        </label>
        <IoMdClose
          className={searchActive ? "icon close opened" : "icon close"}
          onClick={closeSearch}
        />
      </div>
      <input
        type="text"
        name="search"
        placeholder="Search"
        className={searchActive ? "opened" : undefined}
        onChange={e => {
          setformValue(e.target.value)
          searchProducts(e.target.value)
        }}
      />
    </SearchFormWrap>
  )
}

const SearchFormWrap = styled.div`
  background-color: ${theme.colors.white};
  padding: 1rem 1rem 0.9rem;
  border-radius: ${theme.roundings.large};
  width: 100%;
  line-height: 0;
  transition: ${theme.misc.transitionEase};

  &.opened {
    line-height: unset;
  }

  .label-wrap {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    width: 100%;

    & > * {
      cursor: pointer;
    }

    .icon {
      font-size: 1.5rem;
    }

    .search {
      color: ${theme.colors.secondary};
    }

    .close {
      position: relative;
      color: ${theme.colors.primary};
      transition: ${theme.misc.transitionEase};
      visibility: hidden;
      z-index: -2;

      &.opened {
        visibility: visible;
        z-index: unset;
      }
    }

    label {
      font-family: ${theme.fonts.primary};
      color: ${theme.colors.secondary};

      &.opened {
        color: ${theme.colors.primary};
      }
    }
  }

  input {
    position: relative;
    width: 100%;
    font-size: 0;
    font-family: ${theme.fonts.primary};
    border: none;
    outline: none;
    color: ${theme.colors.secondary};
    caret-color: ${theme.colors.primary};
    z-index: -2;
    padding: 0;
    opacity: 0;
    line-height: 0;
    transition: ${theme.misc.transitionEase};

    &.opened {
      font-size: ${theme.sizes.xlarge};
      padding: 1rem 0 0;
      z-index: unset;
      opacity: 1;
      line-height: unset;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 1.5rem 3rem 1.4rem;

    .label-wrap {
      gap: 1rem;

      .icon {
        font-size: 2.5rem;
      }

      label {
        font-size: ${theme.sizes.xlarge};
      }
    }

    input {
      &.opened {
        font-size: ${theme.headings.xlarge};
      }
    }
  }
`
