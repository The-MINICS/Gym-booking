import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EquipmentInterface } from "@/interfaces/IEquipment";
import {  
    Button, ButtonGroup, Dialog, DialogActions, DialogContent,
    DialogContentText,  DialogTitle, Slide,  
    Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import { EquipmentDelete, GetEquipments } from '@/services/HttpClientService';
import { useNavigate } from "react-router-dom";

function AllEquipment() {
    const navigate = useNavigate();
    const [Equipments, setEquipments] = useState<EquipmentInterface[]>([]);
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);

    const getEquipments = async () => {
        let res = await GetEquipments();
        if (res) {
            setEquipments(res);
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
        let res = await EquipmentDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getEquipments();
        setOpenDelete(false)
        setTimeout(() => {
          window.location.href = "/equipment-manage";
        }, 500);
    }
  
    useEffect(() => {
        getEquipments();
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
    <section>
        <div>
             <motion.div
                className="bg-center mx-auto"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <TableContainer className="">
                    <Table className="hover:table-auto -ml-3">
                        <TableHead className="bg-gray-100">
                            <TableRow className="py-2 text-lg font-bold bg-pink-300">
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">No.</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Equipment</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Responsibility</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Status</h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="py-2 bg-white">
                                {Equipments.map((row) => (
                                    <TableRow 
                                            className="py-2"
                                            key={row.ID}
                                        >
                                            <TableCell align="center">{row.ID}</TableCell>
                                            <TableCell align="center">{row.Name}</TableCell>
                                            <TableCell align="center">{row.Member?.Firstname} {row.Member?.Lastname}</TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup>
                                                    <Button
                                                        startIcon={<EditIcon />}
                                                        className="hover:bg-blue-500 cursor-pointer"
                                                        onClick={() =>
                                                            navigate({ pathname: `/equipment/update/${row.ID}` })
                                                        }
                                                        >Edit
                                                    </Button>
                                                    <Button
                                                        startIcon={<DeleteIcon />}
                                                        className="hover:bg-red-500 cursor-pointer"
                                                        color="error"
                                                        onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                        >Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                            <TableCell align="center">{(row.StatusID === 1) ? ("Available"):("Unavailabe")}</TableCell>
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
                        <Button color= "error" onClick={handleDialogDeleteclose}>Cancel</Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red-500" autoFocus>
                          Confirm
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    </section>
    )
}
export default AllEquipment;