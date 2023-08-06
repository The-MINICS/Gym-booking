import { 
    Table,  
    TableBody,  
    TableCell,  
    TableContainer, 
    TableHead,  
    TableRow, } 
from '@mui/material';

function WorkoutBeginner3() {

    return(
    <>
        <TableContainer className="mb-10">
            <h2 className="font-semibold text-2xl text-center">Workout Description</h2>
            <div>
                <p className="py-2">
                    There is little doubt that this quarantine is extremely tough on everyone. 
                    And while I can easily write an entire article on the massive implications that this situation is having, 
                    and will have long after it is over, I am addressing this piece towards those who treat the gym like a second home.
                </p>
                <p className="py-2">
                    If you are anything like me, going to the gym 4-6 days per week to push and pull the iron is as natural as breathing.  
                    Sculpting our physiques, increasing our strength, improving our fitness, and building our health are of paramount importance to us. 
                    However, if you are truly dedicated, you are more than likely very familiar with the saying, 
                    “Where there is a will, there is a way!” And to that end, 
                    it is my sincere hope that you have been doing everything possible to stay on track – whether you only have bands, DB’s, 
                    a BB, Kettlebells, a medicine ball, or no equipment at all.
                </p>
                <p className="py-2">
                    In fact, the very reason I am sitting here, tapping the keys on my keyboard (using just two fingers, as I never learned to type), 
                    is to provide Muscle & Strength readers with some excellent at-home workout options that will keep your muscles burning, 
                    your fat melting, and your endorphins flowing at full throttle. Let’s do this!
                </p>
            </div>
            {/* Day 1 */}
            <h3 className="font-semibold text-xl text-blue-900 italic" >Day 1: All Barbell Back</h3>
            <Table className="hover:table-auto -ml-3">
                <TableHead className="bg-gray-100">
                    <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Exercise</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Sets</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Reps</h4></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="py-2 bg-white">
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Wide Grip Barbell Bent-Over Row</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>7-9</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Deadlift</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>10-12</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Barbell Pullover</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>13-15</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>One Arm Barbell Row</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>16-20</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Day 2 */}
            <h3 className="font-semibold text-xl text-blue-900 italic pt-5" >Day 2: All Bodyweight Chest</h3>
            <Table className="hover:table-auto -ml-3">
                <TableHead className="bg-gray-100">
                    <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                        <TableCell><h4 className="font-semibold text-base font-sans pr-7">Exercise</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-7">Sets</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-7">Reps</h4></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="py-2 bg-white">
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Push Ups (2/3/1 Tempo)</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Max Reps</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Feet-Elevated Push Ups (5/1/1 Tempo)</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Max Reps</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Dips (2/1/3 Tempo)</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Max Reps</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Narrow Grip Push Ups (2/1/1/3 Tempo)</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Max Reps</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <p className="py-2">
                Note: Lifting tempo is the phrase used to describe how fast you lower, lift, 
                and pause with the weight in each phase of a repetition. It is expressed in seconds 
                and begins with the negative (lowering) portion of an exercise, then the midpoint (stretch) portion, 
                then the positive (lifting) portion, and if there is a fourth number used, 
                it will be the peak contraction (squeeze) portion. Where you see 
                and “X,” means to “lift as explosively as possible.”
            </p>

            {/* Day 3 */}
            <h3 className="font-semibold text-xl text-blue-900 italic pt-5" >Day 3: All Plyo Thighs</h3>
            <Table className="hover:table-auto -ml-3">
                <TableHead className="bg-gray-100">
                    <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                        <TableCell><h4 className="font-semibold text-base font-sans pr-64">Exercise</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-12">Sets</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-0">Reps</h4></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="py-2 bg-white">
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Vertical Jumps</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>20</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Stair Jumps</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Broad Jumps</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Butt Kick Jumps</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>15</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Split Jumps</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>12 each leg</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Lateral Bounds</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>15 on each side</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Day 4 */}
            <h3 className="font-semibold text-xl text-blue-900 italic pt-5" >Day 4: All Dumbbell Delts</h3>
            <Table className="hover:table-auto -ml-3">
                <TableHead className="bg-gray-100">
                    <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Exercise</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Sets</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Reps</h4></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="py-2 bg-white">
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Standing Dumbbell Lateral Raise</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10-12</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Dumbbell Upright Row</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10-12</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Alternating Hammer Grip Front Dumbbell Raise</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10-12</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Seated Dumbbell Arnold Press</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>7-9</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Lateral Bounds</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>15 on each side</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Day 5 */}
            <h3 className="font-semibold text-xl text-blue-900 italic pt-5" >Day 5: All Band Arms</h3>
            <Table className="hover:table-auto -ml-3">
                <TableHead className="bg-gray-100">
                    <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                        <TableCell><h4 className="font-semibold text-base font-sans pr-20">Exercise</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-20">Sets</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-20">Reps</h4></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="py-2 bg-white">
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Alternating Band Curls (Hold Contractions for 4 Seconds)</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>8-10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>High Band Biceps Pose Curl (Hold Stretch for 4 Seconds)</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>8-10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Band Seated Concentration Curl (Hold Contractions 4 Seconds)</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>8-10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Banded Overhead Extension (Hold Stretch for 4 Seconds)</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10-12</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Band 2 Arm Kickbacks (Hold Contractions for 4 Seconds)</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10-12</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Lying Band Extensions (Hold Stretch for 4 Seconds)</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10-12</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>  
    )
}
export default WorkoutBeginner3;