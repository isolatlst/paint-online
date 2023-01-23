import React, {LegacyRef} from "react";
import "../styles/modal.scss";
import {createPortal} from "react-dom";

type PropsType = {
    isModalOpen: boolean
    usernameRef: LegacyRef<HTMLInputElement>
    closeModal: () => void
}
type ModalType = (params: PropsType) => React.ReactPortal | null

const Modal: ModalType = ({isModalOpen, usernameRef, closeModal}) => {
    return isModalOpen
        ? createPortal(
            <div className='modal'>
                <div className='modal__body'>
                    <label>
                        <span className='modal__text'>Write your name:</span>
                        <input autoFocus={true} className='modal__input' type="text" ref={usernameRef} />
                    </label>
                    <button className='modal__button' onClick={closeModal}>Enter</button>
                </div>
            </div>
            , document.body)
        : null
}

export default Modal
