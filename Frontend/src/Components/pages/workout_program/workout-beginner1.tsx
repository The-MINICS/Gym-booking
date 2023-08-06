import { 
    Table,  
    TableBody,  
    TableCell,  
    TableContainer, 
    TableHead,  
    TableRow, } 
from '@mui/material';

function WorkoutBeginner1() {

    return(
    <>
    <TableContainer className="mb-10">
            <h2 className="font-semibold text-2xl text-center">Full-Body Focused Warm-Up</h2>
            <div>
                <p className="py-2">
                    Beginners and even intermediate fitness enthusiasts can benefit from utilizing a full-body workout program.
                    Instead of taking a top-down approach, beginning with the feet and working your way up
                    the body will help you make the most out of the time you spend preparing.
                </p>
                <p className="py-2">
                    That is why after your brief walk, you will start working on your feet. They are what connect you to the ground,
                    so make sure they feel good first. Then work your way up the lower body. Execute each rep or segment with control and precision.
                    Flying through this will not help you
                </p>
                <p className="py-2">
                    The rest periods should not be spent resting alone. Use that time to help you transition from one movement to the next.
                    Challenge yourself to decrease the rest time between exercises. For example, if you need 45 seconds to rest during your first go-round,
                    try to decrease that time to 40 seconds next time.
                </p>
            </div>
            <Table className="hover:table-auto -ml-3">
                <TableHead className="bg-gray-100">
                    <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Exercise</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Sets</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Reps/Time</h4></TableCell>
                        <TableCell><h4 className="font-semibold text-base font-sans pr-5">Rest/Interval</h4></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="py-2 bg-white">
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Fast-Paced Walk</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>3 Min</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Plantar Fascia w/ Lacrosse Ball</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>15 Sec, Each Foot</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Donkey Calf Raise</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Dumbbel Goblet Squat</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Bodyweight Walking Lunge</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>10 Each Leg</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Side Plank</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>30 Sec, Each Side</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Plyometric Push Up</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Rack Lat Stretch</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>30 Sec</TableCell>
                        <TableCell>30 - 45 Sec</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer><TableContainer className="mb-10">
                <h2 className="font-semibold text-2xl py-2 text-center">Lower Body Focused Warm-Up</h2>
                <div>
                    <p className="py-2">
                        This is a program that could be used for some intermediate and advanced lifters
                        that want to focus on specific portions of the body. Tag this one with any leg day program
                        and your results will speak for themselves.
                    </p>
                    <p className="py-2">
                        This one gets more specific to the lower body. One example is the IT Band Foam Roller exercise.
                        If you do not have a Foam Roller, use something like a tennis ball or med ball until you can get a roller.
                        There are also single-leg movements and holds included.
                        Concentrate so you can feel the stretch and contraction of the targeted area.
                    </p>
                    <p className="py-2">
                        Finally, there are movements for the core and shoulders. This is because they could be involved in a secondary role.
                        Think about the squat. Your core needs to be able to stay tight and stabilize the body while you’re squatting.
                        The shoulders are what the barbell will be on, so they should be prepared as well.
                    </p>
                </div>
                <Table className="hover:table-auto -ml-3">
                    <TableHead className="bg-gray-100">
                        <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                            <TableCell><h4 className="font-semibold text-base font-sans pr-10">Exercise</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans pr-10">Sets</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans pr-10">Reps/Time</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans pr-10">Rest/Interval</h4></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="py-2 bg-white">
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Fast-Paced Walk</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>3 Min</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Bodyweight Standing Calf Raise</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>IT Band Foam Rolling</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>30 Sec, Each Side</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Bodyweight Single Leg Deadlift</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>15, Each Side</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Prisoner Squat</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Prisoner Squat (Hold at the bottom)</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>30 Sec</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Superman</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>30 Sec</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Plank</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>30 Sec</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Band Pull Apart</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>30 - 45 Sec</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    <TableContainer className="mb-10">
        <h2 className="font-semibold text-2xl py-2 text-center">Upper Body Focused Warm-Up</h2>
        <div>
            <p className="py-2">
                This is another one that could be used by people that are beyond the beginner stage. 
                Regardless if you follow a bro-split, or you train the entire upper body in one session, 
                this is a good one that could be used for any workout. There are not any static holds included, 
                but those eccentric pull-ups will be great for targeting the lats, upper back, and even the biceps. 
                Sit-ups will challenge the core, and the jump squats will help increase the body temperature 
                and prepare the legs for stabilizing the body during some upper body exercises. 
            </p>
        </div>
        <Table className="hover:table-auto -ml-3">
            <TableHead className="bg-gray-100">
                <TableRow className="py-2 text-center text-lg font-bold bg-blue-200">
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Exercise</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Sets</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Reps/Time</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Rest/Interval</h4></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="py-2 bg-white">
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Fast-Paced Walk</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>3 Min</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Push up</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Bench Dip</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Arm Circles (Clockwise)</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>None</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Arm Circles (Counter Clockwise)</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Prisoner Squat (Hold at the bottom)</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>30 Sec</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Eccentric Only Pull Up</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Seated Zottman Curl</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>90/90 Hip Crossover</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15, Each Side</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Sit Up</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Bodyweight Jump Squat</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>30 - 45 Sec</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    </>  
    )
}
export default WorkoutBeginner1;