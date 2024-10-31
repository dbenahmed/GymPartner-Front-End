import { v4 as uuidv4 } from 'uuid';
import { saveToLocalStorage } from '../utils/localStorageUtils';

export class User {
   constructor(username) {
      this.username = username
   }
   exercises = [];
   addExercise(exerciseInfosDatabaseId, split, weight, unit, reps, sets) {
      this.exercises.push(
         {
            id: `${uuidv4()}`,
            exerciseInfosDatabaseId,
            weight,
            unit,
            reps,
            sets,
         }
      )
      saveToLocalStorage
   }
   removeExercise(id, user) {
      const index = this.exercises.findIndex((value) => value.id === id);
      if (index !== -1) { this.exercises.splice(index, 1) }
      saveToLocalStorage(this.username, this)
   }
   updateReps(id, reps) {
      const index = this.exercises.findIndex((value) => value.id === id);
      if (index !== -1) { this.exercises[index].reps = reps }
      saveToLocalStorage(this.username, this)
   }
   updateWeight(id, weight) {
      const index = this.exercises.findIndex((value) => value.id === id);
      if (index !== -1) { this.exercises[index].weight = weight }
      saveToLocalStorage(this.username, this)
   }
   updateUnit(id, unit) {
      const index = this.exercises.findIndex((value) => value.id === id);
      if (index !== -1) { this.exercises[index].unit = unit }
      saveToLocalStorage(this.username, this)
   }
   updateSets(id, sets) {
      const index = this.exercises.findIndex((value) => value.id === id);
      if (index !== -1) { this.exercises[index].sets = sets }
      saveToLocalStorage(this.username, this)
   }
}