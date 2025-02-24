const Footer = () => {
  return (
    <footer className="border-t w-full bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-700 leading-loose">
          &copy; {new Date().getFullYear()} Brandlogs Inc. | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
