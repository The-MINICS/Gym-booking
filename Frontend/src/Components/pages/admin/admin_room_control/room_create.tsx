import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { RoomInterface } from "@/interfaces/IRoom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';

function RoomCreate({ onClose }:any){
    const [image, setImage] = React.useState<string | ArrayBuffer | null>("");
    const [rooms, setRooms] = useState<RoomInterface>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onImgChange = (event: any) => {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            const base64Data = reader.result;
            setImage(base64Data)
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof RoomCreate;
        const { value } = event.target;
        setRooms({ ...rooms, [id]: value });
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

    const apiUrl = "http://localhost:9999";

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

    const getRooms = async () => {
        let res = await GetRooms();
        if (res) {
          setRooms(res);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);

    async function submit() {
        let data = {
            Activity: rooms.Activity?? "",
            Number: rooms.Number?? "",
            Capacity: typeof rooms.Capacity === "string" ? parseInt(rooms.Capacity) : 0,
            Attendant: rooms.Attendant?? "",
            Illustration: image,
            Caption: rooms.Caption
        };
        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(`${apiUrl}/rooms`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                console.log("seved")
                setSuccess(true);
                setErrorMessage("")
                setTimeout(() => {
                    window.location.href = "/room-mannage";
                }, 500);
            } else {
                console.log("save failured!")
                setError(true);
                setErrorMessage(res.error)
            }
        });
    }

    return (
    <>
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur justify-center items-center">
                <Container className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Paper>
                        <Box display="flex" sx={{ marginTop: 1, }}>
                            <Box sx={{ paddingX: 1, paddingY: 1, }}>
                                <Typography component="h4" variant="h4" align="center" color="secondary" gutterBottom
                                    >Create New Recreation Room
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
                                    Recreation Romm is Created
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
                                    Can not create the new room! : {errorMessage}
                                </Alert>
                            </Snackbar>

                            <Grid item xs={10}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Activity</p>
                                    <TextField
                                        required
                                        id="Activity"
                                        variant="outlined"
                                        type="string"
                                        size="medium"
                                        placeholder="Please fill activity about the room"
                                        value={rooms.Activity || ""}
                                        onChange={handleInputChange} 
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={2}>
                                    <FormControl fullWidth variant="outlined" >
                                        <IconButton aria-label="upload picture" component="label">
                                            <input hidden accept="image/*" type="file"
                                                onChange={onImgChange} 
                                            />
                                            <AddPhotoAlternateIcon sx={{ fontSize: 75, mt: 2}} color="secondary" />
                                        </IconButton>
                                    </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" className="flex items-center justify-center">
                                    <img src={`${image}`} alt="preview-cover" className="md:w-2/6 h-auto" />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Caption</p>
                                    <p className="text-red-500 italic">(Limit: 500 characters)</p>
                                    <TextField
                                        required
                                        multiline
                                        id="Caption"
                                        variant="outlined"
                                        type="string"
                                        size="medium"
                                        placeholder="Please fill any caption about the equipment that you added"
                                        value={rooms.Caption || ""}
                                        inputProps={{ maxLength: 500 }}
                                        onChange={handleInputChange} 
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Room Number</p>
                                    <TextField
                                    required
                                    id="Number"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    placeholder="Fill the room number"
                                    value={rooms.Number || ""}
                                    onChange={handleInputChange} 
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Room Capacity</p>
                                    <TextField
                                    required
                                    id="Capacity"
                                    variant="outlined"
                                    type="number"
                                    size="medium"
                                    placeholder="Fill the room capacity"
                                    value={rooms.Capacity || ""}
                                    onChange={handleInputChange} 
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <p className="text-lg font-semibold">Room Attendant</p>
                                    <TextField
                                    required
                                    id="Attendant"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    placeholder="Fill the room attendant"
                                    value={rooms.Attendant || ""}
                                    onChange={handleInputChange} 
                                    />
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
                </Container>
            </div>
        </div>
    </>
    );
}export default RoomCreate;