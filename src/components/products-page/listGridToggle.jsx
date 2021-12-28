import React from "react"
import styled from "styled-components"
import { IoIosList } from "react-icons/io"
import { IoGridOutline } from "react-icons/io5"
import { theme, breakpoints } from "../../styles/globalStyle"
import { useFilterContext } from "../../context/filterContext"

export default function ListGridToggle() {
  const { activateListView, activateGridView, listView } = useFilterContext()
  return (
    <ListGrid>
      <IoIosList
        onClick={activateListView}
        className={listView ? "icon active" : "icon"}
      />
      <IoGridOutline
        onClick={activateGridView}
        className={!listView ? "icon active" : "icon"}
      />
    </ListGrid>
  )
}

const ListGrid = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  line-height: 0;

  .icon {
    cursor: pointer;
    font-size: 2rem;
    padding: 0.25rem;
    border: 1px solid ${theme.colors.gray6};
    border-radius: ${theme.roundings.medium};

    &:nth-of-type(1) {
      border-width: 1px 0 1px 1px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:nth-of-type(2) {
      border-width: 1px 1px 1px 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &.active {
      position: relative;
      background-color: ${theme.colors.white};
      border-radius: ${theme.roundings.medium};
      color: ${theme.colors.primary};
      border: none;
      font-size: 2.5rem;
      z-index: 1;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    .icon {
      font-size: 2.25rem;

      &.active {
        font-size: 2.75rem;
      }
    }
  }
`
