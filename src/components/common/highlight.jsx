const Highlight = ({ children, className }) => {
    return (
      <span className={`relative inline-block font-semibold ${className}`}>
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200 to-orange-300 rounded-lg px-2 py-1 -z-0 blur-sm"></span>
      </span>
    );
  };

  export default Highlight