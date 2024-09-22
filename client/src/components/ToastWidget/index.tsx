import React from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

interface ToastWidgetProps {
  open: boolean
  message: string
  severity: AlertColor
  onClose: () => void
  autoHideDuration?: number // Optional prop to customize the duration
}

const ToastWidget: React.FC<ToastWidgetProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 5000, // Default to 5 seconds
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top right
      key={message} // Ensure unique key for proper rendering
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default ToastWidget
