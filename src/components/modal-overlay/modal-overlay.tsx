import React from 'react';
import styles from './modal-overlay.module.css';
import { IModalOverlayProps } from '../../types';

const ModalOverlay: React.FC<IModalOverlayProps> = (props) => {

    const closeThisModal = () =>{
        props.toggle();
    }

    return (
        <div className={styles.modalOverlay} onClick={closeThisModal}></div>
    )
}

export default ModalOverlay;