import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay(props){

    const closeThisModal = () =>{
        props.toggle(false);
    }

    return (
        <div className={styles.modalOverlay} onClick={closeThisModal}></div>
    )
}

ModalOverlay.propTypes = {
    toggle: PropTypes.func.isRequired
}