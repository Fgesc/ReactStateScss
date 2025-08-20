import "./style.scss"

interface ChildProps {
  children: React.ReactNode;
}


export const Modal = ({ children } : ChildProps) => {
  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  )
}

export default Modal
