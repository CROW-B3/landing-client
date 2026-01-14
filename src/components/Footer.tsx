'use client'

import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative w-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="flex items-start justify-center sm:justify-start md:col-span-1">
            <Image
              src="/favicon.webp"
              alt="CROW Logo"
              width={80}
              height={80}
              className="object-contain sm:w-[100px] sm:h-[100px]"
            />
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#documentation"
                  className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Developer Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  SDKs & Libraries
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Auth & Security
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Contact Us
            </h3>
            <a
              href="mailto:b3@bbyb.dev"
              className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm break-all"
            >
              Email: b3@bbyb.dev
            </a>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Connect
            </h3>
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <a
                href="https://www.instagram.com/crow_b3?igsh=N2xldXY3aGN0N3Jr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1EjusvyjRn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/crow-b3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mb-4 sm:mb-6"></div>

        <div className="text-center">
          <p className="text-white/40 text-xs sm:text-sm">
            © 2025 CROW Inc. | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
