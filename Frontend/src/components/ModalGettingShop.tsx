import { Box, Modal, Typography } from "@mui/material"
import { IShop } from "../types";

export const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export const ModalGettingShop = ({open, shop, handleClose, summ}: {open: boolean, shop: IShop|null|undefined, handleClose:()=>void, summ?: number}) => {
    
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={styleModal}>
          <Typography sx={{color:'white', mb:2}} id="modal-modal-title" variant="h5" component="h2" >
            Результат запроса:
          </Typography>
          {
            shop ?
            <>
                <Typography sx={{ fontSize: 14, color:'white'}}>
                    ID: {shop.ID}
                </Typography>
                <Typography sx={{color:'white'}} variant="h6" component="div">
                    "{shop.Name}"
                </Typography>
                <Typography sx={{color:'white'}} variant="body2">
                    Адрес: {shop.Address}
                </Typography>
                {
                  summ ?
                  <Typography sx={{color:'white'}} variant="body1">
                    Стоимость: {summ} р.
                  </Typography>
                  : undefined
                }
            </>
            : <Typography sx={{color:'white'}}>Магазин не найден</Typography>
          }
        </Box>
      </Modal>
    )
}