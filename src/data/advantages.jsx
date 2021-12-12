import React from "react"
import { AiFillClockCircle, AiFillDollarCircle } from "react-icons/ai"
import { FaShippingFast } from "react-icons/fa"

export const advantagesData = [
  {
    title: "Quick Order",
    description: "You can order home very quickly",
    icon: <AiFillClockCircle className="icon" />,
  },
  {
    title: "Fast Delivery",
    description: "Fast delivery for saving your time",
    icon: <FaShippingFast className="icon" />,
  },
  {
    title: "Best Place Offer",
    description: "Saving your money to be useful",
    icon: <AiFillDollarCircle className="icon" />,
  },
]
