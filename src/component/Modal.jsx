import ReactDom from 'react-dom';

export function Modal(props){
    const {children , CloseModal} = props;
    return ReactDom.createPortal(
        <div className='modal-container'>
            <button onClick={CloseModal} 
            className='modal-underlay'/>

            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}