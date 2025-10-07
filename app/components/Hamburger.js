import useOpenContext from "../contexts/useOpenContext";

function Hamburger() {
  const { open, hamburgerHandler } = useOpenContext();

  return (
    <div className="block cursor-pointer lg:hidden" onClick={hamburgerHandler}>
      {open ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#333437"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12.9624H21M3 6.9624H21M3 18.9624H21"
            stroke="#333437"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export default Hamburger;
