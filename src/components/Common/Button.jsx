const ButtonCommon = ({
  onClick,
  title,
  disabled,
  type,
  variant,
  className,
  iconLeft: IconLeft,
  iconRight: IconRight
}) => {
  return variant === "text" && !IconLeft && !IconRight ? (
    <button
      className={`${className} !text-light text-[15px]  w-full  font-[500] active:!bg-blue-400  text-xs px-4 py-2  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
      type={type == "submit" ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onClick}
    >
      {title}
    </button>
  ) : (
    <button
      className={`${
        className ?? className
      } flex items-center w-full gap-x-2 justify-center  bg-primary text-white !text-[13px]    text-xs px-4 py-2  shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
      type={type == "submit" ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {IconLeft} {title} {IconRight}
    </button>
  );
};

export default ButtonCommon;
