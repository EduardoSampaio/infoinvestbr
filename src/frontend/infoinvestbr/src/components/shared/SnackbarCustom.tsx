import { Slide, SlideProps, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from "react";

interface SnackBarCustomProps {
    openSnack: boolean
    handleClose: () => void
    variant: 'filled' | 'outlined' | 'standard'
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right'
    message: string
    severity: 'success' | 'error' | 'info' |'warning'
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}  

export default function SnackBarCustom(props: SnackBarCustomProps) {
    const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
        propsalert,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref}  {...propsalert} variant={props.variant} />;
      });

      
    return(
        <Snackbar open={props.openSnack} autoHideDuration={5000} onClose={props.handleClose} 
        anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal}}
        TransitionComponent={SlideTransition}
        >
            <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: "100%" }} className='dark:text-white'>
            {props.message}
            </Alert>
        </Snackbar>
    )
}