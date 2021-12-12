import React from "react"
import { Link } from "gatsby"
import { BsBagCheckFill } from "react-icons/bs"

export default function CartBtn() {
  return (
    <Link to="/cart">
      <button type="button" className="small-btn">
        <BsBagCheckFill />
      </button>
    </Link>
  )
}
