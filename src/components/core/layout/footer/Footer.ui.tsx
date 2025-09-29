// 📦 Third-Party imports
import { Copyright, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '~core/ui/shadcn/accordion';

// 📦 Internal imports
import { containerDefault, flexBetween, flexCenter } from '~styles/tw-custom';
import { footerLinks, socialsData } from './local';

// 🧾 Local types
interface PropsT {
  isHomePage?: boolean;
}

// ⚙️ Functional component
export default function FooterUi({ isHomePage }: PropsT) {
  return (
    <footer className={clsx('mt-32 w-screen', isHomePage && 'mb-12')}>
      <div className="w-full bg-gradient-to-r from-neutral-950 from-15% via-neutral-800 to-neutral-950 to-85% pt-8 pb-4">
        {/* Footer content */}
        <div className={containerDefault}>
          {/* Logo */}
          <div className="flex justify-center sm:justify-start">
            <Link href={'/'}>
              <Image
                src={'/svgs/logo/logo-text.svg'}
                width={280}
                height={56}
                alt="Crypto Verse"
                className="hidden sm:block"
              />
              <Image
                src={'/svgs/logo/logo-text.svg'}
                width={236}
                height={52}
                alt="Crypto Verse"
                className="sm:hidden"
              />
            </Link>
          </div>

          {/* Socials */}
          <div className={`${flexBetween} mt-4 flex-col gap-y-5 sm:flex-row`}>
            <div className="flex flex-col items-center gap-4 sm:items-start lg:flex-row lg:items-center">
              <div className="flex flex-col items-center gap-4 min-[27em]:flex-row">
                <div className="flex items-center gap-2.5 border-neutral-600 text-neutral-400 min-[27em]:border-r min-[27em]:pr-4">
                  <Mail size={16} className="mt-0.5" />
                  <p>Support@CryptoVerse.com</p>
                </div>
                <div className="flex items-center gap-2.5 border-neutral-600 text-neutral-400 lg:border-r lg:pr-4">
                  <Phone size={16} className="mt-0.5" />
                  <p>021-01020316 </p>
                </div>
              </div>
              <p className="text-neutral-400">
                Trade smarter & Grow faster with
              </p>
            </div>

            <div className={`${flexCenter} w-fit gap-3`}>
              {socialsData.map((social) => (
                <Link
                  key={social.iconPath}
                  href={social.url}
                  className="group hover:bg-primary hover:border-primary cursor-pointer rounded-full border bg-transparent p-2 transition-all hover:scale-110"
                >
                  <Image
                    width={20}
                    height={20}
                    alt="Crypto Verse"
                    src={social.iconPath}
                    className="opacity-50 transition-all group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Useful links */}
          <div className="mt-10 border-y border-neutral-700 py-10">
            {/* Default view */}
            <div className="hidden items-start justify-between md:flex">
              {footerLinks.map((link) => (
                <div
                  key={`${link.title}-default`}
                  className="flex w-fit flex-col items-start justify-center"
                >
                  <h6 className="font-semibold">{link.title}</h6>
                  <ul className="mt-4">
                    {link.items.map((item, index) => (
                      <li
                        key={index}
                        className="hover:text-primary text-neutral-400 transition-all not-first:mt-1"
                      >
                        <Link href={item.url}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Accordion view */}
            <Accordion className="md:hidden" type="single" collapsible>
              {footerLinks.map((link, index) => (
                <AccordionItem
                  key={`${link.title}-acc`}
                  value={`item-${index}`}
                  className="group !border-b-0"
                >
                  <AccordionTrigger className="cursor-pointer rounded-b-none *:stroke-3 group-data-[state=open]:border-b">
                    {link.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {link.items.map((item) => (
                        <li className="mt-2 text-neutral-400">
                          <Link href={item.url}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Foot note */}
        <div
          className={`${containerDefault} ${flexCenter} mt-4 gap-2 text-neutral-500`}
        >
          <Copyright size={19} className="mt-0.5" />
          <p className="text-sm">2025 CryptoVerse. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
