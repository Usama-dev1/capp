const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full bg-blue-muted text-center p-4">
      <p className="text-xs text-white">{`©blog made ${year}`}</p>
    </div>
  );
};

export default Footer;
