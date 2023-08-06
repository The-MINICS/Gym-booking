import { 
    Table,  
    TableBody,  
    TableCell,  
    TableContainer, 
    TableHead,  
    TableRow, } 
from '@mui/material';

function WorkoutBeginner2() {

    return(
    <>
    <TableContainer className="mb-10">
            <h2 className="font-semibold text-2xl text-center">Stage 1: Neuromuscular Adaptation (Weeks 1 - 4)</h2>
            <div>
                <p className="py-2">
                    This stage is a feeling out stage. Start with a moderately light weight and only add weight to an exercise 
                    when the sets feel relatively easy. Don't rush into weight additions. First and foremost, 
                    you want to develop consistency and an understanding of exercise form. Once you hit a nice stride, 
                    then slowly add weight as you can. Below is a sample workout schedule:
                    <div className='ml-7'>
                        <li>Day 1 - Workout A</li>
                        <li className='font-semibold'>Day 2 - Rest</li>
                        <li>Day 3 - Rest</li>
                        <li className='font-semibold'>Day 4 - Workout A</li>
                        <li>Day 5 - Rest</li>
                        <li className='font-semibold'>Day 6 - Rest</li>
                        <li className='font-semibold'>Day 7 - Rest</li>
                    </div>
                </p>
            </div>
            <h3 className="font-semibold text-xl text-center text-blue-900 italic" >~Workout A~</h3>
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
                        <TableCell>Squats</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Bench Press</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Stiff Leg Deadlift</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Barbell Row</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Military Press</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Skullcrushers</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Dumbbell Curls</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Seated Calf Raises</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-yellow-200 py-2">
                        <TableCell>Sit Ups</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <TableContainer className="mb-10">
                <h2 className="font-semibold text-2xl text-center">Stage 2: Conditioning & Building</h2>
                <div>
                    <p className="py-2">
                        Using good form, start to focus on pushing sets for more and more reps. 
                        You do not want to train to failure or perform reps with sloppy form. 
                        Add weight when you reach the recommended number of reps for a set. 
                        Below is a sample workout schedule:
                        <div className='ml-7'>
                            <li>Day 1 - Workout A</li>
                            <li className='font-semibold'>Day 2 - Rest</li>
                            <li>Day 3 - Workout B</li>
                            <li className='font-semibold'>Day 4 - Rest</li>
                            <li>Day 5 - Workout C</li>
                            <li className='font-semibold'>Day 6 - Rest</li>
                            <li className='font-semibold'>Day 7 - Rest</li>
                        </div>
                    </p>
                </div>
                <h3 className="font-semibold text-xl text-center text-blue-900 italic" >~Workout A~</h3>
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
                            <TableCell>Squats</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Bench Press</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Leg Curls</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Barbell Rows</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Military Press</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Skullcrushers</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>EZ Bar Preacher Curls</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Seated Calf Raise</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Sit Ups</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10-25</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <h3 className="font-semibold text-xl text-center text-blue-900 italic pt-5" >~Workout B~</h3>
                <Table className="hover:table-auto -ml-3">
                    <TableHead className="bg-gray-100">
                        <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                            <TableCell><h4 className="font-semibold text-base font-sans pr-16">Exercise</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans pr-16">Sets</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans pr-16">Reps</h4></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="py-2 bg-white">
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Stiff Leg Deadlift</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Leg Press</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Dumbbell Flys</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Pull Ups or Lat Pull Down</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Bent Over Reverse Dumbbell Fly</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Dips</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Hammer Curls</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Dumbbell Shrugs</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Dumbbell Side Bends</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <h3 className="font-semibold text-xl text-center text-blue-900 italic pt-5" >~Workout C~</h3>
                <Table className="hover:table-auto -ml-3">
                    <TableHead className="bg-gray-100">
                        <TableRow className="py-2 text-center text-lg font-bold bg-blue-300">
                            <TableCell><h4 className="font-semibold text-base font-sans pr-16">Exercise</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans pr-16">Sets</h4></TableCell>
                            <TableCell><h4 className="font-semibold text-base font-sans pr-16">Reps</h4></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="py-2 bg-white">
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Squats</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Incline Dumbbell Bench Press</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Leg Curls</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>One Arm Dumbbell Row</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Seated Arnold Press</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Cable Tricep Extensions</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Dumbbell Curls</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Standing Calf Raises</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>10</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-yellow-200 py-2">
                            <TableCell>Plank</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>60 sec</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    <TableContainer className="mb-4">
        <h2 className="font-semibold text-2xl text-center">Stage 3: Maximizing Beginner Gains</h2>
        <div>
            <p className="py-2">
                Push every set for as many reps as possible - no exceptions. Never waste a set. Stop each set 
                when you feel like you might fail on the next rep or when you form starts to slip. 
                Add weight when you reach the recommended number of reps per set. 
                Below is a sample workout schedule:
                <div className='ml-7'>
                    <li>Day 1 - Workout A</li>
                    <li>Day 2 - Workout B</li>
                    <li className='font-semibold'>Day 3 - Rest</li>
                    <li>Day 4 - Workout C</li>
                    <li>Day 5 - Workout D</li>
                    <li className='font-semibold'>Day 6 - Rest</li>
                    <li className='font-semibold'>Day 7 - Rest</li>
                </div>
            </p>
        </div>
        <h3 className="font-semibold text-xl text-center text-blue-900 italic pt-5" >~Workout A~</h3>
        <Table className="hover:table-auto -ml-3">
            <TableHead className="bg-gray-100">
                <TableRow className="py-2 text-center text-lg font-bold bg-blue-200">
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Exercise</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Sets</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Reps</h4></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="py-2 bg-white">
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Squats</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Leg Extensions</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Leg Curls</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Seated Calf Raises</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>15</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Decline Weighted Sit Up</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>15-25</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Barbell Shrugs</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <h3 className="font-semibold text-xl text-center text-blue-900 italic pt-5" >~Workout B~</h3>
        <Table className="hover:table-auto -ml-3">
            <TableHead className="bg-gray-100">
                <TableRow className="py-2 text-center text-lg font-bold bg-blue-200">
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Exercise</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Sets</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-10">Reps</h4></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="py-2 bg-white">
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Bench Press</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>One Arm Dumbbell Row</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Military Press</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Dips / Cable Extensions</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Wide Grip Pull Up</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>AMRAP</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>EZ Bar Curls</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <h3 className="font-semibold text-xl text-center text-blue-900 italic pt-5" >~Workout C~</h3>
        <Table className="hover:table-auto -ml-3">
            <TableHead className="bg-gray-100">
                <TableRow className="py-2 text-center text-lg font-bold bg-blue-200">
                    <TableCell><h4 className="font-semibold text-base font-sans pr-7">Exercise</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-7">Sets</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-7">Reps</h4></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="py-2 bg-white">
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Stiff Leg Deadlift</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Squats</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>15</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Leg Press</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>15</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Standing Calf Raises</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>15</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Plank</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>60 sec</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Dumbbell Shrugs</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <h3 className="font-semibold text-xl text-center text-blue-900 italic pt-5" >~Workout D~</h3>
        <Table className="hover:table-auto -ml-3">
            <TableHead className="bg-gray-100">
                <TableRow className="py-2 text-center text-lg font-bold bg-blue-200">
                    <TableCell><h4 className="font-semibold text-base font-sans pr-14">Exercise</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-14">Sets</h4></TableCell>
                    <TableCell><h4 className="font-semibold text-base font-sans pr-14">Reps</h4></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="py-2 bg-white">
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Incline Dumbbell Bench Press</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Barbell Rows</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Seated Arnold Press</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Close Grip Bench Press</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Pull Ups</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>AMRAP</TableCell>
                </TableRow>
                <TableRow className="hover:bg-yellow-200 py-2">
                    <TableCell>Seated Dumbbell Curls</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    </>  
    )
}
export default WorkoutBeginner2;