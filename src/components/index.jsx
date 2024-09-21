import Header from './Header/Header'
import ExerciseBigContainer from './Exercises/ExerciseBigContainer'
import Plan from './Plan/Plan'
import SelectMenu from './DesignSystem/SelectMenu'
import Button from './DesignSystem/Button'
import Input from './DesignSystem/Input'
import ToggleBetweenOptions from './DesignSystem/ToggleBetweenOptions'
import Error from './DesignSystem/Error'
import Loader from './DesignSystem/Loader'
import IconButton from './DesignSystem/IconButton'
import ExercisePanel from './Plan//ExercisePlan/ExercisePanel'
import FoundExercise from './Plan/ExercisePlan/FoundExercise'
import ExerciseMenu from './Plan/ExercisePlan/ExerciseMenu'
import RepsInput from './Plan/ExercisePlan/RepsInput'



export { Header, Error, Loader, ToggleBetweenOptions, Input, IconButton, Button, SelectMenu, ExerciseBigContainer }
Plan.ExercisePanel = ExercisePanel
Plan.FoundExercise = FoundExercise
Plan.FoundExercise.ExerciseMenu = ExerciseMenu
Plan.FoundExercise.ExerciseMenu.RepsInput = RepsInput
export { Plan }
