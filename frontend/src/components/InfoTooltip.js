function InfoTooltip({ isOpen, onClose, isAuthSuccess }) {
  
  return (
    <div className={`popup popup_infotooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div className="popup__infotooltip-info">
          {isAuthSuccess
            ? <>
              <div className="popup__infotooltip-img popup__infotooltip-img_success"></div>
              <p className="popup__infotooltip-text">Вы успешно зарегестрировались!</p>
              </>
            : <>
              <div className="popup__infotooltip-img popup__infotooltip-img_denine"></div>
              <p className="popup__infotooltip-text">Что то пошло не так! Попробуйте еще раз.</p>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;