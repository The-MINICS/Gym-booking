import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { EquipmentInterface } from "@/interfaces/IEquipment";
import { Select, SelectChangeEvent } from "@mui/material";
import { GetMemberByMID } from "@/services/HttpClientService";
import { MemberInterface } from "@/interfaces/IMember";
import { PictureInterface } from "@/interfaces/IPicture";
import { RoomInterface } from "@/interfaces/IRoom";

function EquipmentCreate({ onClose }: any ){
    const [equipment, setEquipment] =  useState<EquipmentInterface>({});
    const [members, setMembers] = useState<MemberInterface>();
    const [pictures, setPictures] = useState<PictureInterface[]>([]);
    const [rooms, setRooms] = useState<RoomInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const apiUrl = "http://localhost:9999";

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof EquipmentCreate;
        const { value } = event.target;
        setEquipment({ ...equipment, [id]: value });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof equipment;
        setEquipment({
          ...equipment,
          [name]: event.target.value,
        });
    };

    async function GetPictures() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/pictures`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              return res.data;
            } else {
              return false;
            }
          });
      
        return res;
    }

    async function GetRooms() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/rooms`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              return res.data;
            } else {
              return false;
            }
          });
      
        return res;
    }

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const getMembers = async () => {
        let res = await GetMemberByMID();
        equipment.MemberID = res.ID;
        if (res) {
            setMembers(res);
        }
    };

    const getPictures = async () => {
        let res = await GetPictures();
        if (res) {
            setPictures(res);
        }
    };

    const getRooms = async () => {
        let res = await GetRooms();
        if (res) {
            setRooms(res);
        }
    };

    useEffect(() => {
        getMembers();
        getPictures();
        getRooms();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            Equipments: equipment.Equipments?? "",
            PictureID: convertType(equipment.PictureID),
            RoomID: convertType(equipment.RoomID),
            MemberID: convertType(equipment.MemberID),
        };
        console.log(data)
        const apiUrl = "http://localhost:9999";

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        };
      
        fetch(`${apiUrl}/pictures`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("seved")
              setSuccess(true);
              setErrorMessage("")
              setTimeout(() => {
                window.location.href = "/equipment-manage";
            }, 500);
            } else {
              console.log("save failured!")
              setError(true);
              setErrorMessage(res.error)
            }
          });
        }

    return (
    <section>
            <div>
                <Paper>
                    <Box display="flex" sx={{ marginTop: 1, }}>
                        <Box sx={{ paddingX: 1, paddingY: 1, }}>
                            <Typography component="h4" variant="h4" align="center" color="secondary" gutterBottom
                                >Add Equipment (Page 2/2)
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Snackbar
                            id="success"
                            open={success}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                            <Alert onClose={handleClose} severity="success">
                                Equipment Created
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            id="error"
                            open={error}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                            <Alert onClose={handleClose} severity="error">
                                Can not create the the equipment! : {errorMessage}
                            </Alert>
                        </Snackbar>

                        <Grid item xs={7}>
                            <FormControl fullWidth variant="outlined">
                                <p className="text-lg font-semibold">Title</p>
                                <TextField
                                    required
                                    id="Equipment"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    placeholder="Please fill Equipment name"
                                    value={equipment.Equipments || ""}
                                    onChange={handleInputChange} 
                                />
                            </FormControl>
                        </Grid>

                            <Grid item xs={5}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Illustration</p>
                                    <Select
                                        native
                                        value={equipment.PictureID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "PictureID",
                                        }}>
                                        <option aria-label="None" value="">Pick the image</option>
                                        {pictures.map((item: PictureInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                                {item.Title}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Room</p>
                                    <Select
                                        native
                                        value={equipment.RoomID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "RoomID",
                                        }}>
                                        <option aria-label="None" value="">Rooms</option>
                                        {rooms.map((item: RoomInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                                {item.Number} ({item.Activity})
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Responsibility</p>
                                    <Select
                                        disabled
                                        native
                                        value={equipment.MemberID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "MemberID",
                                        }}>
                                        <option value={members?.ID} key={members?.ID}>
                                            {members?.Firstname} {members?.Lastname}
                                        </option> 
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Button style={{ float: "left" }}
                                    onClick={onClose}
                                    variant="contained"
                                    color="inherit"
                                >Quit
                                </Button>
                                <Button style={{ float: "right" }}
                                    onClick={submit}
                                    variant="contained"
                                    color="success"
                                >Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
            </div>
    </section>
    );
}export default EquipmentCreate;