const Footer = () => {
  return (
    <footer className="border-t w-full bg-gray-100">
      <div className="container flex flex-col items-center justify-center md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-left leading-loose sm:text-center">
            © 2025 Brandlogs Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;