'use client'

import Image from 'next/image'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { GradientBackground } from '@b3-crow/ui-kit'

export function Footer() {
  return (
    <footer className="relative w-full bg-black px-8 py-12 overflow-hidden">
      <GradientBackground position="bottom" height="50vh" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="flex items-start">
            <Image
              src="/favicon.webp"
              alt="CROW Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/60 hover:text-white transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="text-white/60 hover:text-white transition-colors text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#documentation" className="text-white/60 hover:text-white transition-colors text-sm">
                  Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Developer Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  SDKs & Libraries
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Auth & Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <a href="mailto:CROW.B3@Gmail.com" className="text-white/60 hover:text-white transition-colors text-sm">
              Email: CROW.B3@Gmail.com
            </a>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mb-6"></div>

        <div className="text-center">
          <p className="text-white/40 text-sm">
            © 2025 CROW Inc. | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
