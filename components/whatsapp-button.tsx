"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "./ui/button"

interface WhatsAppButtonProps {
  phoneNumber: string
  message: string
}

export default function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white"
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp Seller
    </Button>
  )
}
