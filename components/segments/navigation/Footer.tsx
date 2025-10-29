import LinkedinIcon from "@/components/molecules/LinkedinIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-row items-center justify-between bg-white font-gabarito px-10 py-6 border-t border-neutral-1 border-solid">
      <div className="text-xl text-primary-8">©inait 2025</div>
      <div className="flex flex-row gap-x-4 items-center text-xl text-primary-8">
        <div>Find us on Linkedin</div>
        <Link href="https://www.linkedin.com/company/inait/">
          <LinkedinIcon iconColor="#003a8c" className="w-6 h-6" />
        </Link>
      </div>
    </footer>
  );
}
