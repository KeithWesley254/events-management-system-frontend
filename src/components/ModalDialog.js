import { Dialog, Grow } from "@mui/material"
import BuyTicketForm from "./BuyTicketForm"

const ModalDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <Grow
            style={{ transformOrigin: '0 0 0' }}
            {...({ timeout: 1000 })}
            >
                <BuyTicketForm user={props.user} event={props.event} handleCloseModal={props.handleClose}/>
            </Grow>
        </Dialog>
    )
}

export default ModalDialog