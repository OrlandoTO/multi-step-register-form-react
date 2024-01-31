import { useRef } from "react";

export default function Modal({ children, open,onClose }) {
    const refModal = useRef(null)
    window.onclick = function (event) {
        if (event.target == refModal.current) {
            onClose();
        }
    };
    return <div className={`modal ${open ? 'show' : 'hide'}`} ref={refModal}>
        <div className='modal-content'>
            <span class="close" onClick={e => onClose()}>&times;</span>
            {children}
        </div>
    </div>
}