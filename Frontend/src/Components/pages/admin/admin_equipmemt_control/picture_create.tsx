import React, { useState } from "react";
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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import { PictureInterface } from "@/interfaces/IPicture";

function PictureCreate({ onClose, nextPage }: any ){
    const [image, setImage] = React.useState<string | ArrayBuffer | null>("");
    const [pictures, setPictures] =  useState<PictureInterface>({});

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
        const id = event.target.id as keyof typeof PictureCreate;
        const { value } = event.target;
        setPictures({ ...pictures, [id]: value });
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

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    async function submit() {
        let data = {
            Picture: image,
            Title: pictures.Title,
            Describe: pictures.Describe,
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
              setSuccess(true)
              setErrorMessage("")
              setTimeout(()=>{nextPage()},1000)
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
                                    >Add Equipment (Page 1/2)
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
                                    Picture created
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
                                    Can not create the picture! : {errorMessage}
                                </Alert>
                            </Snackbar>

                            <Grid item xs={10}>
                                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}>
                                    <TextField
                                        required
                                        multiline
                                        id="Title"
                                        variant="outlined"
                                        label="Equipment Name"
                                        type="string"
                                        size="medium"
                                        value={pictures.Title || ""}
                                        onChange={handleInputChange} 
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <FormControl fullWidth variant="outlined" >
                                    <IconButton color="secondary" aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file"
                                            onChange={onImgChange} />
                                        <AddPhotoAlternateIcon sx={{ fontSize: 72, mt: -1.3 }} />
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
                                    <p className="text-lg font-semibold">Description</p>
                                    <p className="text-red-500 italic">(Limit: 500 characters)</p>
                                    <TextField
                                        required
                                        multiline
                                        id="Describe"
                                        variant="outlined"
                                        type="string"
                                        size="medium"
                                        placeholder="Please fill any caption about the equipment that you added"
                                        value={pictures.Describe || ""}
                                        inputProps={{ maxLength: 500 }}
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
                                    color="primary"
                                >Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
            </div>
    </section>
    );
}export default PictureCreate;