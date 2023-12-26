import { Box, Modal, Typography } from "@mui/material"
import { styleModal } from "./ModalGettingShop"

export const ModalBuyProducts = ({summ, isOpen, handleClose}: {summ: number|undefined, isOpen: boolean, handleClose:()=>void}) =>{
    return(
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={styleModal}>
            {
                summ ?
                <Typography sx={{color:'white'}} variant="body2">
                    Сумма покупки: {summ} р.
                </Typography>
                :
                <Typography sx={{color:'white'}} variant="body2">
                    Невозможно совершить покупку: указанное колличество товаров превышает колличество товаров в магазине.
                </Typography>
            }
          
        </Box>
      </Modal>
    )
}