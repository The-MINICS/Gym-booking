import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import EquipmentCreate from "./equipment_create";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PictureCreate from "./picture_create";

type Props = {
    Visible: boolean;
    onClose: any;
}

function PictureEquipmentCreate({ Visible, onClose }:Props){
    const [thisPage, setThisPage] = useState(true);
    const [nextPage, setNextPage] = useState(false);

    if (!Visible) return null;

    const NextPage = () => {
        setThisPage(false);
        setNextPage(true);
    }
    const PreviousPage = () => {
        setNextPage(false);
        setThisPage(true);
    }

    return (
    <section>
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur justify-center items-center">
            <Container className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* navegation icon */}
                <Grid item xs={12}>
                    <div className="flex items-center justify-between">
                        <button onClick={PreviousPage} className=" bg-slate-100 px-3 py-1 
                            rounded-md text-base font-medium">
                            <ChevronLeftIcon/> Previous
                        </button>
                        <button onClick={NextPage} className=" bg-slate-100 px-3 py-1 
                            rounded-md text-base font-medium">
                            Next <ChevronRightIcon/>
                        </button>
                    </div>
                </Grid>

                {/* Show on Page 1 */}
                {thisPage && <PictureCreate onClose={onClose} nextPage={NextPage}/>}

                {/* Show on Page 2 */}
                {nextPage && <EquipmentCreate onClose={onClose}/>}
                </Container>
            </div>
        </div>
    </section>
    );
}export default PictureEquipmentCreate;