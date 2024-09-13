import { Fade, IconButton, Slide } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import React from 'react'
import './style.scss'

type Props = {
  children: any
  closeModal: () => void
  openModal: boolean
  isCancel?: boolean
  title?: string
  className: string
  closeOutside?: boolean
}
const CustomModal = ({
  children,
  closeModal,
  openModal = true,
  isCancel = true,
  title,
  className = '',
  closeOutside = true,
}: Props) => {
  return (
    <Fade in={openModal}>
      <div
        onClick={(e) => {
          if (closeOutside && e.target === e.currentTarget) {
            closeModal()
          }
        }}
        className="pd-modal">
        <Slide direction="up" in={openModal} mountOnEnter unmountOnExit>
          <div className={`popBox2 ${className}`}>
            <h3 className="title">{title}</h3>
            {isCancel && (
              <IconButton className="close-modal-icon" onClick={closeModal}>
                <ClearIcon />
              </IconButton>
            )}
            {children}
          </div>
        </Slide>
      </div>
    </Fade>
  )
}

export default CustomModal
