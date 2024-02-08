import React from "react";
import { RxCross2 } from "react-icons/rx";
import ButtonCommon from "./Button";
import { Modal } from "react-daisyui";

const CommonModal = ({
  handleOpen,
  open,
  title,
  btnText,
  headerText,
  children,
  icon,
  className,
  headerClass,
  actionsClass,
  onClick,
  smallScreenActions,
  btnDisabled,
  btnClass
}) => {
  return (
    <>
      <Modal
        className={`${className} rounded-none  h-screen sm:h-fit w-screen flex flex-col relative bg-base-100 `}
        onClickBackdrop={handleOpen}
        open={open}
      >
        <Modal.Header className={`${headerClass}  mb-2 `}>
          <div className="flex justify-between items-center">
            <p className="text-[16px] md:text-[18px] text-base-content font-[500]">
              {title}
            </p>
            <RxCross2
              onClick={handleOpen}
              className="text-lg md:text-xl cursor-pointer"
            />
          </div>
          {headerText && (
            <p className="pt-1 text-light text-[12px]">{headerText}</p>
          )}
        </Modal.Header>

        <Modal.Body className="flex-grow md:flex-shrink-0 flex flex-col w-full justify-center md:justify-start">
          <div>
            {children}
            {btnText  && (
              <Modal.Actions className={`md:hidden ${smallScreenActions ? "flex" : "hidden"}  px-1 `}>
                <div className="flex flex-row">
                  <ButtonCommon
                    onClick={handleOpen}
                    title="Cancel"
                    variant="text"
                  />
                  <ButtonCommon className={btnClass} onClick={onClick} title={btnText} />
                </div>
              </Modal.Actions>
            )}
          </div>
        </Modal.Body>

        {btnText && (
          <Modal.Actions className={`${actionsClass} md:flex ${!smallScreenActions ? "flex" : "hidden"}`}>
            <div className="flex flex-row w-fit">
              <ButtonCommon
                onClick={handleOpen}
                title="Cancel"
                variant="text"
              />
              <ButtonCommon disabled={btnDisabled} className={btnClass}  onClick={onClick} title={btnText} />
            </div>
          </Modal.Actions>
        )}
      </Modal>
    </>
  );
};

export default CommonModal;
