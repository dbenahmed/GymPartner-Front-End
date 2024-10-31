export default function wordsToUpperCase(string) {
   if (typeof string === 'string') {
      let wordsArray = string.split(' ');
      if (wordsArray.length === 1) {
         const word = wordsArray[0]
         const result = (word[0].toUpperCase() + wordsArray[0].slice(1))
         return result
      } else {
         const words = wordsArray.map(word => {
            return (word[0].toUpperCase() + word.slice(1))
         })
         const result = words.join(' ');
         return result
      }
   }
   else {
      return 'No Equipments'
   }
}