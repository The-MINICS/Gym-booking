import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from "framer-motion";
import { PictureInterface } from "@/interfaces/IPicture";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  
    Button, ButtonGroup, Dialog, DialogActions, DialogContent,
    DialogContentText,  DialogTitle, Slide,  
    Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import { GetPictures, PictureDelete } from '@/services/HttpClientService';

function PicturEquipment() {
    const navigate = useNavigate();
    const [Pictures, setPictures] = useState<PictureInterface[]>([]);
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);

    const getPictures = async () => {
        let res = await GetPictures();
        if (res) {
            setPictures(res);
      }
    };

    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteID(ID)
        setOpenDelete(true)
      }
      const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
      }
      const handleDelete = async () => {
        let res = await PictureDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getPictures();
        setOpenDelete(false)
        setTimeout(() => {
          window.location.href = "/equipment-manage";
        }, 500);
      }
    
    useEffect(() => {
        getPictures();
    }, []);

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
          children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return(
    <>
        <motion.div
            className="bg-center mx-5 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: -0 }
            }}
        >
            <TableContainer className="">
                <Table className="hover:table-auto -ml-3">
                    <TableHead className="bg-gray-100">
                        <TableRow className="py-2 text-lg font-bold bg-pink-300">
                            <TableCell><h4 className="font-semibold text-base font-sans text-center">No.</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans text-center">Illustration</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans text-center">Equipment</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans text-center">Description</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="py-2 bg-white">
                        {Pictures.map((row) => (
                            <TableRow
                                className="py-2"
                                key={row.ID}
                            >
                                <TableCell align="center">{row.ID}</TableCell>
                                <TableCell align="center"><img src={`${row.Picture}`} width="250" height="150" /></TableCell>
                                <TableCell align="center">{row.Title}</TableCell>
                                <TableCell align="center">{row.Describe}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup>
                                        <Button
                                            startIcon={<EditIcon />}
                                            className="hover:bg-blue-500 cursor-pointer"
                                            onClick={() => navigate({ pathname: `/picture/update/${row.ID}` })}
                                        >Edit
                                        </Button>
                                        <Button
                                            startIcon={<DeleteIcon />}
                                            className="hover:bg-red-500 cursor-pointer"
                                            color="error"
                                            onClick={() => { handleDialogDeleteOpen(Number(row.ID)); } }
                                        >Del
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
        <Dialog
            open={openDelete}
            onClose={handleDialogDeleteclose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this equipment then you won't be able to recover any more.
                        Do you want to delete this equipment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleDialogDeleteclose}>Cancel</Button>
                    <Button color="secondary" onClick={handleDelete} className="bg-red-500" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default PicturEquipment;