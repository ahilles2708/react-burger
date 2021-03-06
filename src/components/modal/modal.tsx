import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps  {
    toggle: () => void;
    caption: string;
}

const modalRoot = document.getElementById("modal") as HTMLElement;

const Modal: React.FC<IModalProps> = ( props ) => {

    const closeThisModal = () =>{
        props.toggle();
    }

    const escFunction = React.useCallback((event) => {
        if (event.key === "Escape") {
            props.toggle();
        }
    }, []);

    React.useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    
        return () => {
          document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay toggle={closeThisModal} />
            <div className={styles.modal + ' pl-10 pt-10 pr-10 pb-15'}>
                <span className={styles.closeModal} onClick={closeThisModal}><CloseIcon type="primary" /></span>
                <span className={styles.modalCaption + ' text text_type_main-large'}>{props.caption}</span>
                {props.children}
            </div>
        </>,
        modalRoot
    )
}

export default Modal;