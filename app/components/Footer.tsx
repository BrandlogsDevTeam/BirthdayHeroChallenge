const Footer = () => {
  return (
    <footer className="border-t w-full bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-left leading-loose sm:text-center">
            &copy; {new Date().getFullYear()} Brandlogs Inc. | All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
