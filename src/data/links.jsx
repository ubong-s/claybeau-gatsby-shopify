import React from "react"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"

export const menuLinks = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "/products" },
  { title: "Contact", path: "/contact-us" },
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
