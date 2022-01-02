import React from "react"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import dress from "../images/collection_imgs/dress.jpg"
import bestseller from "../images/collection_imgs/bestseller.jpg"
import pants from "../images/collection_imgs/pants.jpg"
import shirts from "../images/collection_imgs/shirts.jpg"

export const menuLinks = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "/products" },
]
export const collecttionLinks = [
  { title: "Dresses", path: "/products/collections/dresses", image: dress },
  { title: "Bestsellers", path: "/products", image: bestseller },
  {
    title: "Shirts and Tops",
    path: "/products/collections/shirts-and-tops",
    image: shirts,
  },
  {
    title: "Pants Suits",
    path: "/products/collections/pants-suits",
    image: pants,
  },
]

export const footerLinks = [
  { title: "Refund Policy", path: "/refund-policy" },
  { title: "Privacy Policy", path: "/privacy-policy" },
  { title: "Terms of Service", path: "/terms-of-service" },
  { title: "Shipping Policy", path: "/shipping-policy" },
]

export const socialLinks = [
  {
    title: "facebook",
    path: "https://www.facebook.com",
    icon: <FaFacebook className="icon" />,
  },
  {
    title: "twitter",
    path: "https://www.twitter.com",
    icon: <FaTwitter className="icon" />,
  },
  {
    title: "instagram",
    path: "https://www.instagram.com",
    icon: <FaInstagram className="icon" />,
  },
]
